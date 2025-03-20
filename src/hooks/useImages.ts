import { useQuery } from '@tanstack/react-query';
import createImageQueryOptions from '@/queryOptions/createImageQueryOptions';

export const useImages = () => {
  return useQuery(createImageQueryOptions());
};
