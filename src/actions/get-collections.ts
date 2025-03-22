import { collection } from '@/server/db/schema';

export const getCollections = async (): Promise<(typeof collection)[]> => {
  const response = await fetch('/api/collections');
  if (!response.ok) {
    throw new Error('Failed to fetch collections');
  }
  return response.json();
};

export const getCollectionById = async (
  id: number
): Promise<typeof collection> => {
  const response = await fetch(`/api/collections/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch collections');
  }
  return response.json();
};
