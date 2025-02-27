import { UTUploadButton } from '@/components/ut-button-uploader';
import { UTUploadDropzone } from '@/components/ut-dropzone-uploader';
import Image from 'next/image';

export default function Home() {
  const companies = [
    { name: 'Woolworths', imageURL: '/placeholder.webp' },
    { name: 'coles', imageURL: '/placeholder.webp' },
  ];
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
      <UTUploadDropzone />
      <UTUploadButton />
    </div>
  );
}
