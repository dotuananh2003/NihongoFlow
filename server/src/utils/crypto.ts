import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';

export const hashPassword = (password: string) => bcrypt.hash(password, 12);

export const verifyPassword = (password: string, hash: string) => bcrypt.compare(password, hash);

export const sha256 = (value: string) => crypto.createHash('sha256').update(value).digest('hex');

export const createOpaqueToken = () => crypto.randomBytes(48).toString('base64url');
