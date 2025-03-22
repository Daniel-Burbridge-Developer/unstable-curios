'use client';

import { useImages } from '@/hooks/useImages';
import { DBImage } from '@/types/database-types';

const AdminDashboard = () => {
  const { data, error, isLoading } = useImages();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (data == undefined) return <div> oopsies </div>;

  return (
    <div>
      <div>
        {data.map((image: DBImage, i: number) => (
          <img key={i} src={String(image.url)} alt='Image' />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
