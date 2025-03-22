import { useQuery } from '@tanstack/react-query';
import {
  createCollectionQueryOptions,
  createCollectionFromOrgQueryOptions,
} from '@/lib/queryOptions/createCollectionQueryOptions';

export const useCollections = () => {
  return useQuery(createCollectionQueryOptions());
};

export const useCollectionsFromOrg = (id: number) => {
  return useQuery(createCollectionFromOrgQueryOptions(id));
};
