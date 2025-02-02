import postgres from 'postgres';
import { DbUser } from '../schema/user';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Fetch the last 15 users
export const data = await sql<DbUser[]>`
  SELECT users.age, users.name, users.email, users.id
  FROM users
  LIMIT 15`;
