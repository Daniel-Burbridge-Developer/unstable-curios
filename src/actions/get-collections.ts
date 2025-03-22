import { DBCollection } from '@/types/database-types';

export const getCollections = async (): Promise<DBCollection[]> => {
  const response = await fetch('/api/collections');
  if (!response.ok) {
    throw new Error('Failed to fetch collections');
  }
  return response.json();
};

export const getCollectionById = async (id: number): Promise<DBCollection> => {
  const response = await fetch(`/api/collections/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch collections');
  }
  return response.json();
};
