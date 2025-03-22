import { subcollection } from '@/server/db/schema';

type Subcollection = typeof subcollection.$inferSelect;

export const getSubcollections = async (): Promise<Subcollection[]> => {
  const response = await fetch('/api/subcollections');
  if (!response.ok) {
    throw new Error('Failed to fetch subcollections');
  }
  return response.json();
};

export const getSubcollectionById = async (
  id: number
): Promise<Subcollection> => {
  const response = await fetch(`/api/subcollections/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch subcollections');
  }
  return response.json();
};
