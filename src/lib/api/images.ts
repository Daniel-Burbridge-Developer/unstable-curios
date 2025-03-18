// REPLACE TYPE WITH ZOD
import { image } from '@/server/db/schema';

export const getImages = async (): Promise<(typeof image)[]> => {
  const response = await fetch('/api/images');
  if (!response.ok) {
    throw new Error('Failed to fetch images');
  }
  return response.json();
};

// EXAMPLE FOR SPECIFIC ENTRY
// export const getImages = async (id: number): Promise<typeof image> =>
