import { getImages, createImage } from '@/server/db/queries';

export async function GET() {
  const images = await getImages();
  return new Response(JSON.stringify(images), { status: 200 });
}

export async function POST(request: Request) {
  const data = await request.json();
  const newImage = await createImage(data);
  return new Response(JSON.stringify(newImage), { status: 201 });
}
