import { Router } from 'express';
import type { Request } from 'express';
import rateLimit from 'express-rate-limit';
import { OAuth2Client } from 'google-auth-library';
import { z } from 'zod';
import { env } from '../env.js';
import { requireAuth } from '../middleware/auth.js';
import {
  createUser,
  findActiveRefreshToken,
  findUserByEmail,
  findUserById,
  recordLoginAudit,
  revokeRefreshToken,
  savePasswordResetToken,
  saveRefreshToken,
  touchLastLogin,
  upsertExternalLogin,
  usePasswordResetToken,
  updateUserAvatar,
} from '../repositories/authRepository.js';
import { createOpaqueToken, hashPassword, sha256, verifyPassword } from '../utils/crypto.js';
import { refreshCookieOptions, signAccessToken, toPublicUser } from '../utils/tokens.js';

const router = Router();
const googleClient = new OAuth2Client(env.googleClientId);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

const emailSchema = z.string().email().max(255).transform(value => value.toLowerCase());
const passwordSchema = z.string().min(8).max(128);

const registerSchema = z.object({
  fullName: z.string().min(2).max(255),
  email: emailSchema,
  password: passwordSchema,
});

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1).max(128),
});

const googleSchema = z.object({
  credential: z.string().min(20),
});

const forgotSchema = z.object({
  email: emailSchema,
});

const resetSchema = z.object({
  token: z.string().min(20),
  password: passwordSchema,
});

const hashRefreshToken = (token: string) => sha256(`${env.jwt.refreshSecret}:${token}`);

const issueSession = async (userId: string, email: string) => {
  const refreshToken = createOpaqueToken();
  const refreshHash = hashRefreshToken(refreshToken);
  const expiresAt = new Date(Date.now() + env.jwt.refreshDays * 24 * 60 * 60 * 1000);

  await saveRefreshToken({ userId, tokenHash: refreshHash, expiresAt });

  return {
    accessToken: signAccessToken({ Id: userId, Email: email }),
    refreshToken,
  };
};

const audit = async (
  req: Request,
  input: { userId: string | null; email: string | null; provider: string; success: boolean }
) => {
  await recordLoginAudit({
    ...input,
    ipAddress: req.ip ?? null,
    userAgent: req.headers['user-agent'] ?? null,
  });
};

router.post('/register', authLimiter, async (req, res, next) => {
  try {
    const input = registerSchema.parse(req.body);
    const existing = await findUserByEmail(input.email);

    if (existing) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const passwordHash = await hashPassword(input.password);
    const user = await createUser({
      email: input.email,
      passwordHash,
      fullName: input.fullName,
      avatarUrl: null,
      provider: 'local',
      emailVerified: false,
    });
    const session = await issueSession(user.Id, user.Email);

    res.cookie('refreshToken', session.refreshToken, refreshCookieOptions());
    await touchLastLogin(user.Id);
    await audit(req, { userId: user.Id, email: user.Email, provider: 'local', success: true });

    return res.status(201).json({ user: toPublicUser(user), accessToken: session.accessToken });
  } catch (error) {
    return next(error);
  }
});

