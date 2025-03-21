import { queryOptions } from '@tanstack/react-query';
import { getItems, getItemById } from '@/actions/get-items';

export function createItemQueryOptions() {
  return queryOptions({
    queryKey: ['items'],
    queryFn: getItems,
  });
}

export function createSingleItemQueryOptions(id: number) {
  return queryOptions({
    queryKey: ['items', id],
    queryFn: () => getItemById(id),
  });
}
