import { useQuery } from '@tanstack/react-query';
import {
  createItemQueryOptions,
  createSingleItemQueryOptions,
} from '@/lib/queryOptions/createItemQueryOptions';

export const useItems = () => {
  return useQuery(createItemQueryOptions());
};

export const useSingleItem = (id: number) => {
  return useQuery(createSingleItemQueryOptions(id));
};
