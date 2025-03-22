import { queryOptions } from '@tanstack/react-query';
import {
  getSubcollections,
  getSubcollectionsFromCollection,
} from '@/actions/get-subcollections';

export function createSubcollectionQueryOptions() {
  return queryOptions({
    queryKey: ['subcollections'],
    queryFn: getSubcollections,
  });
}

export function createSubcollectionFromCollectionQueryOptions(id: number) {
  return queryOptions({
    queryKey: ['subcollections', id],
    queryFn: () => getSubcollectionsFromCollection(id),
  });
}
