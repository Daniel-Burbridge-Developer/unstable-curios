import { useQuery } from '@tanstack/react-query';
import {
  createImageQueryOptions,
  createSingleImageQueryOptions,
} from '@/lib/queryOptions/createImageQueryOptions';

export const useImages = () => {
  return useQuery(createImageQueryOptions());
};

export const useImageById = (id: number) => {
  return useQuery(createSingleImageQueryOptions(id));
};
