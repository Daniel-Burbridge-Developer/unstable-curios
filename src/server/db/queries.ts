"use server";

import { Schema } from "zod";
import { db } from "./db";
import * as schema from "./schema";
import { eq } from "drizzle-orm";

// Function to create a new user
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
    imageUrl: organisation.organisationImageUrl,
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

export async function getCollectionsFromOrg(org_id: number) {
  const collections = await db
    .select()
    .from(schema.collection)
    .where(eq(schema.collection.organisationId, org_id))
    .execute();

  return collections;
}

export async function getItemsFromCollection(collection_id: number) {
  const items = await db
    .select()
    .from(schema.item)
    .where(eq(schema.item.collectionId, collection_id))
    .execute();

  return items;
}

export async function createCollection({
  collection,
}: {
  collection: {
    name: string;
    organisationId: number;
    description: string;
    imageUrl: string;
  };
}) {
  const insertedCollection = await db
    .insert(schema.collection)
    .values(collection)
    .returning();

  return insertedCollection;
}

export async function createItem({
  item,
}: {
  item: {
    name: string;
    collectionId: number;
    setNumber: number;
    description: string;
    imageUrl: string;
  };
}) {
  const insertedItem = await db.insert(schema.item).values(item).returning();
  return insertedItem;
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
