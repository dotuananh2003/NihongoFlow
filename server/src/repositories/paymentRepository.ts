import { env } from '../env.js';
import { getPool, sql } from '../db.js';
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
  if (!input.bankBin || !input.accountNumber) {
    return null;
  }

  const query = new URLSearchParams({
    amount: String(input.amount),
    addInfo: input.content,
    accountName: input.accountName ?? 'JP FORUS',
  });

  return `https://img.vietqr.io/image/${input.bankBin}-${input.accountNumber}-compact2.png?${query.toString()}`;
};

const buildQrImageFromPayload = (payload: string) => {
  if (payload.startsWith('http') || payload.startsWith('data:image')) {
    return payload;
  }

  const query = new URLSearchParams({
    size: '280x280',
    margin: '12',
    data: payload,
  });

  return `https://api.qrserver.com/v1/create-qr-code/?${query.toString()}`;
};

const generateOrderCode = () => {
  return Number(`${Date.now().toString().slice(-9)}${Math.floor(Math.random() * 90 + 10)}`);
};

const getPlan = (planId: string) => plans.find(plan => plan.id === planId && plan);

export const listPlans = () => plans;

export const createPaymentOrder = async (userId: string, planId: string) => {
  const plan = getPlan(planId);
  if (!plan) {
    return null;
  }

  const orderCode = generateOrderCode();
  const orderCodeText = String(orderCode);
  const autoDelaySeconds = 30 + Math.floor(Math.random() * 91);
  const pool = await getPool();
  await pool.request()
    .input('orderCode', sql.NVarChar(40), orderCodeText)
    .input('userId', sql.UniqueIdentifier, userId)
    .input('planId', sql.NVarChar(50), plan.id)
    .input('amount', sql.Int, plan.amount)
    .input('bankBin', sql.NVarChar(30), env.payment.bankBin || null)
    .input('accountNumber', sql.NVarChar(80), env.payment.accountNumber || null)
    .input('accountName', sql.NVarChar(180), env.payment.accountName || null)
    .input('transferContent', sql.NVarChar(120), `JPF${orderCode}`)
    .input('autoConfirmSeconds', sql.Int, env.payment.autoConfirmDemo ? autoDelaySeconds : null)
    .query(`
      INSERT INTO dbo.PaymentOrders (
        OrderCode, UserId, PlanId, Amount, BankBin, AccountNumber, AccountName,
        TransferContent, ExpiresAt, AutoConfirmAt
      )
      VALUES (
        @orderCode,
        @userId,
        @planId,
        @amount,
        @bankBin,
        @accountNumber,
        @accountName,
        @transferContent,
        DATEADD(MINUTE, 15, SYSUTCDATETIME()),
        CASE WHEN @autoConfirmSeconds IS NULL THEN NULL ELSE DATEADD(SECOND, @autoConfirmSeconds, SYSUTCDATETIME()) END
      );
    `);

  const payos = getPayOS();
  if (payos) {
    const expiredAt = Math.floor((Date.now() + 15 * 60 * 1000) / 1000);
    const returnUrl = `${env.clientUrl}/checkout/${orderCodeText}?payos=return`;
    const cancelUrl = `${env.clientUrl}/checkout/${orderCodeText}?payos=cancel`;
    const paymentLink = await payos.paymentRequests.create({
      orderCode,
      amount: plan.amount,
      description: `JPF${orderCode}`,
      returnUrl,
      cancelUrl,
      expiredAt,
      items: [
        {
          name: `JP Forus ${plan.name}`,
          quantity: 1,
          price: plan.amount,
        },
      ],
    });

    await pool.request()
      .input('orderCode', sql.NVarChar(40), orderCodeText)
      .input('bankBin', sql.NVarChar(30), paymentLink.bin)
      .input('accountNumber', sql.NVarChar(80), paymentLink.accountNumber)
      .input('accountName', sql.NVarChar(180), paymentLink.accountName)
      .input('paymentLinkId', sql.NVarChar(120), paymentLink.paymentLinkId)
      .input('checkoutUrl', sql.NVarChar(sql.MAX), paymentLink.checkoutUrl)
      .input('payOsQrCode', sql.NVarChar(sql.MAX), paymentLink.qrCode)
      .query(`
        UPDATE dbo.PaymentOrders
        SET BankBin = @bankBin,
            AccountNumber = @accountNumber,
            AccountName = @accountName,
            PaymentLinkId = @paymentLinkId,
            CheckoutUrl = @checkoutUrl,
            PayOsQrCode = @payOsQrCode
        WHERE OrderCode = @orderCode
      `);
  }

  return getPaymentOrderForUser(userId, orderCodeText);
};

