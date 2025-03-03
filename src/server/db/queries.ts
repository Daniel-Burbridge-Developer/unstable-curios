// src/actions/userActions.ts
"use server";

import { Users } from "lucide-react";
import { db } from "./db";
import * as schema from "./schema";
import { eq } from "drizzle-orm";

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

export async function createOrganisation({
  organisation,
}: {
  organisation: {
    organisationName: string;
    organisationDescription: string;
    organisationImageUrl: string;
  };
}) {
  const inputValue = {
    name: organisation.organisationName,
    description: organisation.organisationDescription,
    organisationImageUrl: organisation.organisationImageUrl,
  };
  const insertedOrganisation = await db
    .insert(schema.organisation)
    .values(inputValue)
    .returning();

  return insertedOrganisation;
}

export async function getCollections() {
  const collections = await db.select().from(schema.collection).execute();

  return collections;
}

export async function createCollection({
  collection,
}: {
  collection: {
    name: string;
    organisationId: number;
    description: string;
    collectionImageUrl: string;
  };
}) {
  const insertedCollection = await db
    .insert(schema.collection)
    .values(collection)
    .returning();

  return insertedCollection;
}

export async function createImage({
  image,
}: {
  image: { name: string; url: string; status: string };
}) {
  const insertedImage = await db.insert(schema.image).values(image).returning();
  return insertedImage;
}

export async function updateImage(imageId: number) {
  const updatedImage = await db
    .update(schema.image)
    .set({ status: "assigned to organisation" })
    .where(eq(schema.image.id, imageId))
    .returning();

  return updatedImage;
}

export async function getImages() {
  const images = await db.select().from(schema.image).execute();
  return images;
}
