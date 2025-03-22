import { DBOrganisation } from '@/types/database-types';

export const getOrganisations = async (): Promise<DBOrganisation[]> => {
  const response = await fetch('/api/organisations');
  if (!response.ok) {
    throw new Error('Failed to fetch organisations');
  }
  return response.json();
};

export const getOrganisationById = async (
  id: number
): Promise<DBOrganisation> => {
  const response = await fetch(`/api/organisations/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch organisations');
  }
  return response.json();
};
