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
END;

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
END;

IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'UX_PaymentOrders_OrderCode' AND object_id = OBJECT_ID(N'dbo.PaymentOrders'))
  CREATE UNIQUE INDEX UX_PaymentOrders_OrderCode ON dbo.PaymentOrders (OrderCode);

IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'IX_PaymentOrders_User_Status' AND object_id = OBJECT_ID(N'dbo.PaymentOrders'))
  CREATE INDEX IX_PaymentOrders_User_Status ON dbo.PaymentOrders (UserId, Status);

IF COL_LENGTH(N'dbo.PaymentOrders', N'PaymentLinkId') IS NULL
  ALTER TABLE dbo.PaymentOrders ADD PaymentLinkId NVARCHAR(120) NULL;

IF COL_LENGTH(N'dbo.PaymentOrders', N'CheckoutUrl') IS NULL
  ALTER TABLE dbo.PaymentOrders ADD CheckoutUrl NVARCHAR(MAX) NULL;

IF COL_LENGTH(N'dbo.PaymentOrders', N'PayOsQrCode') IS NULL
  ALTER TABLE dbo.PaymentOrders ADD PayOsQrCode NVARCHAR(MAX) NULL;

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
END;

IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = N'IX_UserSubscriptions_User_ExpiresAt' AND object_id = OBJECT_ID(N'dbo.UserSubscriptions'))
  CREATE INDEX IX_UserSubscriptions_User_ExpiresAt ON dbo.UserSubscriptions (UserId, ExpiresAt);
