import { getPool } from './db.js';

const run = async (query: string) => {
  const pool = await getPool();
  await pool.request().query(query);
};

export const ensureAuthSchema = async () => {
  await run(`
    IF OBJECT_ID(N'dbo.Users', N'U') IS NULL
    BEGIN
      CREATE TABLE dbo.Users (
        Id UNIQUEIDENTIFIER NOT NULL CONSTRAINT PK_Users PRIMARY KEY DEFAULT NEWID(),
        Email NVARCHAR(255) NOT NULL,
        PasswordHash NVARCHAR(MAX) NULL,
        FullName NVARCHAR(255) NULL,
        AvatarUrl NVARCHAR(MAX) NULL,
        Provider NVARCHAR(50) NOT NULL CONSTRAINT DF_Users_Provider DEFAULT N'local',
        EmailVerified BIT NOT NULL CONSTRAINT DF_Users_EmailVerified DEFAULT 0,
        IsActive BIT NOT NULL CONSTRAINT DF_Users_IsActive DEFAULT 1,
        CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_Users_CreatedAt DEFAULT SYSUTCDATETIME(),
        UpdatedAt DATETIME2 NULL,
        LastLoginAt DATETIME2 NULL
      );
    END
  `);

  await run(`
    IF COL_LENGTH(N'dbo.Users', N'PasswordHash') IS NULL
      ALTER TABLE dbo.Users ADD PasswordHash NVARCHAR(MAX) NULL;
    IF COL_LENGTH(N'dbo.Users', N'FullName') IS NULL
      ALTER TABLE dbo.Users ADD FullName NVARCHAR(255) NULL;
    IF COL_LENGTH(N'dbo.Users', N'AvatarUrl') IS NULL
      ALTER TABLE dbo.Users ADD AvatarUrl NVARCHAR(MAX) NULL;
    IF COL_LENGTH(N'dbo.Users', N'Provider') IS NULL
      ALTER TABLE dbo.Users ADD Provider NVARCHAR(50) NOT NULL CONSTRAINT DF_Users_Provider_Auto DEFAULT N'local';
    IF COL_LENGTH(N'dbo.Users', N'EmailVerified') IS NULL
      ALTER TABLE dbo.Users ADD EmailVerified BIT NOT NULL CONSTRAINT DF_Users_EmailVerified_Auto DEFAULT 0;
    IF COL_LENGTH(N'dbo.Users', N'IsActive') IS NULL
      ALTER TABLE dbo.Users ADD IsActive BIT NOT NULL CONSTRAINT DF_Users_IsActive_Auto DEFAULT 1;
    IF COL_LENGTH(N'dbo.Users', N'CreatedAt') IS NULL
      ALTER TABLE dbo.Users ADD CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_Users_CreatedAt_Auto DEFAULT SYSUTCDATETIME();
    IF COL_LENGTH(N'dbo.Users', N'UpdatedAt') IS NULL
      ALTER TABLE dbo.Users ADD UpdatedAt DATETIME2 NULL;
    IF COL_LENGTH(N'dbo.Users', N'LastLoginAt') IS NULL
      ALTER TABLE dbo.Users ADD LastLoginAt DATETIME2 NULL;
  `);

  await run(`
    IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'UX_Users_Email' AND object_id = OBJECT_ID(N'dbo.Users'))
      CREATE UNIQUE INDEX UX_Users_Email ON dbo.Users (Email);
  `);

  await run(`
    IF OBJECT_ID(N'dbo.ExternalLogins', N'U') IS NULL
    BEGIN
      CREATE TABLE dbo.ExternalLogins (
        Id UNIQUEIDENTIFIER NOT NULL CONSTRAINT PK_ExternalLogins PRIMARY KEY DEFAULT NEWID(),
        UserId UNIQUEIDENTIFIER NOT NULL,
        Provider NVARCHAR(50) NOT NULL,
        ProviderUserId NVARCHAR(255) NOT NULL,
        Email NVARCHAR(255) NOT NULL,
        CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_ExternalLogins_CreatedAt DEFAULT SYSUTCDATETIME(),
        CONSTRAINT FK_ExternalLogins_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE
      );
    END
  `);

  await run(`
    IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'UX_ExternalLogins_ProviderUser' AND object_id = OBJECT_ID(N'dbo.ExternalLogins'))
      CREATE UNIQUE INDEX UX_ExternalLogins_ProviderUser ON dbo.ExternalLogins (Provider, ProviderUserId);
  `);

  await run(`
    IF OBJECT_ID(N'dbo.RefreshTokens', N'U') IS NULL
    BEGIN
      CREATE TABLE dbo.RefreshTokens (
        Id UNIQUEIDENTIFIER NOT NULL CONSTRAINT PK_RefreshTokens PRIMARY KEY DEFAULT NEWID(),
        UserId UNIQUEIDENTIFIER NOT NULL,
        TokenHash NVARCHAR(128) NOT NULL,
        CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_RefreshTokens_CreatedAt DEFAULT SYSUTCDATETIME(),
        ExpiresAt DATETIME2 NOT NULL,
        RevokedAt DATETIME2 NULL,
        CONSTRAINT FK_RefreshTokens_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE
      );
    END
  `);

  await run(`
    IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'UX_RefreshTokens_TokenHash' AND object_id = OBJECT_ID(N'dbo.RefreshTokens'))
      CREATE UNIQUE INDEX UX_RefreshTokens_TokenHash ON dbo.RefreshTokens (TokenHash);
    IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'IX_RefreshTokens_UserId' AND object_id = OBJECT_ID(N'dbo.RefreshTokens'))
      CREATE INDEX IX_RefreshTokens_UserId ON dbo.RefreshTokens (UserId);
  `);

  await run(`
    IF OBJECT_ID(N'dbo.PasswordResetTokens', N'U') IS NULL
    BEGIN
      CREATE TABLE dbo.PasswordResetTokens (
        Id UNIQUEIDENTIFIER NOT NULL CONSTRAINT PK_PasswordResetTokens PRIMARY KEY DEFAULT NEWID(),
        UserId UNIQUEIDENTIFIER NOT NULL,
        TokenHash NVARCHAR(128) NOT NULL,
        CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_PasswordResetTokens_CreatedAt DEFAULT SYSUTCDATETIME(),
        ExpiresAt DATETIME2 NOT NULL,
        UsedAt DATETIME2 NULL,
        CONSTRAINT FK_PasswordResetTokens_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE
      );
    END
  `);

  await run(`
    IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'UX_PasswordResetTokens_TokenHash' AND object_id = OBJECT_ID(N'dbo.PasswordResetTokens'))
      CREATE UNIQUE INDEX UX_PasswordResetTokens_TokenHash ON dbo.PasswordResetTokens (TokenHash);
  `);

  await run(`
    IF OBJECT_ID(N'dbo.LoginAudits', N'U') IS NULL
    BEGIN
      CREATE TABLE dbo.LoginAudits (
        Id BIGINT IDENTITY(1,1) NOT NULL CONSTRAINT PK_LoginAudits PRIMARY KEY,
        UserId UNIQUEIDENTIFIER NULL,
        Email NVARCHAR(255) NULL,
        Provider NVARCHAR(50) NOT NULL,
        Success BIT NOT NULL,
        IpAddress NVARCHAR(100) NULL,
        UserAgent NVARCHAR(MAX) NULL,
        CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_LoginAudits_CreatedAt DEFAULT SYSUTCDATETIME(),
        CONSTRAINT FK_LoginAudits_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id)
      );
    END
  `);

  await run(`
    IF OBJECT_ID(N'dbo.SubscriptionPlans', N'U') IS NULL
    BEGIN
      CREATE TABLE dbo.SubscriptionPlans (
        Id NVARCHAR(50) NOT NULL CONSTRAINT PK_SubscriptionPlans PRIMARY KEY,
        Name NVARCHAR(120) NOT NULL,
        Amount INT NOT NULL,
        DurationMonths INT NOT NULL,
        IsActive BIT NOT NULL CONSTRAINT DF_SubscriptionPlans_IsActive DEFAULT 1,
        CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_SubscriptionPlans_CreatedAt DEFAULT SYSUTCDATETIME()
      );
    END
  `);

  await run(`
    MERGE dbo.SubscriptionPlans AS target
    USING (VALUES
      (N'jpd113', N'JPD113', 40000, 6),
      (N'jpd123', N'JPD123', 40000, 6),
      (N'combo', N'Combo Master', 70000, 6)
    ) AS source (Id, Name, Amount, DurationMonths)
    ON target.Id = source.Id
    WHEN MATCHED THEN
      UPDATE SET Name = source.Name, Amount = source.Amount, DurationMonths = source.DurationMonths, IsActive = 1
    WHEN NOT MATCHED THEN
      INSERT (Id, Name, Amount, DurationMonths)
      VALUES (source.Id, source.Name, source.Amount, source.DurationMonths);
  `);

  await run(`
    IF OBJECT_ID(N'dbo.PaymentOrders', N'U') IS NULL
    BEGIN
      CREATE TABLE dbo.PaymentOrders (
        Id UNIQUEIDENTIFIER NOT NULL CONSTRAINT PK_PaymentOrders PRIMARY KEY DEFAULT NEWID(),
        OrderCode NVARCHAR(40) NOT NULL,
        UserId UNIQUEIDENTIFIER NOT NULL,
        PlanId NVARCHAR(50) NOT NULL,
        Amount INT NOT NULL,
        Status NVARCHAR(20) NOT NULL CONSTRAINT DF_PaymentOrders_Status DEFAULT N'pending',
        BankBin NVARCHAR(30) NULL,
        AccountNumber NVARCHAR(80) NULL,
        AccountName NVARCHAR(180) NULL,
        TransferContent NVARCHAR(120) NOT NULL,
        TransactionRef NVARCHAR(120) NULL,
        AutoConfirmAt DATETIME2 NULL,
        CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_PaymentOrders_CreatedAt DEFAULT SYSUTCDATETIME(),
        ExpiresAt DATETIME2 NOT NULL,
        PaidAt DATETIME2 NULL,
        CONSTRAINT FK_PaymentOrders_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE,
        CONSTRAINT FK_PaymentOrders_SubscriptionPlans FOREIGN KEY (PlanId) REFERENCES dbo.SubscriptionPlans(Id)
      );
    END
  `);

  await run(`
    IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'UX_PaymentOrders_OrderCode' AND object_id = OBJECT_ID(N'dbo.PaymentOrders'))
      CREATE UNIQUE INDEX UX_PaymentOrders_OrderCode ON dbo.PaymentOrders (OrderCode);
    IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'IX_PaymentOrders_User_Status' AND object_id = OBJECT_ID(N'dbo.PaymentOrders'))
      CREATE INDEX IX_PaymentOrders_User_Status ON dbo.PaymentOrders (UserId, Status);
  `);

  await run(`
    IF COL_LENGTH(N'dbo.PaymentOrders', N'PaymentLinkId') IS NULL
      ALTER TABLE dbo.PaymentOrders ADD PaymentLinkId NVARCHAR(120) NULL;
    IF COL_LENGTH(N'dbo.PaymentOrders', N'CheckoutUrl') IS NULL
      ALTER TABLE dbo.PaymentOrders ADD CheckoutUrl NVARCHAR(MAX) NULL;
    IF COL_LENGTH(N'dbo.PaymentOrders', N'PayOsQrCode') IS NULL
      ALTER TABLE dbo.PaymentOrders ADD PayOsQrCode NVARCHAR(MAX) NULL;
  `);

  await run(`
    IF OBJECT_ID(N'dbo.UserSubscriptions', N'U') IS NULL
    BEGIN
      CREATE TABLE dbo.UserSubscriptions (
        Id UNIQUEIDENTIFIER NOT NULL CONSTRAINT PK_UserSubscriptions PRIMARY KEY DEFAULT NEWID(),
        UserId UNIQUEIDENTIFIER NOT NULL,
        PlanId NVARCHAR(50) NOT NULL,
        PaymentOrderId UNIQUEIDENTIFIER NOT NULL,
        StartsAt DATETIME2 NOT NULL CONSTRAINT DF_UserSubscriptions_StartsAt DEFAULT SYSUTCDATETIME(),
        ExpiresAt DATETIME2 NOT NULL,
        CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_UserSubscriptions_CreatedAt DEFAULT SYSUTCDATETIME(),
        CONSTRAINT FK_UserSubscriptions_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(Id) ON DELETE CASCADE,
        CONSTRAINT FK_UserSubscriptions_SubscriptionPlans FOREIGN KEY (PlanId) REFERENCES dbo.SubscriptionPlans(Id),
        CONSTRAINT FK_UserSubscriptions_PaymentOrders FOREIGN KEY (PaymentOrderId) REFERENCES dbo.PaymentOrders(Id)
      );
    END
  `);

  await run(`
    IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'IX_UserSubscriptions_User_ExpiresAt' AND object_id = OBJECT_ID(N'dbo.UserSubscriptions'))
      CREATE INDEX IX_UserSubscriptions_User_ExpiresAt ON dbo.UserSubscriptions (UserId, ExpiresAt);
  `);
};
