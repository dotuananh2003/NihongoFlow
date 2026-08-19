CREATE TABLE IF NOT EXISTS "SubscriptionPlans" (
    "Id" VARCHAR(50) PRIMARY KEY,
    "Name" VARCHAR(120) NOT NULL,
    "Amount" INT NOT NULL,
    "DurationMonths" INT NOT NULL,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO "SubscriptionPlans" ("Id", "Name", "Amount", "DurationMonths")
VALUES
    ('jpd113', 'JPD113', 40000, 6),
    ('jpd123', 'JPD123', 40000, 6),
    ('combo', 'Combo Master', 70000, 6)
ON CONFLICT ("Id") DO UPDATE SET
    "Name" = EXCLUDED."Name",
    "Amount" = EXCLUDED."Amount",
    "DurationMonths" = EXCLUDED."DurationMonths",
    "IsActive" = true;

CREATE TABLE IF NOT EXISTS "PaymentOrders" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "OrderCode" VARCHAR(40) NOT NULL,
    "UserId" UUID NOT NULL REFERENCES "Users"("Id") ON DELETE CASCADE,
    "PlanId" VARCHAR(50) NOT NULL REFERENCES "SubscriptionPlans"("Id"),
    "Amount" INT NOT NULL,
    "Status" VARCHAR(20) NOT NULL DEFAULT 'pending',
    "BankBin" VARCHAR(30),
    "AccountNumber" VARCHAR(80),
    "AccountName" VARCHAR(180),
    "TransferContent" VARCHAR(120) NOT NULL,
    "TransactionRef" VARCHAR(120),
    "AutoConfirmAt" TIMESTAMPTZ,
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ExpiresAt" TIMESTAMPTZ NOT NULL,
    "PaidAt" TIMESTAMPTZ,
    "PaymentLinkId" VARCHAR(120),
    "CheckoutUrl" TEXT,
    "PayOsQrCode" TEXT
);

CREATE UNIQUE INDEX IF NOT EXISTS "UX_PaymentOrders_OrderCode" ON "PaymentOrders" ("OrderCode");
CREATE INDEX IF NOT EXISTS "IX_PaymentOrders_User_Status" ON "PaymentOrders" ("UserId", "Status");

CREATE TABLE IF NOT EXISTS "UserSubscriptions" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "UserId" UUID NOT NULL REFERENCES "Users"("Id") ON DELETE CASCADE,
    "PlanId" VARCHAR(50) NOT NULL REFERENCES "SubscriptionPlans"("Id"),
    "PaymentOrderId" UUID NOT NULL REFERENCES "PaymentOrders"("Id"),
    "StartsAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ExpiresAt" TIMESTAMPTZ NOT NULL,
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS "IX_UserSubscriptions_User_ExpiresAt" ON "UserSubscriptions" ("UserId", "ExpiresAt");
