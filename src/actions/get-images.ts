import { image as imageTable } from '@/server/db/schema';
import { getImages as fetchImages } from '@/server/db/queries/product-queries';

type Image = typeof imageTable.$inferSelect;

export const getImages = async (): Promise<Image[]> => {
  return await fetchImages();
};

export const getImageById = async (id: number): Promise<Image> => {
  const images = await fetchImages();
  const image = images.find((img) => img.id === id);
  if (!image) {
    throw new Error('Image not found');
  }
  return image;
};
