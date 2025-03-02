// src/actions/userActions.ts
'use server';

import { db } from './db';
import * as schema from './schema';

// Function to create a new user
export async function createUser(username: string) {
  const insertedUser = await db
    .insert(schema.user)
    .values({
      username,
    })
    .returning();

  return insertedUser;
}

export async function getOrganisations() {
  const organisations = await db.select().from(schema.organisation).execute();

  return organisations;
}

export async function createOrganisation(organisation) {
  const insertedOrganisation = await db
    .insert(schema.organisation)
    .values(organisation)
    .returning();

  return insertedOrganisation;
}

export async function createImage({
  image,
}: {
  image: { name: string; url: string; status: string };
}) {
  const insertedImage = await db.insert(schema.image).values(image).returning();
  return insertedImage;
}

export async function getImages() {
  const images = await db.select().from(schema.image).execute();
  return images;
}
