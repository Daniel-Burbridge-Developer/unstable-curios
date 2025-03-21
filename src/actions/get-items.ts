import { item } from '@/server/db/schema';

export const getItems = async (): Promise<(typeof item)[]> => {
  const response = await fetch('/api/items');
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  return response.json();
};

export const getItemById = async (id: number): Promise<typeof item> => {
  const response = await fetch(`/api/items/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  return response.json();
};
