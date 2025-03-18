import { fetchImages } from '@/lib/api/images';
import createImageQueryOptions from '@/queryOptions/createImageQueryOptions';
import { useQuery } from '@tanstack/react-query';

const ImagePane = () => {
  const { data } = useQuery(createImageQueryOptions());
  return (
    <div>
      <div></div>
    </div>
  );
};
