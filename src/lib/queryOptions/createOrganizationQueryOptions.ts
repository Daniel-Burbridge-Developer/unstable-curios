import { queryOptions } from '@tanstack/react-query';
import {
  getOrganisations,
  getOrganisationById,
} from '@/actions/get-organisations';

export function createOrganisationQueryOptions() {
  return queryOptions({
    queryKey: ['organisations'],
    queryFn: getOrganisations,
  });
}

export function createSingleOrganisationQueryOptions(id: number) {
  return queryOptions({
    queryKey: ['organisations', id],
    queryFn: () => getOrganisationById(id),
  });
}
