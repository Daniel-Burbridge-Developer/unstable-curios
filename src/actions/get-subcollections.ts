import { DBSubcollection } from '@/types/database-types';
import { getSubcollections as fetchSubcollections } from '@/server/db/queries/product-queries';
import { getSubcollectionsFromCollection as fetchSubcollectionsFromCollection } from '@/server/db/queries/product-queries';

export const getSubcollections = async (): Promise<DBSubcollection[]> => {
  return await fetchSubcollections();
};

export const getSubcollectionsFromCollection = async (
  id: number
): Promise<DBSubcollection[]> => {
  const subcollections = await fetchSubcollectionsFromCollection(id);
  return subcollections;
};
