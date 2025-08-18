import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// 30 second timeout so Neon has time to wake up
const sql = neon(process.env.DATABASE_URL!, {
  fetchOptions: { timeout: 30000 }
});

export const db = drizzle({ client: sql });
