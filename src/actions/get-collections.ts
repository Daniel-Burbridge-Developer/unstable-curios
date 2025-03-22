import { collection as collectionTable } from '@/server/db/schema';

type Collection = typeof collectionTable.$inferSelect;

export const getCollections = async (): Promise<Collection[]> => {
  const response = await fetch('/api/collections');
  if (!response.ok) {
    throw new Error('Failed to fetch collections');
  }
  return response.json();
};

export const getCollectionById = async (id: number): Promise<Collection> => {
  const response = await fetch(`/api/collections/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch collections');
  }
  return response.json();
};
