import { env } from '../env.js';
import { getPool } from '../db.js';
import { getPayOS } from '../payos.js';

export type PlanId = 'jpd113' | 'jpd123' | 'combo';
export type OrderStatus = 'pending' | 'paid' | 'expired' | 'cancelled';

export type PaymentPlan = {
  id: PlanId;
  name: string;
  label: string;
  amount: number;
  durationMonths: number;
  oldAmount?: number;
  featured?: boolean;
  features: string[];
};

export type PaymentOrder = {
  id: string;
  orderCode: string;
  planId: PlanId;
  planName: string;
  amount: number;
  status: OrderStatus;
  bankBin: string | null;
  accountNumber: string | null;
  accountName: string | null;
  transferContent: string;
  qrImageUrl: string | null;
  qrPayload: string | null;
  checkoutUrl: string | null;
  paymentLinkId: string | null;
  createdAt: string;
  expiresAt: string;
  paidAt: string | null;
  autoConfirmAt: string | null;
};

const plans: PaymentPlan[] = [
  {
    id: 'jpd113',
    name: 'JPD113',
    label: 'Sơ cấp I',
    amount: 40000,
    durationMonths: 6,
    features: ['Kanji JPD113', 'Từ vựng JPD113', 'Ngữ pháp JPD113', 'Luyện thi JPD113', 'Luyện nói cơ bản'],
  },
  {
    id: 'combo',
    name: 'Combo Master',
    label: 'Khuyên dùng',
    amount: 70000,
    oldAmount: 80000,
    durationMonths: 6,
    featured: true,
    features: ['Toàn bộ JPD113', 'Toàn bộ JPD123', 'Luyện thi 2 khóa', 'Luyện nói 2 khóa', 'Tiết kiệm 10.000đ'],
  },
  {
    id: 'jpd123',
    name: 'JPD123',
    label: 'Sơ cấp II',
    amount: 40000,
    durationMonths: 6,
    features: ['Kanji JPD123', 'Từ vựng JPD123', 'Ngữ pháp JPD123', 'Luyện thi JPD123', 'Lộ trình 6 tháng'],
  },
];

const normalizeOrder = (record: {
  Id: string;
  OrderCode: string;
  PlanId: PlanId;
  PlanName: string;
  Amount: number;
  Status: OrderStatus;
  BankBin: string | null;
  AccountNumber: string | null;
  AccountName: string | null;
  TransferContent: string;
  CreatedAt: Date;
  ExpiresAt: Date;
  PaidAt: Date | null;
  AutoConfirmAt: Date | null;
  PayOsQrCode?: string | null;
  CheckoutUrl?: string | null;
  PaymentLinkId?: string | null;
}): PaymentOrder => ({
  id: record.Id,
  orderCode: record.OrderCode,
  planId: record.PlanId,
  planName: record.PlanName,
  amount: record.Amount,
  status: record.Status,
  bankBin: record.BankBin,
  accountNumber: record.AccountNumber,
  accountName: record.AccountName,
  transferContent: record.TransferContent,
  qrPayload: record.PayOsQrCode ?? null,
  checkoutUrl: record.CheckoutUrl ?? null,
  paymentLinkId: record.PaymentLinkId ?? null,
  qrImageUrl: record.PayOsQrCode
    ? buildQrImageFromPayload(record.PayOsQrCode)
    : buildQrUrl({
    bankBin: record.BankBin,
    accountNumber: record.AccountNumber,
    accountName: record.AccountName,
    amount: record.Amount,
    content: record.TransferContent,
  }),
  createdAt: record.CreatedAt.toISOString(),
  expiresAt: record.ExpiresAt.toISOString(),
  paidAt: record.PaidAt?.toISOString() ?? null,
  autoConfirmAt: record.AutoConfirmAt?.toISOString() ?? null,
});

const buildQrUrl = (input: {
  bankBin: string | null;
  accountNumber: string | null;
  accountName: string | null;
  amount: number;
  content: string;
}) => {
  if (!input.bankBin || !input.accountNumber) return null;
  const query = new URLSearchParams({
    amount: String(input.amount),
    addInfo: input.content,
    accountName: input.accountName ?? 'JP FORUS',
  });
  return `https://img.vietqr.io/image/${input.bankBin}-${input.accountNumber}-compact2.png?${query.toString()}`;
};

const buildQrImageFromPayload = (payload: string) => {
  if (payload.startsWith('http') || payload.startsWith('data:image')) return payload;
  const query = new URLSearchParams({ size: '280x280', margin: '12', data: payload });
  return `https://api.qrserver.com/v1/create-qr-code/?${query.toString()}`;
};

const generateOrderCode = () => {
  return Number(`${Date.now().toString().slice(-9)}${Math.floor(Math.random() * 90 + 10)}`);
};

const getPlan = (planId: string) => plans.find(plan => plan.id === planId && plan);

export const listPlans = () => plans;

