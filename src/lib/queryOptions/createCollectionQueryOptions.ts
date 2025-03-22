import { queryOptions } from '@tanstack/react-query';
import { getCollections, getCollectionById } from '@/actions/get-collections';

export function createCollectionQueryOptions() {
  return queryOptions({
    queryKey: ['collections'],
    queryFn: getCollections,
  });
}

export function createSingleCollectionQueryOptions(id: number) {
  return queryOptions({
    queryKey: ['collections', id],
    queryFn: () => getCollectionById(id),
  });
}
