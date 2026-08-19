import { Router } from 'express';
import { z } from 'zod';
import { env } from '../env.js';
import { requireAuth } from '../middleware/auth.js';
import { getPayOS } from '../payos.js';
import {
  createPaymentOrder,
  getEntitlementsForUser,
  getPaymentOrderForUser,
  listPlans,
  markOrderPaid,
  markOrderPaidByTransfer,
} from '../repositories/paymentRepository.js';

const router = Router();

const createOrderSchema = z.object({
  planId: z.enum(['jpd113', 'jpd123', 'combo']),
});

const transferWebhookSchema = z.object({
  orderCode: z.string().min(6).max(40),
  amount: z.number().int().positive(),
  transactionRef: z.string().max(120).optional(),
});

router.get('/plans', (_req, res) => {
  return res.json({ plans: listPlans() });
});

router.get('/entitlements', requireAuth, async (req, res, next) => {
  try {
    const entitlements = await getEntitlementsForUser(req.user!.id);
    return res.json(entitlements);
  } catch (error) {
    return next(error);
  }
});

router.post('/orders', requireAuth, async (req, res, next) => {
  try {
    const input = createOrderSchema.parse(req.body);
    const order = await createPaymentOrder(req.user!.id, input.planId);

    if (!order) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    return res.status(201).json({ order });
  } catch (error) {
    return next(error);
  }
});

router.get('/orders/:orderCode', requireAuth, async (req, res, next) => {
  try {
    const orderCode = String(req.params.orderCode);
    const order = await getPaymentOrderForUser(req.user!.id, orderCode);

    if (!order) {
      return res.status(404).json({ message: 'Payment order not found' });
    }

    const entitlements = order.status === 'paid'
      ? await getEntitlementsForUser(req.user!.id)
      : null;

    return res.json({ order, entitlements });
  } catch (error) {
    return next(error);
  }
});

router.post('/orders/:orderCode/dev-confirm', requireAuth, async (req, res, next) => {
  try {
    if (env.nodeEnv === 'production') {
      return res.status(403).json({ message: 'Dev confirmation is disabled in production' });
    }

    const orderCode = String(req.params.orderCode);
    const order = await markOrderPaid({
      userId: req.user!.id,
      orderCode,
      transactionRef: `MANUAL-${orderCode}`,
      grantSubscription: false,
    });

    if (!order) {
      return res.status(404).json({ message: 'Pending payment order not found' });
    }

    const entitlements = await getEntitlementsForUser(req.user!.id);
    return res.json({ order, entitlements });
  } catch (error) {
    return next(error);
  }
});

router.post('/webhooks/bank-transfer', async (req, res, next) => {
  try {
    if (env.payment.webhookSecret) {
      const secret = req.headers['x-payment-webhook-secret'];
      if (secret !== env.payment.webhookSecret) {
        return res.status(401).json({ message: 'Invalid payment webhook secret' });
      }
    }

    const input = transferWebhookSchema.parse(req.body);
    const order = await markOrderPaidByTransfer(input);

    if (!order) {
      return res.status(404).json({ message: 'No pending order matched this transfer' });
    }

    return res.json({ ok: true, order });
  } catch (error) {
    return next(error);
  }
});

router.post('/webhooks/payos', async (req, res, next) => {
  try {
    const payos = getPayOS();
    if (!payos) {
      return res.status(500).json({ message: 'PayOS is not configured' });
    }

    const webhookData = await payos.webhooks.verify(req.body);
    if (webhookData.code !== '00') {
      return res.json({ ok: true, ignored: true });
    }

    const order = await markOrderPaidByTransfer({
      orderCode: String(webhookData.orderCode),
      amount: webhookData.amount,
      transactionRef: webhookData.reference,
    });

    if (!order) {
      return res.json({ ok: true, ignored: true, reason: 'No pending order matched this PayOS payment' });
    }

    return res.json({ ok: true, order });
  } catch (error) {
    return next(error);
  }
});

export { router as paymentsRouter };
