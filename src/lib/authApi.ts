export type AuthUser = {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  provider: 'local' | 'google';
  emailVerified: boolean;
};

type AuthResponse = {
  user: AuthUser;
  accessToken: string;
};

type MessageResponse = {
  message: string;
  resetToken?: string;
};

const API_BASE = import.meta.env.VITE_API_URL ?? '/api';
const ACCESS_TOKEN_KEY = 'jp_forus_access_token';

export const getStoredAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

export const storeAccessToken = (token: string | null) => {
  if (token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
};

const parseResponse = async <T>(response: Response): Promise<T> => {
  if (response.status === 204) {
    return undefined as T;
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message ?? 'Có lỗi xảy ra, vui lòng thử lại.');
  }

  return data as T;
};

const request = async <T>(
  path: string,
  options: RequestInit = {},
  token?: string | null
) => {
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

export const authApi = {
  register: (input: { fullName: string; email: string; password: string }) =>
    request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(input),
    }),

  login: (input: { email: string; password: string }) =>
    request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(input),
    }),

  loginWithGoogle: (credential: string) =>
    request<AuthResponse>('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ credential }),
    }),

  me: (token: string) =>
    request<{ user: AuthUser }>('/auth/me', { method: 'GET' }, token),

  refresh: () =>
    request<AuthResponse>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({}),
    }),

  logout: () =>
    request<void>('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({}),
    }),

  forgotPassword: (email: string) =>
    request<MessageResponse>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),

  resetPassword: (input: { token: string; password: string }) =>
    request<MessageResponse>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(input),
    }),
};
