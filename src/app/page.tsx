'use client';
import { UTUploadButton } from '@/components/ut-button-uploader';
import { UTUploadDropzone } from '@/components/ut-dropzone-uploader';
import Image from 'next/image';
import { createUser } from '@/server/db/queries';
import { useState, useEffect } from 'react';
import { getImages } from '@/server/db/queries';
import { CounterStore } from '@/stores/app-store';

export default function Home() {
  const [username, setUsername] = useState('');
  const [result, setResult] = useState<
    { id: number; username: string; createdAt: Date; updatedAt: Date | null }[]
  >([]);

  const [images, setImages] = useState<
    {
      id: number;
      url: string;
      status: string;
      createdAt: Date;
      updatedAt: Date | null;
    }[]
  >();

  async function fetchImages() {
    const fetchedImages = await getImages();
    setImages(fetchedImages);
  }

  useEffect(() => {
    fetchImages();
  }, []);

  const companies = [
    { name: 'Woolworths', imageURL: '/placeholder.webp' },
    { name: 'Coles', imageURL: '/placeholder.webp' },
  ];

  async function handleCreateUser() {
    await setUsername('user-' + Math.random().toString(36).substring(7));
    const inserted = await createUser(username);
    setResult(inserted);
  }
  return (
    <div className='flex min-w-full min-h-svh flex-col gap-4 justify-center items-center bg-slate-800'>
      {companies.map((company) => (
        <div key={company.name} className='flex items-center justify-center'>
          <Image
            src={company.imageURL ?? '/placeholder.webp'}
            alt={company.name}
            width={200}
            height={200}
          />
        </div>
      ))}
      <UTUploadDropzone uploadCompleted={fetchImages} />
      <UTUploadButton />
      <div>
        <button onClick={handleCreateUser}>Create User</button>
        {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
      </div>
      <div>
        {images?.map((image) => (
          <div key={image.id}>
            <img src={image.url} width={200} height={200} />
            <p>{image.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
