import { item } from '@/server/db/schema';

type Item = typeof item.$inferSelect;

export const getItems = async (): Promise<Item[]> => {
  const response = await fetch('/api/items');
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  return response.json();
};

export const getItemById = async (id: number): Promise<Item> => {
  const response = await fetch(`/api/items/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  return response.json();
};
