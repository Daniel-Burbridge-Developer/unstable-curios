import { DBCollection } from '@/types/database-types';
import { getCollections as fetchCollections } from '@/server/db/queries/product-queries';
import { getCollectionsFromOrg as fetchCollectionsFromOrg } from '@/server/db/queries/product-queries';

export const getCollections = async (): Promise<DBCollection[]> => {
  return await fetchCollections();
};

export const getCollectionsFromOrg = async (
  id: number
): Promise<DBCollection[]> => {
  const collections = await fetchCollectionsFromOrg(id);
  return collections;
};