export const createPaymentOrder = async (userId: string, planId: string) => {
  const plan = getPlan(planId);
  if (!plan) return null;

  const orderCode = generateOrderCode();
  const orderCodeText = String(orderCode);
  const autoDelaySeconds = 30 + Math.floor(Math.random() * 91);
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
  const autoConfirmAt = env.payment.autoConfirmDemo ? new Date(Date.now() + autoDelaySeconds * 1000) : null;
  
  const pool = await getPool();
  await pool.query(`
    INSERT INTO "PaymentOrders" (
      "OrderCode", "UserId", "PlanId", "Amount", "BankBin", "AccountNumber", "AccountName",
      "TransferContent", "ExpiresAt", "AutoConfirmAt"
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  `, [
    orderCodeText, userId, plan.id, plan.amount, env.payment.bankBin || null,
    env.payment.accountNumber || null, env.payment.accountName || null, `JPF${orderCode}`,
    expiresAt, autoConfirmAt
  ]);

  const payos = getPayOS();
  if (payos) {
    const expiredAt = Math.floor(expiresAt.getTime() / 1000);
    const returnUrl = `${env.clientUrl}/checkout/${orderCodeText}?payos=return`;
    const cancelUrl = `${env.clientUrl}/checkout/${orderCodeText}?payos=cancel`;
    const paymentLink = await payos.paymentRequests.create({
      orderCode,
      amount: plan.amount,
      description: `JPF${orderCode}`,
      returnUrl,
      cancelUrl,
      expiredAt,
      items: [{ name: `JP Forus ${plan.name}`, quantity: 1, price: plan.amount }],
    });

    await pool.query(`
      UPDATE "PaymentOrders"
      SET "BankBin" = $1, "AccountNumber" = $2, "AccountName" = $3,
          "PaymentLinkId" = $4, "CheckoutUrl" = $5, "PayOsQrCode" = $6
      WHERE "OrderCode" = $7
    `, [
      paymentLink.bin, paymentLink.accountNumber, paymentLink.accountName,
      paymentLink.paymentLinkId, paymentLink.checkoutUrl, paymentLink.qrCode,
      orderCodeText
    ]);
  }

  return getPaymentOrderForUser(userId, orderCodeText);
};

export const getPaymentOrderForUser = async (userId: string, orderCode: string) => {
  await expireStaleOrders();
  await autoConfirmOrderForDemo(userId, orderCode);

  const pool = await getPool();
  const result = await pool.query(`
    SELECT
      o."Id", o."OrderCode", o."PlanId", p."Name" AS "PlanName", o."Amount",
      o."Status", o."BankBin", o."AccountNumber", o."AccountName",
      o."TransferContent", o."CreatedAt", o."ExpiresAt", o."PaidAt",
      o."AutoConfirmAt", o."PayOsQrCode", o."CheckoutUrl", o."PaymentLinkId"
    FROM "PaymentOrders" o
    JOIN "SubscriptionPlans" p ON p."Id" = o."PlanId"
    WHERE o."UserId" = $1 AND o."OrderCode" = $2
    LIMIT 1
  `, [userId, orderCode]);

  const order = result.rows[0];
  return order ? normalizeOrder(order) : null;
};

const getPaymentOrderByCode = async (orderCode: string) => {
  const pool = await getPool();
  const result = await pool.query(`
    SELECT
      o."Id", o."OrderCode", o."PlanId", p."Name" AS "PlanName", o."Amount",
      o."Status", o."BankBin", o."AccountNumber", o."AccountName",
      o."TransferContent", o."CreatedAt", o."ExpiresAt", o."PaidAt",
      o."AutoConfirmAt", o."PayOsQrCode", o."CheckoutUrl", o."PaymentLinkId"
    FROM "PaymentOrders" o
    JOIN "SubscriptionPlans" p ON p."Id" = o."PlanId"
    WHERE o."OrderCode" = $1
    LIMIT 1
  `, [orderCode]);

  const order = result.rows[0];
  return order ? normalizeOrder(order) : null;
};

