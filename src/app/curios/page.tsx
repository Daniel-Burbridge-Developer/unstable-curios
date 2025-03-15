'use client';
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { getOrganisations, getUserByClerkId } from '@/server/db/queries';

interface User {
  id: number;
  clerkId: string;
  username: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

interface Organisation {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
}

const UserPage = () => {
  const [user, setUser] = useState<User>({
    id: 0,
    clerkId: '',
    username: null,
    createdAt: new Date(),
    updatedAt: null,
  });

  const [organisations, setOrganisations] = useState<Array<Organisation>>([]);

  const { user: clerkUser } = useUser();
  const clerkId = clerkUser?.id;

  async function fetchCurrentUserInformation() {
    if (clerkId === undefined) {
      console.log('error, panic, how do I not have an ID');
      return;
    }

    try {
      const [dbUser] = await getUserByClerkId(clerkId);
      setUser(dbUser);
    } catch (error) {
      console.error('Failed to fetch user information:', error);
    }
  }

  async function fetchOrganisations() {
    const organisations = await getOrganisations();
    setOrganisations(organisations);
  }

  useEffect(() => {
    fetchCurrentUserInformation();
  }, [clerkUser]);

  useEffect(() => {
    fetchOrganisations();
  }, []);

  return (
    <div className='flex flex-col h-full justify-center items-center p-4'>
      <div className='mb-4 text-xl font-semibold'>
        {`Hello, ${
          user.username
            ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
            : 'User'
        }`}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {organisations.map((org) => (
          <div key={org.id} className='flex flex-col items-center'>
            <img
              src={org.imageUrl ?? ''}
              alt={org.description ?? ''}
              className='w-48 h-48 object-cover rounded-lg'
            />
            <div className='mt-2 text-center'>{org.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
