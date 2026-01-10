import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { ENV } from '../config/env';

if (!ENV.DATABASE_URL) {
  throw new Error('DB_URL is not set in environment variables');
}

// initialize PostgreSQL connection pool
const pool = new Pool({ connectionString: ENV.DATABASE_URL });

// log when first connection is made
pool.on('connect', () => {
  console.log('Database is connected successfully 💯');
});

pool.on('error', () => {
  console.log('Database connection error ⚠️');
});

export const db = drizzle({ client: pool, schema });
