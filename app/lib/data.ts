import postgres from 'postgres';
import { User } from '../schema/user';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Fetch the last 15 users
export const data = await sql<User[]>`
  SELECT users.age, users.name, users.email, users.id, users.custom
  FROM users
  LIMIT 15`;
