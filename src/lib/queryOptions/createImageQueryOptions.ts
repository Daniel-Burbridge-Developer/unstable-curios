import { queryOptions } from '@tanstack/react-query';
import { getImages } from '@/actions/get-images';

export function createImageQueryOptions() {
  return queryOptions({
    queryKey: ['images'],
    queryFn: getImages,
  });
}
