'use client';

import { useState, useEffect } from 'react';
import { getImages } from '@/server/db/queries';
import { UTUploadDropzone } from './ut-dropzone-uploader';
import ItemCreationForm from './item-creation-form';
import { Button } from './ui/button';

const AdminDashboard = () => {
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

  return (
    <div className='bg-slate-600 min-h-screen grid grid-rows-[auto,1fr]'>
      <header className='bg-blue-600 text-white p-4 shadow'>
        <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
      </header>
      <div className='flex flex-row'>
        <div className='bg-red-400 flex-1'>
          <div className='bg-pink-400 min-w-full flex-1'>
            <UTUploadDropzone uploadCompleted={fetchImages} />
          </div>
          <div className='m-4 gap-4 flex flex-col'>
            <Button>Create Item</Button>
            <Button>Create Collection</Button>
            <Button>Create Organization</Button>
          </div>
          <div className='bg-slate-900 my-2 p-2'>
            <ItemCreationForm />
          </div>
        </div>
        <div className='flex flex-2'>
          <section>
            <h2 className='text-2xl font-semibold mb-4'>
              Select Product Image
            </h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 m-2'>
              {images
                ?.filter((image) => image.status === 'not assigned')
                .map((image) => (
                  <div key={image.id}>
                    <img src={image.url} width={200} height={200} />
                  </div>
                ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
