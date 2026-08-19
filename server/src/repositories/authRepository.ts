import type { ConnectionPool } from 'mssql';
import { getPool, sql } from '../db.js';
import type { AuthProvider, DbUser } from '../types.js';

const getUserColumns = async (pool: ConnectionPool) => {
  const result = await pool.request().query<{ name: string }>(`
    SELECT name
    FROM sys.columns
    WHERE object_id = OBJECT_ID(N'dbo.Users')
  `);

  return new Set(result.recordset.map(column => column.name));
};

const buildUserSelect = (columns: Set<string>) => [
  'Id',
  'Email',
  columns.has('PasswordHash') ? 'PasswordHash' : 'CAST(NULL AS NVARCHAR(MAX)) AS PasswordHash',
  columns.has('FullName') ? 'FullName' : 'CAST(NULL AS NVARCHAR(255)) AS FullName',
  columns.has('AvatarUrl') ? 'AvatarUrl' : 'CAST(NULL AS NVARCHAR(MAX)) AS AvatarUrl',
  columns.has('Provider') ? 'Provider' : "CAST(N'local' AS NVARCHAR(50)) AS Provider",
  columns.has('EmailVerified') ? 'EmailVerified' : 'CAST(0 AS BIT) AS EmailVerified',
  columns.has('IsActive') ? 'IsActive' : 'CAST(1 AS BIT) AS IsActive',
].join(', ');

export const findUserByEmail = async (email: string) => {
  const pool = await getPool();
  const columns = await getUserColumns(pool);
  const result = await pool.request()
    .input('email', sql.NVarChar(255), email.toLowerCase())
    .query<DbUser>(`SELECT ${buildUserSelect(columns)} FROM dbo.Users WHERE Email = @email`);

  return result.recordset[0] ?? null;
};

export const findUserById = async (id: string) => {
  const pool = await getPool();
  const columns = await getUserColumns(pool);
  const result = await pool.request()
    .input('id', sql.UniqueIdentifier, id)
    .query<DbUser>(`SELECT ${buildUserSelect(columns)} FROM dbo.Users WHERE Id = @id`);

  return result.recordset[0] ?? null;
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
  const columns = await getUserColumns(pool);
  const insertColumns = ['Email'];
  const valueNames = ['@email'];
  const request = pool.request()
    .input('email', sql.NVarChar(255), input.email.toLowerCase());

  if (columns.has('PasswordHash')) {
    insertColumns.push('PasswordHash');
    valueNames.push('@passwordHash');
    request.input('passwordHash', sql.NVarChar(sql.MAX), input.passwordHash);
  }
  if (columns.has('FullName')) {
    insertColumns.push('FullName');
    valueNames.push('@fullName');
    request.input('fullName', sql.NVarChar(255), input.fullName);
  }
  if (columns.has('AvatarUrl')) {
    insertColumns.push('AvatarUrl');
    valueNames.push('@avatarUrl');
    request.input('avatarUrl', sql.NVarChar(sql.MAX), input.avatarUrl);
  }
  if (columns.has('Provider')) {
    insertColumns.push('Provider');
    valueNames.push('@provider');
    request.input('provider', sql.NVarChar(50), input.provider);
  }
  if (columns.has('EmailVerified')) {
    insertColumns.push('EmailVerified');
    valueNames.push('@emailVerified');
    request.input('emailVerified', sql.Bit, input.emailVerified);
  }

  await request.query(`
    INSERT INTO dbo.Users (${insertColumns.join(', ')})
    VALUES (${valueNames.join(', ')})
  `);

  const user = await findUserByEmail(input.email);
  if (!user) {
    throw new Error('Cannot load created user');
  }

  return user;
};

export const touchLastLogin = async (userId: string) => {
  const pool = await getPool();
  await pool.request()
    .input('userId', sql.UniqueIdentifier, userId)
    .query(`
      IF COL_LENGTH(N'dbo.Users', N'LastLoginAt') IS NOT NULL
      BEGIN
        EXEC sp_executesql
          N'UPDATE dbo.Users SET LastLoginAt = SYSUTCDATETIME() WHERE Id = @userId',
          N'@userId UNIQUEIDENTIFIER',
          @userId = @userId
      END
    `);
};

export const upsertExternalLogin = async (input: {
  userId: string;
  provider: string;
  providerUserId: string;
  email: string;
}) => {
  const pool = await getPool();
  await pool.request()
    .input('userId', sql.UniqueIdentifier, input.userId)
    .input('provider', sql.NVarChar(50), input.provider)
    .input('providerUserId', sql.NVarChar(255), input.providerUserId)
    .input('email', sql.NVarChar(255), input.email.toLowerCase())
    .query(`
      IF NOT EXISTS (
        SELECT 1 FROM dbo.ExternalLogins
        WHERE Provider = @provider AND ProviderUserId = @providerUserId
      )
      BEGIN
        INSERT INTO dbo.ExternalLogins (UserId, Provider, ProviderUserId, Email)
        VALUES (@userId, @provider, @providerUserId, @email)
      END
    `);
};

export const saveRefreshToken = async (input: {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
}) => {
  const pool = await getPool();
  await pool.request()
    .input('userId', sql.UniqueIdentifier, input.userId)
    .input('tokenHash', sql.NVarChar(sql.MAX), input.tokenHash)
    .input('expiresAt', sql.DateTime2, input.expiresAt)
    .query(`
      INSERT INTO dbo.RefreshTokens (UserId, TokenHash, ExpiresAt)
      VALUES (@userId, @tokenHash, @expiresAt)
    `);
};

