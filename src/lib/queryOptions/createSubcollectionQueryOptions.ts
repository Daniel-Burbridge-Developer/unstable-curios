import { queryOptions } from '@tanstack/react-query';
import {
  getSubcollections,
  getSubcollectionById,
} from '@/actions/get-subcollections';

export function createsubCollectionQueryOptions() {
  return queryOptions({
    queryKey: ['subcollections'],
    queryFn: getSubcollections,
  });
}

export function createSingleSubcollectionQueryOptions(id: number) {
  return queryOptions({
    queryKey: ['subcollections', id],
    queryFn: () => getSubcollectionById(id),
  });
}
