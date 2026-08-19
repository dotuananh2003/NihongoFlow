import dotenv from 'dotenv';

dotenv.config();

const required = [
  'SQL_SERVER',
  'SQL_DATABASE',
  'JWT_ACCESS_SECRET',
  'JWT_REFRESH_SECRET',
  'GOOGLE_CLIENT_ID',
] as const;

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),
  clientUrl: process.env.CLIENT_URL ?? 'http://localhost:5173',
  sql: {
    server: process.env.SQL_SERVER as string,
    database: process.env.SQL_DATABASE as string,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    port: Number(process.env.SQL_PORT ?? 1433),
    encrypt: process.env.SQL_ENCRYPT !== 'false',
    trustServerCertificate: process.env.SQL_TRUST_SERVER_CERTIFICATE !== 'false',
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET as string,
    refreshSecret: process.env.JWT_REFRESH_SECRET as string,
    accessTtl: process.env.JWT_ACCESS_TTL ?? '15m',
    refreshDays: Number(process.env.JWT_REFRESH_DAYS ?? 30),
  },
  googleClientId: process.env.GOOGLE_CLIENT_ID as string,
  payment: {
    bankBin: process.env.PAYMENT_BANK_BIN ?? '',
    accountNumber: process.env.PAYMENT_ACCOUNT_NUMBER ?? '',
    accountName: process.env.PAYMENT_ACCOUNT_NAME ?? 'JP FORUS',
    webhookSecret: process.env.PAYMENT_WEBHOOK_SECRET ?? '',
    payosClientId: process.env.PAYOS_CLIENT_ID ?? '',
    payosApiKey: process.env.PAYOS_API_KEY ?? '',
    payosChecksumKey: process.env.PAYOS_CHECKSUM_KEY ?? '',
    autoConfirmDemo: process.env.PAYMENT_AUTO_CONFIRM_DEMO
      ? process.env.PAYMENT_AUTO_CONFIRM_DEMO === 'true'
      : process.env.NODE_ENV !== 'production',
  },
};