export const getPaymentOrderForUser = async (userId: string, orderCode: string) => {
  await expireStaleOrders();
  await autoConfirmOrderForDemo(userId, orderCode);

  const pool = await getPool();
  const result = await pool.request()
    .input('userId', sql.UniqueIdentifier, userId)
    .input('orderCode', sql.NVarChar(40), orderCode)
    .query(`
      SELECT TOP 1
        o.Id,
        o.OrderCode,
        o.PlanId,
        p.Name AS PlanName,
        o.Amount,
        o.Status,
        o.BankBin,
        o.AccountNumber,
        o.AccountName,
        o.TransferContent,
        o.CreatedAt,
        o.ExpiresAt,
        o.PaidAt,
        o.AutoConfirmAt,
        o.PayOsQrCode,
        o.CheckoutUrl,
        o.PaymentLinkId
      FROM dbo.PaymentOrders o
      JOIN dbo.SubscriptionPlans p ON p.Id = o.PlanId
      WHERE o.UserId = @userId AND o.OrderCode = @orderCode
    `);

  const order = result.recordset[0];
  return order ? normalizeOrder(order) : null;
};

const getPaymentOrderByCode = async (orderCode: string) => {
  const pool = await getPool();
  const result = await pool.request()
    .input('orderCode', sql.NVarChar(40), orderCode)
    .query(`
      SELECT TOP 1
        o.Id,
        o.OrderCode,
        o.PlanId,
        p.Name AS PlanName,
        o.Amount,
        o.Status,
        o.BankBin,
        o.AccountNumber,
        o.AccountName,
        o.TransferContent,
        o.CreatedAt,
        o.ExpiresAt,
        o.PaidAt,
        o.AutoConfirmAt,
        o.PayOsQrCode,
        o.CheckoutUrl,
        o.PaymentLinkId
      FROM dbo.PaymentOrders o
      JOIN dbo.SubscriptionPlans p ON p.Id = o.PlanId
      WHERE o.OrderCode = @orderCode
    `);

  const order = result.recordset[0];
  return order ? normalizeOrder(order) : null;
};

