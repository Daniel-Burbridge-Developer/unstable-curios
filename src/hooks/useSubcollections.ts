import { useQuery } from '@tanstack/react-query';
import {
  createSubcollectionQueryOptions,
  createSubcollectionFromCollectionQueryOptions,
} from '@/lib/queryOptions/createSubcollectionQueryOptions';

export const useSubcollections = () => {
  return useQuery(createSubcollectionQueryOptions());
};

export const useSubcollectionsFromCollection = (id: number) => {
  return useQuery(createSubcollectionFromCollectionQueryOptions(id));
};