export const findActiveRefreshToken = async (tokenHash: string) => {
  const pool = await getPool();
  const result = await pool.request()
    .input('tokenHash', sql.NVarChar(sql.MAX), tokenHash)
    .query<{ Id: string; UserId: string; ExpiresAt: Date }>(`
      SELECT TOP 1 Id, UserId, ExpiresAt
      FROM dbo.RefreshTokens
      WHERE TokenHash = @tokenHash
        AND RevokedAt IS NULL
        AND ExpiresAt > SYSUTCDATETIME()
      ORDER BY CreatedAt DESC
    `);

  return result.recordset[0] ?? null;
};

export const revokeRefreshToken = async (tokenHash: string) => {
  const pool = await getPool();
  await pool.request()
    .input('tokenHash', sql.NVarChar(sql.MAX), tokenHash)
    .query(`
      UPDATE dbo.RefreshTokens
      SET RevokedAt = SYSUTCDATETIME()
      WHERE TokenHash = @tokenHash AND RevokedAt IS NULL
    `);
};

export const savePasswordResetToken = async (input: {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
}) => {
  const pool = await getPool();
  await pool.request()
    .input('userId', sql.UniqueIdentifier, input.userId)
    .input('tokenHash', sql.NVarChar(sql.MAX), input.tokenHash)
    .input('expiresAt', sql.DateTime2, input.expiresAt)
    .query(`
      INSERT INTO dbo.PasswordResetTokens (UserId, TokenHash, ExpiresAt)
      VALUES (@userId, @tokenHash, @expiresAt)
    `);
};

export const usePasswordResetToken = async (tokenHash: string, passwordHash: string) => {
  const pool = await getPool();
  const transaction = new sql.Transaction(pool);
  await transaction.begin();

  try {
    const request = new sql.Request(transaction);
    const tokenResult = await request
      .input('tokenHash', sql.NVarChar(sql.MAX), tokenHash)
      .query<{ Id: string; UserId: string }>(`
        SELECT TOP 1 Id, UserId
        FROM dbo.PasswordResetTokens
        WHERE TokenHash = @tokenHash
          AND UsedAt IS NULL
          AND ExpiresAt > SYSUTCDATETIME()
        ORDER BY CreatedAt DESC
      `);

    const resetToken = tokenResult.recordset[0];
    if (!resetToken) {
      await transaction.rollback();
      return false;
    }

    await new sql.Request(transaction)
      .input('userId', sql.UniqueIdentifier, resetToken.UserId)
      .input('passwordHash', sql.NVarChar(sql.MAX), passwordHash)
      .query(`
        IF COL_LENGTH(N'dbo.Users', N'PasswordHash') IS NOT NULL
        BEGIN
          IF COL_LENGTH(N'dbo.Users', N'UpdatedAt') IS NOT NULL AND COL_LENGTH(N'dbo.Users', N'Provider') IS NOT NULL
          BEGIN
            EXEC sp_executesql
              N'UPDATE dbo.Users SET PasswordHash = @passwordHash, Provider = CASE WHEN Provider = ''google'' THEN Provider ELSE ''local'' END, UpdatedAt = SYSUTCDATETIME() WHERE Id = @userId',
              N'@userId UNIQUEIDENTIFIER, @passwordHash NVARCHAR(MAX)',
              @userId = @userId,
              @passwordHash = @passwordHash
          END
          ELSE IF COL_LENGTH(N'dbo.Users', N'UpdatedAt') IS NOT NULL
          BEGIN
            EXEC sp_executesql
              N'UPDATE dbo.Users SET PasswordHash = @passwordHash, UpdatedAt = SYSUTCDATETIME() WHERE Id = @userId',
              N'@userId UNIQUEIDENTIFIER, @passwordHash NVARCHAR(MAX)',
              @userId = @userId,
              @passwordHash = @passwordHash
          END
          ELSE
          BEGIN
            EXEC sp_executesql
              N'UPDATE dbo.Users SET PasswordHash = @passwordHash WHERE Id = @userId',
              N'@userId UNIQUEIDENTIFIER, @passwordHash NVARCHAR(MAX)',
              @userId = @userId,
              @passwordHash = @passwordHash
          END
        END
      `);

    await new sql.Request(transaction)
      .input('id', sql.UniqueIdentifier, resetToken.Id)
      .query('UPDATE dbo.PasswordResetTokens SET UsedAt = SYSUTCDATETIME() WHERE Id = @id');

    await transaction.commit();
    return true;
  } catch (error) {
    await transaction.rollback();
    throw error;
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
  await pool.request()
    .input('userId', sql.UniqueIdentifier, input.userId)
    .input('email', sql.NVarChar(255), input.email?.toLowerCase() ?? null)
    .input('provider', sql.NVarChar(50), input.provider)
    .input('success', sql.Bit, input.success)
    .input('ipAddress', sql.NVarChar(100), input.ipAddress)
    .input('userAgent', sql.NVarChar(sql.MAX), input.userAgent)
    .query(`
      INSERT INTO dbo.LoginAudits (UserId, Email, Provider, Success, IpAddress, UserAgent)
      VALUES (@userId, @email, @provider, @success, @ipAddress, @userAgent)
    `);
};
