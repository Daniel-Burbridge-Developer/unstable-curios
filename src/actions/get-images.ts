import { DBImage } from '@/types/database-types';
import { getImages as fetchImages } from '@/server/db/queries/product-queries';

export const getImages = async (): Promise<DBImage[]> => {
  return await fetchImages();
};

export const getImageById = async (id: number): Promise<DBImage> => {
  const images = await fetchImages();
  const image = images.find((img) => img.id === id);
  if (!image) {
    throw new Error('Image not found');
  }
  return image;
};
