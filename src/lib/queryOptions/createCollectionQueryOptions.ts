import { queryOptions } from '@tanstack/react-query';
import {
  getCollections,
  getCollectionsFromOrg,
} from '@/actions/get-collections';

export function createCollectionQueryOptions() {
  return queryOptions({
    queryKey: ['collections'],
    queryFn: getCollections,
  });
}

export function createSingleCollectionQueryOptions(id: number) {
  return queryOptions({
    queryKey: ['collections', id],
    queryFn: () => getCollectionsFromOrg(id),
  });
}
