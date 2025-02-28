// src/actions/userActions.ts
"use server";

import { db } from "./db";
import { user } from "./schema";

// Function to create a new user
export async function createUser(username: string) {
  const insertedUser = await db
    .insert(user)
    .values({
      username,
    })
    .returning();

  return insertedUser;
}
