"use client";

import AdminDashboard from "@/components/admin/admin-dashboard";

const AdminPage = () => {
  return (
    <div className="flex w-full h-full flex-col gap-4 justify-center items-center bg-slate-800">
      <div>Admin Controls</div>
      <div>
        <AdminDashboard />
      </div>
    </div>
  );
};

export default AdminPage;