router.post('/login', authLimiter, async (req, res, next) => {
  try {
    const input = loginSchema.parse(req.body);
    const user = await findUserByEmail(input.email);

    if (!user || user.IsActive === false || !user.PasswordHash) {
      await audit(req, { userId: user?.Id ?? null, email: input.email, provider: 'local', success: false });
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordOk = await verifyPassword(input.password, user.PasswordHash);
    if (!passwordOk) {
      await audit(req, { userId: user.Id, email: input.email, provider: 'local', success: false });
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const session = await issueSession(user.Id, user.Email);
    res.cookie('refreshToken', session.refreshToken, refreshCookieOptions());
    await touchLastLogin(user.Id);
    await audit(req, { userId: user.Id, email: user.Email, provider: 'local', success: true });

    return res.json({ user: toPublicUser(user), accessToken: session.accessToken });
  } catch (error) {
    return next(error);
  }
});

router.post('/google', authLimiter, async (req, res, next) => {
  try {
    const input = googleSchema.parse(req.body);
    const ticket = await googleClient.verifyIdToken({
      idToken: input.credential,
      audience: env.googleClientId,
    });
    const payload = ticket.getPayload();

    if (!payload?.email || !payload.sub) {
      return res.status(401).json({ message: 'Invalid Google credential' });
    }

    let user = await findUserByEmail(payload.email);
    if (!user) {
      user = await createUser({
        email: payload.email,
        passwordHash: null,
        fullName: payload.name ?? payload.email,
        avatarUrl: payload.picture ?? null,
        provider: 'google',
        emailVerified: Boolean(payload.email_verified),
      });
    } else if (payload.picture && user.AvatarUrl !== payload.picture) {
      // Sync Google Avatar if it differs or was null
      await updateUserAvatar(user.Id, payload.picture);
      user.AvatarUrl = payload.picture;
    }

    if (user.IsActive === false) {
      await audit(req, { userId: user.Id, email: user.Email, provider: 'google', success: false });
      return res.status(403).json({ message: 'Account is disabled' });
    }

    await upsertExternalLogin({
      userId: user.Id,
      provider: 'google',
      providerUserId: payload.sub,
      email: payload.email,
    });

    const session = await issueSession(user.Id, user.Email);
    res.cookie('refreshToken', session.refreshToken, refreshCookieOptions());
    await touchLastLogin(user.Id);
    await audit(req, { userId: user.Id, email: user.Email, provider: 'google', success: true });

    return res.json({ user: toPublicUser(user), accessToken: session.accessToken });
  } catch (error) {
    return next(error);
  }
});

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const user = await findUserById(req.user!.id);
    if (!user || user.IsActive === false) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    return res.json({ user: toPublicUser(user) });
  } catch (error) {
    return next(error);
  }
});

router.post('/refresh', async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken as string | undefined;
    if (!refreshToken) {
      return res.status(401).json({ message: 'Missing refresh token' });
    }

    const tokenHash = hashRefreshToken(refreshToken);
    const tokenRecord = await findActiveRefreshToken(tokenHash);
    if (!tokenRecord) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const user = await findUserById(tokenRecord.UserId);
    if (!user || user.IsActive === false) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await revokeRefreshToken(tokenHash);
    const session = await issueSession(user.Id, user.Email);
    res.cookie('refreshToken', session.refreshToken, refreshCookieOptions());

    return res.json({ user: toPublicUser(user), accessToken: session.accessToken });
  } catch (error) {
    return next(error);
  }
});

router.post('/logout', async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken as string | undefined;
    if (refreshToken) {
      await revokeRefreshToken(hashRefreshToken(refreshToken));
    }

    res.clearCookie('refreshToken', { path: '/api/auth' });
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
});

router.post('/forgot-password', authLimiter, async (req, res, next) => {
  try {
    const input = forgotSchema.parse(req.body);
    const user = await findUserByEmail(input.email);

    if (user && user.IsActive !== false) {
      const resetToken = createOpaqueToken();
      await savePasswordResetToken({
        userId: user.Id,
        tokenHash: sha256(resetToken),
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      });

      if (env.nodeEnv !== 'production') {
        return res.json({
          message: 'Reset token created. Configure email delivery before production.',
          resetToken,
        });
      }
    }

    return res.json({ message: 'If the email exists, a reset link will be sent.' });
  } catch (error) {
    return next(error);
  }
});

router.post('/reset-password', authLimiter, async (req, res, next) => {
  try {
    const input = resetSchema.parse(req.body);
    const passwordHash = await hashPassword(input.password);
    const ok = await usePasswordResetToken(sha256(input.token), passwordHash);

    if (!ok) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    return res.json({ message: 'Password has been reset' });
  } catch (error) {
    return next(error);
  }
});

export { router as authRouter };
