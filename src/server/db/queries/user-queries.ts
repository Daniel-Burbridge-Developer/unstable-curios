import { db } from '@/server/db/db';
import * as schema from '@/server/db/schema';
import { eq } from 'drizzle-orm';

export async function createUser(username: string | null, clerkId: string) {
  const insertedUser = await db
    .insert(schema.user)
    .values({
      clerkId,
      username,
    })
    .returning();

  return insertedUser;
}

export async function getUserByClerkId(clerkId: string) {
  const dbUser = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.clerkId, clerkId))
    .execute();

  return dbUser;
}

export async function getCollectionPairs() {
  const images = await db.select().from(schema.userItem).execute();
  return images;
}