export const markOrderPaid = async (input: {
  userId: string;
  orderCode: string;
  transactionRef?: string | null;
  grantSubscription?: boolean;
}) => {
  const pool = await getPool();
  const transaction = new sql.Transaction(pool);
  await transaction.begin();

  try {
    const orderResult = await new sql.Request(transaction)
      .input('userId', sql.UniqueIdentifier, input.userId)
      .input('orderCode', sql.NVarChar(40), input.orderCode)
      .query<{
        Id: string;
        UserId: string;
        PlanId: PlanId;
        Status: OrderStatus;
        DurationMonths: number;
      }>(`
        SELECT TOP 1 o.Id, o.UserId, o.PlanId, o.Status, p.DurationMonths
        FROM dbo.PaymentOrders o
        JOIN dbo.SubscriptionPlans p ON p.Id = o.PlanId
        WHERE o.UserId = @userId AND o.OrderCode = @orderCode
      `);

    const order = orderResult.recordset[0];
    if (!order) {
      await transaction.rollback();
      return null;
    }

    if (order.Status === 'paid') {
      await transaction.commit();
      return getPaymentOrderForUser(input.userId, input.orderCode);
    }

    if (order.Status !== 'pending') {
      await transaction.rollback();
      return null;
    }

    await new sql.Request(transaction)
      .input('orderId', sql.UniqueIdentifier, order.Id)
      .input('transactionRef', sql.NVarChar(120), input.transactionRef ?? null)
      .query(`
        UPDATE dbo.PaymentOrders
        SET Status = N'paid',
            PaidAt = SYSUTCDATETIME(),
            TransactionRef = @transactionRef
        WHERE Id = @orderId AND Status = N'pending'
      `);

    if (input.grantSubscription !== false) {
      await new sql.Request(transaction)
        .input('userId', sql.UniqueIdentifier, order.UserId)
        .input('planId', sql.NVarChar(50), order.PlanId)
        .input('orderId', sql.UniqueIdentifier, order.Id)
        .input('durationMonths', sql.Int, order.DurationMonths)
        .query(`
          INSERT INTO dbo.UserSubscriptions (UserId, PlanId, PaymentOrderId, ExpiresAt)
          VALUES (@userId, @planId, @orderId, DATEADD(MONTH, @durationMonths, SYSUTCDATETIME()))
        `);
    }

    await transaction.commit();
    return getPaymentOrderForUser(input.userId, input.orderCode);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const markOrderPaidByTransfer = async (input: {
  orderCode: string;
  amount: number;
  transactionRef?: string | null;
}) => {
  const pool = await getPool();
  const transaction = new sql.Transaction(pool);
  await transaction.begin();

  try {
    const orderResult = await new sql.Request(transaction)
      .input('orderCode', sql.NVarChar(40), input.orderCode)
      .input('amount', sql.Int, input.amount)
      .query<{
        Id: string;
        UserId: string;
        PlanId: PlanId;
        Status: OrderStatus;
        DurationMonths: number;
      }>(`
        SELECT TOP 1 o.Id, o.UserId, o.PlanId, o.Status, p.DurationMonths
        FROM dbo.PaymentOrders o
        JOIN dbo.SubscriptionPlans p ON p.Id = o.PlanId
        WHERE o.OrderCode = @orderCode
          AND o.Amount = @amount
      `);

    const order = orderResult.recordset[0];
    if (!order || order.Status !== 'pending') {
      await transaction.rollback();
      return null;
    }

    await new sql.Request(transaction)
      .input('orderId', sql.UniqueIdentifier, order.Id)
      .input('transactionRef', sql.NVarChar(120), input.transactionRef ?? null)
      .query(`
        UPDATE dbo.PaymentOrders
        SET Status = N'paid',
            PaidAt = SYSUTCDATETIME(),
            TransactionRef = @transactionRef
        WHERE Id = @orderId AND Status = N'pending'
      `);

    await new sql.Request(transaction)
      .input('userId', sql.UniqueIdentifier, order.UserId)
      .input('planId', sql.NVarChar(50), order.PlanId)
      .input('orderId', sql.UniqueIdentifier, order.Id)
      .input('durationMonths', sql.Int, order.DurationMonths)
      .query(`
        INSERT INTO dbo.UserSubscriptions (UserId, PlanId, PaymentOrderId, ExpiresAt)
        VALUES (@userId, @planId, @orderId, DATEADD(MONTH, @durationMonths, SYSUTCDATETIME()))
      `);

    await transaction.commit();
    return getPaymentOrderByCode(input.orderCode);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const getEntitlementsForUser = async (userId: string) => {
  const pool = await getPool();
  const result = await pool.request()
    .input('userId', sql.UniqueIdentifier, userId)
    .query<{ PlanId: PlanId; ExpiresAt: Date }>(`
      SELECT PlanId, MAX(ExpiresAt) AS ExpiresAt
      FROM dbo.UserSubscriptions
      WHERE UserId = @userId AND ExpiresAt > SYSUTCDATETIME()
      GROUP BY PlanId
    `);

  const activePlans = result.recordset.map(row => row.PlanId);
  const hasJpd113 = activePlans.includes('jpd113') || activePlans.includes('combo');
  const hasJpd123 = activePlans.includes('jpd123') || activePlans.includes('combo');
  const unlockedLessons = [
    ...(hasJpd113 ? ['vocabulary:jpd113:lesson:1-2', 'vocabulary:jpd113:lesson:1-3'] : []),
    ...(hasJpd123 ? ['vocabulary:jpd123:lesson:7-1', 'vocabulary:jpd123:lesson:7-2', 'vocabulary:jpd123:lesson:7-3'] : []),
  ];

  return {
    activePlans,
    unlockedLessons,
    expiresAtByPlan: Object.fromEntries(result.recordset.map(row => [row.PlanId, row.ExpiresAt.toISOString()])),
  };
};

const expireStaleOrders = async () => {
  const pool = await getPool();
  await pool.request().query(`
    UPDATE dbo.PaymentOrders
    SET Status = N'expired'
    WHERE Status = N'pending' AND ExpiresAt <= SYSUTCDATETIME()
  `);
};

const autoConfirmOrderForDemo = async (userId: string, orderCode: string) => {
  if (!env.payment.autoConfirmDemo) {
    return;
  }

  const pool = await getPool();
  const result = await pool.request()
    .input('userId', sql.UniqueIdentifier, userId)
    .input('orderCode', sql.NVarChar(40), orderCode)
    .query<{ ShouldConfirm: number }>(`
      SELECT CASE WHEN EXISTS (
        SELECT 1
        FROM dbo.PaymentOrders
        WHERE UserId = @userId
          AND OrderCode = @orderCode
          AND Status = N'pending'
          AND AutoConfirmAt IS NOT NULL
          AND AutoConfirmAt <= SYSUTCDATETIME()
      ) THEN 1 ELSE 0 END AS ShouldConfirm
    `);

  if (result.recordset[0]?.ShouldConfirm === 1) {
    await markOrderPaid({
      userId,
      orderCode,
      transactionRef: `DEMO-${orderCode}`,
      grantSubscription: false,
    });
  }
};
