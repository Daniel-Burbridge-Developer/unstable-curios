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
    <div className='flex justify-center items-center'>
      <div>
        {`Hello: ${
          user.username
            ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
            : ''
        }`}
      </div>
      <div>
        {organisations.map((org) => (
          <div key={org.id}>
            <img
              src={org.imageUrl ?? ''}
              alt={org.description ?? ''}
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
