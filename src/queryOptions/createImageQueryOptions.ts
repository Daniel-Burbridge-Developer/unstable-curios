import { queryOptions } from '@tanstack/react-query';
import { fetchImages } from '@/lib/api/images';

export default function createImageQueryOptions() {
  return queryOptions({
    queryKey: ['images'],
    queryFn: fetchImages,
  });
}

// EXAMPLE FOR SPECIFIC ENTRY
// const [id, setId] = useState(1);
// export default function createImageQueryOptions() {
//   return queryOptions({
//     queryKey: ['images', id],
//     queryFn: () => fetchImages(id),
//   });
// }
