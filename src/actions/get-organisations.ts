import { organisation } from '@/server/db/schema';

export const getOrganisations = async (): Promise<(typeof organisation)[]> => {
  const response = await fetch('/api/organisations');
  if (!response.ok) {
    throw new Error('Failed to fetch organisations');
  }
  return response.json();
};

export const getOrganisationById = async (
  id: number
): Promise<typeof organisation> => {
  const response = await fetch(`/api/organisations/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch organisations');
  }
  return response.json();
};
