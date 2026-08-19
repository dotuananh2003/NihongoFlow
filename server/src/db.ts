import { Pool } from 'pg';
import { env } from './env.js';

let pool: Pool | null = null;

export const getPool = async () => {
  if (pool) return pool;
  
  pool = new Pool({
    connectionString: env.dbUrl,
    ssl: env.nodeEnv === 'production' ? { rejectUnauthorized: false } : undefined,
  });

  return pool;
};

// Remove export of sql since pg doesn't use it the same way. We'll handle queries in repositories.
