'use client';

import { UTUploadDropzone } from '@/components/ut-dropzone-uploader';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import AdminCreationForm from '@/components/admin-creation-form';

const AdminPage = () => {
  return (
    <div className='flex min-w-full min-h-svh flex-col gap-4 justify-center items-center bg-slate-800'>
      <div>Admin Controls</div>
      <AdminCreationForm />
    </div>
  );
};

export default AdminPage;
