import { db } from '@/server/db/db';
import * as schema from '@/server/db/schema';
import { eq, sql, and } from 'drizzle-orm';

// organisations

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

// collections
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

//subcollections

export async function getSubcollections() {
  const subcollections = await db.select().from(schema.subcollection).execute();

  return subcollections;
}

export async function getSubcollectionsFromCollection(collection_id: number) {
  const subcollections = await db
    .select()
    .from(schema.subcollection)
    .where(eq(schema.subcollection.collectionId, collection_id))
    .execute();

  return subcollections;
}

export async function createSubcollection({
  subcollection,
}: {
  subcollection: {
    name: string;
    collectionId: number;
    description: string;
    imageUrl: string;
  };
}) {
  const insertedSubcollection = await db
    .insert(schema.subcollection)
    .values(subcollection)
    .returning();

  return insertedSubcollection;
}

//items

export async function getItems() {
  const items = await db.select().from(schema.item).execute();
  return items;
}

export async function getItemsFromSubcollection(collection_id: number) {
  const items = await db
    .select()
    .from(schema.item)
    .where(eq(schema.item.subcollectionId, collection_id))
    .execute();

  return items;
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

export async function collectOrIncreaseItem(user_id: number, item_id: number) {
  const existingPair = await db
    .select()
    .from(schema.userItem)
    .where(
      and(
        eq(schema.userItem.userId, user_id),
        eq(schema.userItem.itemId, item_id)
      )
    )
    .execute();

  if (existingPair.length > 0) {
    const updatedPair = await db
      .update(schema.userItem)
      .set({ quantity: sql`${schema.userItem.quantity} + 1` })
      .where(
        and(
          eq(schema.userItem.userId, user_id),
          eq(schema.userItem.itemId, item_id)
        )
      )
      .returning();

    return updatedPair;
  } else {
    const insertedPair = await db
      .insert(schema.userItem)
      .values({ userId: user_id, itemId: item_id, quantity: 1 })
      .returning();

    return insertedPair;
  }
}

export async function decreaseCollectedItem(user_id: number, item_id: number) {
  const updatedPair = await db
    .update(schema.userItem)
    .set({ quantity: sql`GREATEST(${schema.userItem.quantity} - 1, 0)` })
    .where(
      and(
        eq(schema.userItem.userId, user_id),
        eq(schema.userItem.itemId, item_id)
      )
    )
    .returning();

  return updatedPair;
}

// images

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
    .set({ status: 'assigned to organisation' })
    .where(eq(schema.image.id, imageId))
    .returning();

  return updatedImage;
}

export async function getImages() {
  const images = await db.select().from(schema.image).execute();
  return images;
}
