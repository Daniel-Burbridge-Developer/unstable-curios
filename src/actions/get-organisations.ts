import { DBOrganisation } from '@/types/database-types';
import { getOrganisations as fetchOrganisatios } from '@/server/db/queries/product-queries';

export const getOrganisations = async (): Promise<DBOrganisation[]> => {
  return await fetchOrganisatios();
};
