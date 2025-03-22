import { useQuery } from '@tanstack/react-query';
import { createOrganisationQueryOptions } from '@/lib/queryOptions/createOrganisationQueryOptions';

export const useOrganisations = () => {
  return useQuery(createOrganisationQueryOptions());
};
