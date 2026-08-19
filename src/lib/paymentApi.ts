import { getStoredAccessToken } from './authApi';

const API_BASE = import.meta.env.VITE_API_URL ?? '/api';

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

export type PaymentEntitlements = {
  activePlans: PlanId[];
  unlockedLessons: string[];
  expiresAtByPlan: Record<string, string>;
};

const parseResponse = async <T>(response: Response): Promise<T> => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message ?? 'Không thể xử lý thanh toán, vui lòng thử lại.');
  }

  return data as T;
};

const request = async <T>(path: string, options: RequestInit = {}) => {
  const token = getStoredAccessToken();
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  return parseResponse<T>(response);
};

export const paymentApi = {
  listPlans: () => request<{ plans: PaymentPlan[] }>('/payments/plans'),

  getEntitlements: () => request<PaymentEntitlements>('/payments/entitlements'),

  createOrder: (planId: PlanId) =>
    request<{ order: PaymentOrder }>('/payments/orders', {
      method: 'POST',
      body: JSON.stringify({ planId }),
    }),

  getOrder: (orderCode: string) =>
    request<{ order: PaymentOrder; entitlements: PaymentEntitlements | null }>(`/payments/orders/${orderCode}`),

  devConfirmOrder: (orderCode: string) =>
    request<{ order: PaymentOrder; entitlements: PaymentEntitlements }>(`/payments/orders/${orderCode}/dev-confirm`, {
      method: 'POST',
      body: JSON.stringify({}),
    }),
};
