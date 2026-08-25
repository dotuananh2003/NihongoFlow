import { getPool } from '../db.js';
import type { AuthProvider, DbUser } from '../types.js';

let cachedUserColumns: Set<string> | null = null;
const getUserColumns = async () => {
  if (cachedUserColumns) return cachedUserColumns;
  const pool = await getPool();
  const result = await pool.query<{ column_name: string }>(`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'Users' OR table_name = 'users'
  `);
  cachedUserColumns = new Set(result.rows.map(row => row.column_name));
  return cachedUserColumns;
};

const buildUserSelect = (columns: Set<string>) => [
  '"Id" as "Id"',
  '"Email" as "Email"',
  columns.has('PasswordHash') ? '"PasswordHash" as "PasswordHash"' : 'NULL as "PasswordHash"',
  columns.has('FullName') ? '"FullName" as "FullName"' : 'NULL as "FullName"',
  columns.has('AvatarUrl') ? '"AvatarUrl" as "AvatarUrl"' : 'NULL as "AvatarUrl"',
  columns.has('Provider') ? '"Provider" as "Provider"' : "'local' as \"Provider\"",
  columns.has('EmailVerified') ? '"EmailVerified" as "EmailVerified"' : 'false as "EmailVerified"',
  columns.has('IsActive') ? '"IsActive" as "IsActive"' : 'true as "IsActive"',
  `(SELECT EXISTS (
    SELECT 1 FROM "UserSubscriptions" 
    WHERE "UserSubscriptions"."UserId" = "Users"."Id" 
    AND "UserSubscriptions"."ExpiresAt" > CURRENT_TIMESTAMP
  )) as "HasPremium"`
].join(', ');

export const findUserByEmail = async (email: string) => {
  const pool = await getPool();
  const columns = await getUserColumns();
  const result = await pool.query(
    `SELECT ${buildUserSelect(columns)} FROM "Users" WHERE "Email" = $1`,
    [email.toLowerCase()]
  );
  return (result.rows[0] as DbUser) ?? null;
};

export const findUserById = async (id: string) => {
  const pool = await getPool();
  const columns = await getUserColumns();
  const result = await pool.query(
    `SELECT ${buildUserSelect(columns)} FROM "Users" WHERE "Id" = $1`,
    [id]
  );
  return (result.rows[0] as DbUser) ?? null;
};

export const createUser = async (input: {
  email: string;
  passwordHash: string | null;
  fullName: string | null;
  avatarUrl: string | null;
  provider: AuthProvider;
  emailVerified: boolean;
}) => {
  const pool = await getPool();
  const columns = await getUserColumns();
  const insertColumns = ['"Email"'];
  const values: any[] = [input.email.toLowerCase()];
  const placeholders = ['$1'];
  
  let pIndex = 2;
  if (columns.has('PasswordHash')) {
    insertColumns.push('"PasswordHash"');
    values.push(input.passwordHash);
    placeholders.push(`$${pIndex++}`);
  }
  if (columns.has('FullName')) {
    insertColumns.push('"FullName"');
    values.push(input.fullName);
    placeholders.push(`$${pIndex++}`);
  }
  if (columns.has('AvatarUrl')) {
    insertColumns.push('"AvatarUrl"');
    values.push(input.avatarUrl);
    placeholders.push(`$${pIndex++}`);
  }
  if (columns.has('Provider')) {
    insertColumns.push('"Provider"');
    values.push(input.provider);
    placeholders.push(`$${pIndex++}`);
  }
  if (columns.has('EmailVerified')) {
    insertColumns.push('"EmailVerified"');
    values.push(input.emailVerified);
    placeholders.push(`$${pIndex++}`);
  }

  await pool.query(
    `INSERT INTO "Users" (${insertColumns.join(', ')}) VALUES (${placeholders.join(', ')})`,
    values
  );

  const user = await findUserByEmail(input.email);
  if (!user) throw new Error('Cannot load created user');
  return user;
};

export const touchLastLogin = async (userId: string) => {
  const pool = await getPool();
  await pool.query(
    `UPDATE "Users" SET "LastLoginAt" = CURRENT_TIMESTAMP WHERE "Id" = $1`,
    [userId]
  );
};

