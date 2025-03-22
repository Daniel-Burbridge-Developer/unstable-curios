import { queryOptions } from '@tanstack/react-query';
import { getOrganisations } from '@/actions/get-organisations';

export function createOrganisationQueryOptions() {
  return queryOptions({
    queryKey: ['organisations'],
    queryFn: getOrganisations,
  });
}
