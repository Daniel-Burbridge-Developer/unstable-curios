import { DBImage } from '@/types/database-types';
import { getImages as fetchImages } from '@/server/db/queries/product-queries';

export const getImages = async (): Promise<DBImage[]> => {
  return await fetchImages();
};