export const updateUserAvatar = async (userId: string, avatarUrl: string) => {
  const pool = await getPool();
  await pool.query(
    `UPDATE "Users" SET "AvatarUrl" = $1 WHERE "Id" = $2`,
    [avatarUrl, userId]
  );
};

export const upsertExternalLogin = async (input: {
  userId: string;
  provider: string;
  providerUserId: string;
  email: string;
}) => {
  const pool = await getPool();
  await pool.query(`
    INSERT INTO "ExternalLogins" ("UserId", "Provider", "ProviderUserId", "Email")
    VALUES ($1, $2, $3, $4)
    ON CONFLICT ("Provider", "ProviderUserId") DO NOTHING
  `, [input.userId, input.provider, input.providerUserId, input.email.toLowerCase()]);
};

export const saveRefreshToken = async (input: {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
}) => {
  const pool = await getPool();
  await pool.query(`
    INSERT INTO "RefreshTokens" ("UserId", "TokenHash", "ExpiresAt")
    VALUES ($1, $2, $3)
  `, [input.userId, input.tokenHash, input.expiresAt]);
};

export const findActiveRefreshToken = async (tokenHash: string) => {
  const pool = await getPool();
  const result = await pool.query<{ Id: string; UserId: string; ExpiresAt: Date }>(`
    SELECT "Id", "UserId", "ExpiresAt"
    FROM "RefreshTokens"
    WHERE "TokenHash" = $1
      AND "RevokedAt" IS NULL
      AND "ExpiresAt" > CURRENT_TIMESTAMP
    ORDER BY "CreatedAt" DESC
    LIMIT 1
  `, [tokenHash]);
  return result.rows[0] ?? null;
};

export const revokeRefreshToken = async (tokenHash: string) => {
  const pool = await getPool();
  await pool.query(`
    UPDATE "RefreshTokens"
    SET "RevokedAt" = CURRENT_TIMESTAMP
    WHERE "TokenHash" = $1 AND "RevokedAt" IS NULL
  `, [tokenHash]);
};

export const savePasswordResetToken = async (input: {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
}) => {
  const pool = await getPool();
  await pool.query(`
    INSERT INTO "PasswordResetTokens" ("UserId", "TokenHash", "ExpiresAt")
    VALUES ($1, $2, $3)
  `, [input.userId, input.tokenHash, input.expiresAt]);
};

export const usePasswordResetToken = async (tokenHash: string, passwordHash: string) => {
  const pool = await getPool();
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    const tokenResult = await client.query<{ Id: string; UserId: string }>(`
      SELECT "Id", "UserId"
      FROM "PasswordResetTokens"
      WHERE "TokenHash" = $1
        AND "UsedAt" IS NULL
        AND "ExpiresAt" > CURRENT_TIMESTAMP
      ORDER BY "CreatedAt" DESC
      LIMIT 1
    `, [tokenHash]);

    const resetToken = tokenResult.rows[0];
    if (!resetToken) {
      await client.query('ROLLBACK');
      return false;
    }

    await client.query(`
      UPDATE "Users" 
      SET "PasswordHash" = $1, 
          "Provider" = CASE WHEN "Provider" = 'google' THEN "Provider" ELSE 'local' END, 
          "UpdatedAt" = CURRENT_TIMESTAMP 
      WHERE "Id" = $2
    `, [passwordHash, resetToken.UserId]);

    await client.query(
      `UPDATE "PasswordResetTokens" SET "UsedAt" = CURRENT_TIMESTAMP WHERE "Id" = $1`,
      [resetToken.Id]
    );

    await client.query('COMMIT');
    return true;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const recordLoginAudit = async (input: {
  userId: string | null;
  email: string | null;
  provider: string;
  success: boolean;
  ipAddress: string | null;
  userAgent: string | null;
}) => {
  const pool = await getPool();
  await pool.query(`
    INSERT INTO "LoginAudits" ("UserId", "Email", "Provider", "Success", "IpAddress", "UserAgent")
    VALUES ($1, $2, $3, $4, $5, $6)
  `, [input.userId, input.email?.toLowerCase() ?? null, input.provider, input.success, input.ipAddress, input.userAgent]);
};
