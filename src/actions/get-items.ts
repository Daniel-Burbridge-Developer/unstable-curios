import { DBItem } from '@/types/database-types';

export const getItems = async (): Promise<DBItem[]> => {
  const response = await fetch('/api/items');
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  return response.json();
};

export const getItemById = async (id: number): Promise<DBItem> => {
  const response = await fetch(`/api/items/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  return response.json();
};
