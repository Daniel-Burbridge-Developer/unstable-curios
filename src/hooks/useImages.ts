import { useQuery } from '@tanstack/react-query';
import { createImageQueryOptions } from '@/lib/queryOptions/createImageQueryOptions';

export const useImages = () => {
  return useQuery(createImageQueryOptions());
};
