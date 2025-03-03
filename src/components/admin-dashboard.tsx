"use client";

import { useState, useEffect } from "react";
import { getImages } from "@/server/db/queries";
import { UTUploadDropzone } from "./ut-dropzone-uploader";

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
    <div className="bg-slate-600 min-h-screen grid grid-rows-[auto,1fr]">
      <header className="bg-blue-600 text-white p-4 shadow">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </header>
      <div className="bg-pink-400 min-w-full flex-1">
        <UTUploadDropzone uploadCompleted={fetchImages} />
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Select Product Image</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 m-2">
          {images
            ?.filter((image) => image.status === "not assigned")
            .map((image) => (
              <div key={image.id}>
                <img src={image.url} width={200} height={200} />
                <p>{image.status}</p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
