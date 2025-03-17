export const fetchImages = async () => {
  const response = await fetch("/api/images");
  if (!response.ok) {
    throw new Error("Failed to fetch images");
  }
  return response.json();
};
