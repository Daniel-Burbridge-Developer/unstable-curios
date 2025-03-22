import { DBSubcollection } from '@/types/database-types';

export const getSubcollections = async (): Promise<DBSubcollection[]> => {
  const response = await fetch('/api/subcollections');
  if (!response.ok) {
    throw new Error('Failed to fetch subcollections');
  }
  return response.json();
};

export const getSubcollectionById = async (
  id: number
): Promise<DBSubcollection> => {
  const response = await fetch(`/api/subcollections/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch subcollections');
  }
  return response.json();
};
