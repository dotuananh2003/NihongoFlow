CREATE TABLE IF NOT EXISTS "Users" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "Email" VARCHAR(255) NOT NULL,
    "PasswordHash" TEXT,
    "FullName" VARCHAR(255),
    "AvatarUrl" TEXT,
    "Provider" VARCHAR(50) NOT NULL DEFAULT 'local',
    "EmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMPTZ,
    "LastLoginAt" TIMESTAMPTZ
);

CREATE UNIQUE INDEX IF NOT EXISTS "UX_Users_Email" ON "Users" ("Email");

CREATE TABLE IF NOT EXISTS "ExternalLogins" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "UserId" UUID NOT NULL REFERENCES "Users"("Id") ON DELETE CASCADE,
    "Provider" VARCHAR(50) NOT NULL,
    "ProviderUserId" VARCHAR(255) NOT NULL,
    "Email" VARCHAR(255) NOT NULL,
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS "UX_ExternalLogins_ProviderUser" ON "ExternalLogins" ("Provider", "ProviderUserId");

CREATE TABLE IF NOT EXISTS "RefreshTokens" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "UserId" UUID NOT NULL REFERENCES "Users"("Id") ON DELETE CASCADE,
    "TokenHash" VARCHAR(128) NOT NULL,
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ExpiresAt" TIMESTAMPTZ NOT NULL,
    "RevokedAt" TIMESTAMPTZ
);

CREATE UNIQUE INDEX IF NOT EXISTS "UX_RefreshTokens_TokenHash" ON "RefreshTokens" ("TokenHash");
CREATE INDEX IF NOT EXISTS "IX_RefreshTokens_UserId" ON "RefreshTokens" ("UserId");

CREATE TABLE IF NOT EXISTS "PasswordResetTokens" (
    "Id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "UserId" UUID NOT NULL REFERENCES "Users"("Id") ON DELETE CASCADE,
    "TokenHash" VARCHAR(128) NOT NULL,
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ExpiresAt" TIMESTAMPTZ NOT NULL,
    "UsedAt" TIMESTAMPTZ
);

CREATE UNIQUE INDEX IF NOT EXISTS "UX_PasswordResetTokens_TokenHash" ON "PasswordResetTokens" ("TokenHash");

CREATE TABLE IF NOT EXISTS "LoginAudits" (
    "Id" BIGSERIAL PRIMARY KEY,
    "UserId" UUID REFERENCES "Users"("Id"),
    "Email" VARCHAR(255),
    "Provider" VARCHAR(50) NOT NULL,
    "Success" BOOLEAN NOT NULL,
    "IpAddress" VARCHAR(100),
    "UserAgent" TEXT,
    "CreatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
