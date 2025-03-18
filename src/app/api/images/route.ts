import { getOrganisations, createOrganisation } from '@/server/db/queries';

export async function GET() {
  const organisations = await getOrganisations();
  return new Response(JSON.stringify(organisations), { status: 200 });
}

export async function POST(request: Request) {
  const data = await request.json();
  const newOrganisation = await createOrganisation(data);
  return new Response(JSON.stringify(newOrganisation), { status: 201 });
}
