import { subcollection } from '@/server/db/schema';

export const getSubcollections = async (): Promise<
  (typeof subcollection)[]
> => {
  const response = await fetch('/api/subcollections');
  if (!response.ok) {
    throw new Error('Failed to fetch subcollections');
  }
  return response.json();
};

export const getSubcollectionById = async (
  id: number
): Promise<typeof subcollection> => {
  const response = await fetch(`/api/subcollections/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch subcollections');
  }
  return response.json();
};
