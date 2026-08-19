import type { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../utils/tokens.js';
import type { AuthenticatedRequestUser } from '../types.js';

declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthenticatedRequestUser;
  }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    req.user = verifyAccessToken(token);
    return next();
  } catch {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
