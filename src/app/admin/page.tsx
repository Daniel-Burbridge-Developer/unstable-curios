'use client';

import AdminDashboard from '@/components/admin-dashboard';

const AdminPage = () => {
  return (
    <div className='flex min-w-full min-h-svh flex-col gap-4 justify-center items-center bg-slate-800'>
      <div>Admin Controls</div>
      <div>
        <AdminDashboard />
      </div>
    </div>
  );
};

export default AdminPage;
