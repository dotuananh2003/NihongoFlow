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
GO

IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'UX_Users_Email' AND object_id = OBJECT_ID(N'dbo.Users'))
BEGIN
  CREATE UNIQUE INDEX UX_Users_Email ON dbo.Users (Email);
END
GO

IF COL_LENGTH(N'dbo.Users', N'PasswordHash') IS NULL
BEGIN
  ALTER TABLE dbo.Users ADD PasswordHash NVARCHAR(MAX) NULL;
END
GO

IF COL_LENGTH(N'dbo.Users', N'FullName') IS NULL
BEGIN
  ALTER TABLE dbo.Users ADD FullName NVARCHAR(255) NULL;
END
GO

IF COL_LENGTH(N'dbo.Users', N'AvatarUrl') IS NULL
BEGIN
  ALTER TABLE dbo.Users ADD AvatarUrl NVARCHAR(MAX) NULL;
END
GO

IF COL_LENGTH(N'dbo.Users', N'Provider') IS NULL
BEGIN
  ALTER TABLE dbo.Users ADD Provider NVARCHAR(50) NOT NULL CONSTRAINT DF_Users_Provider_Added DEFAULT N'local';
END
GO

IF COL_LENGTH(N'dbo.Users', N'EmailVerified') IS NULL
BEGIN
  ALTER TABLE dbo.Users ADD EmailVerified BIT NOT NULL CONSTRAINT DF_Users_EmailVerified_Added DEFAULT 0;
END
GO

IF COL_LENGTH(N'dbo.Users', N'IsActive') IS NULL
BEGIN
  ALTER TABLE dbo.Users ADD IsActive BIT NOT NULL CONSTRAINT DF_Users_IsActive_Added DEFAULT 1;
END
GO

IF COL_LENGTH(N'dbo.Users', N'CreatedAt') IS NULL
BEGIN
  ALTER TABLE dbo.Users ADD CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_Users_CreatedAt_Added DEFAULT SYSUTCDATETIME();
END
GO

IF COL_LENGTH(N'dbo.Users', N'UpdatedAt') IS NULL
BEGIN
  ALTER TABLE dbo.Users ADD UpdatedAt DATETIME2 NULL;
END
GO

IF COL_LENGTH(N'dbo.Users', N'LastLoginAt') IS NULL
BEGIN
  ALTER TABLE dbo.Users ADD LastLoginAt DATETIME2 NULL;
END
GO

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
GO

IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'UX_ExternalLogins_ProviderUser' AND object_id = OBJECT_ID(N'dbo.ExternalLogins'))
BEGIN
  CREATE UNIQUE INDEX UX_ExternalLogins_ProviderUser ON dbo.ExternalLogins (Provider, ProviderUserId);
END
GO

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
GO

IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'UX_RefreshTokens_TokenHash' AND object_id = OBJECT_ID(N'dbo.RefreshTokens'))
BEGIN
  CREATE UNIQUE INDEX UX_RefreshTokens_TokenHash ON dbo.RefreshTokens (TokenHash);
END
GO

IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'IX_RefreshTokens_UserId' AND object_id = OBJECT_ID(N'dbo.RefreshTokens'))
BEGIN
  CREATE INDEX IX_RefreshTokens_UserId ON dbo.RefreshTokens (UserId);
END
GO

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
GO

IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'UX_PasswordResetTokens_TokenHash' AND object_id = OBJECT_ID(N'dbo.PasswordResetTokens'))
BEGIN
  CREATE UNIQUE INDEX UX_PasswordResetTokens_TokenHash ON dbo.PasswordResetTokens (TokenHash);
END
GO

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
GO
