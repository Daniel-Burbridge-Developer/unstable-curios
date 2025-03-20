import { useImages } from '@/hooks/useImages';

const AdminDashboard = () => {
  const { data, error, isLoading } = useImages();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (data == undefined) return <div> oopsies </div>;

  return (
    <div>
      <div>
        {data.map((image, i) => (
          <img key={i} src={String(image.url)} alt='Image' />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
