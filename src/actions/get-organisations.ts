import { organisation } from '@/server/db/schema';

type Organisation = typeof organisation.$inferSelect;

export const getOrganisations = async (): Promise<Organisation[]> => {
  const response = await fetch('/api/organisations');
  if (!response.ok) {
    throw new Error('Failed to fetch organisations');
  }
  return response.json();
};

export const getOrganisationById = async (
  id: number
): Promise<Organisation> => {
  const response = await fetch(`/api/organisations/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch organisations');
  }
  return response.json();
};
