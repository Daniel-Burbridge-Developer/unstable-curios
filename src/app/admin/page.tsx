"use client";

import { UTUploadDropzone } from "@/components/ut-dropzone-uploader";
import Image from "next/image";
import { useState } from "react";

const AdminPage = () => {
  return (
    <div className="flex min-w-full min-h-svh flex-col gap-4 justify-center items-center bg-slate-800">
      <div>admin</div>
      <div className="grid grid-cols-2 gap-4"></div>
    </div>
  );
};

export default AdminPage;
