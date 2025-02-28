// src/db.ts
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';
import { items } from './schema';

config({ path: '.env.local' });

const sql = neon(process.env.POSTGRES_URL!);
export const db = drizzle({ client: sql });

db.insert(items).values({
  collectionId: '1',
  name: 'Item 1',
  description: 'Item 1 Description',
  imageUrl: 'https://example.com/item1.jpg',
});
