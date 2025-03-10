"use client";
import { useUser } from "@clerk/nextjs";

const UserPage = () => {
  const { user } = useUser();
  const userId = user?.id;
  return (
    <div className="flex justify-center items-center">
      <h1>{userId}</h1>
    </div>
  );
};

export default UserPage;
