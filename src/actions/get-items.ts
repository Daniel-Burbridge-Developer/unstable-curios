import { DBItem } from '@/types/database-types';
import { getItems as fetchItems } from '@/server/db/queries/product-queries';
import { getItemsFromSubcollection as fetchItemsFromSubcollection } from '@/server/db/queries/product-queries';

export const getItems = async (): Promise<DBItem[]> => {
  return await fetchItems();
};

export const getItemById = async (id: number): Promise<DBItem[]> => {
  return await fetchItemsFromSubcollection(id);
};
