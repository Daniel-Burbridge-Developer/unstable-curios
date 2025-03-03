'use client';

import { UTUploadDropzone } from '@/components/ut-dropzone-uploader';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import ItemCreationForm from '@/components/item-creation-form';
import AdminDashboardInspiration from '@/components/admin-dashboard-inspiration';
import AdminDashboard from '@/components/admin-dashboard';

const AdminPage = () => {
  return (
    <div className='flex min-w-full min-h-svh flex-col gap-4 justify-center items-center bg-slate-800'>
      <div>Admin Controls</div>
      <div>
        <AdminDashboard />
        <AdminDashboardInspiration />
      </div>
      <div>
        <UTUploadDropzone />
      </div>
      <div>
        <ItemCreationForm />
      </div>
    </div>
  );
};

export default AdminPage;
