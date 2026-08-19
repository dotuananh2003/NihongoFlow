import jwt from 'jsonwebtoken';
import { env } from '../env.js';
import type { AuthenticatedRequestUser, DbUser, PublicUser } from '../types.js';

export const toPublicUser = (user: DbUser): PublicUser => ({
  id: user.Id,
  email: user.Email,
  fullName: user.FullName,
  avatarUrl: user.AvatarUrl,
  provider: user.Provider,
  emailVerified: user.EmailVerified,
});

export const signAccessToken = (user: Pick<DbUser, 'Id' | 'Email'>) =>
  jwt.sign(
    { sub: user.Id, email: user.Email },
    env.jwt.accessSecret,
    { expiresIn: env.jwt.accessTtl as jwt.SignOptions['expiresIn'] }
  );

export const verifyAccessToken = (token: string): AuthenticatedRequestUser => {
  const payload = jwt.verify(token, env.jwt.accessSecret);
  if (typeof payload !== 'object' || !payload.sub || !payload.email) {
    throw new Error('Invalid access token');
  }

  return {
    id: String(payload.sub),
    email: String(payload.email),
  };
};

export const refreshCookieOptions = () => ({
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: env.nodeEnv === 'production',
  path: '/api/auth',
  maxAge: env.jwt.refreshDays * 24 * 60 * 60 * 1000,
});
