import sql from 'mssql';
import { env } from './env.js';

const config: sql.config = {
  server: env.sql.server,
  database: env.sql.database,
  port: env.sql.port,
  options: {
    encrypt: env.sql.encrypt,
    trustServerCertificate: env.sql.trustServerCertificate,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

if (env.sql.user && env.sql.password) {
  config.user = env.sql.user;
  config.password = env.sql.password;
}

let pool: sql.ConnectionPool | null = null;

export const getPool = async () => {
  if (pool?.connected) return pool;
  pool = await sql.connect(config);
  return pool;
};

export { sql };