export const markOrderPaid = async (input: {
  userId: string;
  orderCode: string;
  transactionRef?: string | null;
  grantSubscription?: boolean;
}) => {
  const pool = await getPool();
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const orderResult = await client.query<{
      Id: string; UserId: string; PlanId: PlanId; Status: OrderStatus; DurationMonths: number;
    }>(`
      SELECT o."Id", o."UserId", o."PlanId", o."Status", p."DurationMonths"
      FROM "PaymentOrders" o
      JOIN "SubscriptionPlans" p ON p."Id" = o."PlanId"
      WHERE o."UserId" = $1 AND o."OrderCode" = $2
      LIMIT 1
    `, [input.userId, input.orderCode]);

    const order = orderResult.rows[0];
    if (!order) {
      await client.query('ROLLBACK');
      return null;
    }

    if (order.Status === 'paid') {
      await client.query('COMMIT');
      return getPaymentOrderForUser(input.userId, input.orderCode);
    }

    if (order.Status !== 'pending') {
      await client.query('ROLLBACK');
      return null;
    }

    await client.query(`
      UPDATE "PaymentOrders"
      SET "Status" = 'paid', "PaidAt" = CURRENT_TIMESTAMP, "TransactionRef" = $1
      WHERE "Id" = $2 AND "Status" = 'pending'
    `, [input.transactionRef ?? null, order.Id]);

    if (input.grantSubscription !== false) {
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + order.DurationMonths);
      await client.query(`
        INSERT INTO "UserSubscriptions" ("UserId", "PlanId", "PaymentOrderId", "ExpiresAt")
        VALUES ($1, $2, $3, $4)
      `, [order.UserId, order.PlanId, order.Id, expiresAt]);
    }

    await client.query('COMMIT');
    return getPaymentOrderForUser(input.userId, input.orderCode);
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const markOrderPaidByTransfer = async (input: {
  orderCode: string;
  amount: number;
  transactionRef?: string | null;
}) => {
  const pool = await getPool();
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const orderResult = await client.query<{
      Id: string; UserId: string; PlanId: PlanId; Status: OrderStatus; DurationMonths: number;
    }>(`
      SELECT o."Id", o."UserId", o."PlanId", o."Status", p."DurationMonths"
      FROM "PaymentOrders" o
      JOIN "SubscriptionPlans" p ON p."Id" = o."PlanId"
      WHERE o."OrderCode" = $1 AND o."Amount" = $2
      LIMIT 1
    `, [input.orderCode, input.amount]);

    const order = orderResult.rows[0];
    if (!order || order.Status !== 'pending') {
      await client.query('ROLLBACK');
      return null;
    }

    await client.query(`
      UPDATE "PaymentOrders"
      SET "Status" = 'paid', "PaidAt" = CURRENT_TIMESTAMP, "TransactionRef" = $1
      WHERE "Id" = $2 AND "Status" = 'pending'
    `, [input.transactionRef ?? null, order.Id]);

    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + order.DurationMonths);
    await client.query(`
      INSERT INTO "UserSubscriptions" ("UserId", "PlanId", "PaymentOrderId", "ExpiresAt")
      VALUES ($1, $2, $3, $4)
    `, [order.UserId, order.PlanId, order.Id, expiresAt]);

    await client.query('COMMIT');
    return getPaymentOrderByCode(input.orderCode);
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const getEntitlementsForUser = async (userId: string) => {
  const pool = await getPool();
  const result = await pool.query<{ PlanId: PlanId; ExpiresAt: Date }>(`
    SELECT "PlanId", MAX("ExpiresAt") AS "ExpiresAt"
    FROM "UserSubscriptions"
    WHERE "UserId" = $1 AND "ExpiresAt" > CURRENT_TIMESTAMP
    GROUP BY "PlanId"
  `, [userId]);

  const activePlans = result.rows.map(row => row.PlanId);
  const hasJpd113 = activePlans.includes('jpd113') || activePlans.includes('combo');
  const hasJpd123 = activePlans.includes('jpd123') || activePlans.includes('combo');
  const unlockedLessons = [
    ...(hasJpd113 ? ['vocabulary:jpd113:lesson:1-2', 'vocabulary:jpd113:lesson:1-3'] : []),
    ...(hasJpd123 ? ['vocabulary:jpd123:lesson:7-1', 'vocabulary:jpd123:lesson:7-2', 'vocabulary:jpd123:lesson:7-3'] : []),
  ];

  return {
    activePlans,
    unlockedLessons,
    expiresAtByPlan: Object.fromEntries(result.rows.map(row => [row.PlanId, row.ExpiresAt.toISOString()])),
  };
};

const expireStaleOrders = async () => {
  const pool = await getPool();
  await pool.query(`
    UPDATE "PaymentOrders"
    SET "Status" = 'expired'
    WHERE "Status" = 'pending' AND "ExpiresAt" <= CURRENT_TIMESTAMP
  `);
};

const autoConfirmOrderForDemo = async (userId: string, orderCode: string) => {
  if (!env.payment.autoConfirmDemo) return;

  const pool = await getPool();
  const result = await pool.query<{ ShouldConfirm: number }>(`
    SELECT CASE WHEN EXISTS (
      SELECT 1
      FROM "PaymentOrders"
      WHERE "UserId" = $1
        AND "OrderCode" = $2
        AND "Status" = 'pending'
        AND "AutoConfirmAt" IS NOT NULL
        AND "AutoConfirmAt" <= CURRENT_TIMESTAMP
    ) THEN 1 ELSE 0 END AS "ShouldConfirm"
  `, [userId, orderCode]);

  if (result.rows[0]?.ShouldConfirm === 1) {
    await markOrderPaid({
      userId,
      orderCode,
      transactionRef: `DEMO-${orderCode}`,
      grantSubscription: false,
    });
  }
};
