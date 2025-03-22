import { queryOptions } from '@tanstack/react-query';
import { getImages, getImageById } from '@/actions/get-images';

export function createImageQueryOptions() {
  return queryOptions({
    queryKey: ['images'],
    queryFn: getImages,
  });
}

export function createSingleImageQueryOptions(id: number) {
  return queryOptions({
    queryKey: ['images', id],
    queryFn: () => getImageById(id),
  });
}
