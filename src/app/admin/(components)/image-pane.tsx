import { fetchImages } from "@/lib/api/images";
import { useQuery } from "@tanstack/react-query";

const ImagePane = () => {
  const { data } = useQuery({
    queryKey: ["images"],
    queryFn: fetchImages,
  });
  return (
    <div>
      <div></div>
    </div>
  );
};
