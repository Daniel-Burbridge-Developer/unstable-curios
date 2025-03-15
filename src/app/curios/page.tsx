'use client';
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import {
  getOrganisations,
  getUserByClerkId,
  getCollectionsFromOrg,
  getItemsFromCollection,
  decreaseCollectedItem,
  collectOrIncreaseItem,
} from '@/server/db/queries';
import { Button } from '@/components/ui/button';

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

interface Collections {
  id: number;
  organisationId: number | null;
  name: string;
  description: string | null;
  imageUrl: string | null;
}

interface Items {
  id: number;
  collectionId: number | null;
  name: string;
  setNumber: number | null;
  description: string | null;
  imageUrl: string | null;
}

interface CollectionPair {
  id: number;
  userId: number | null;
  itemId: number | null;
  quantity: number;
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
  const [collections, setCollections] = useState<Array<Collections>>([]);
  const [items, setItems] = useState<Array<Items>>([]);
  const { user: clerkUser } = useUser();

  const [selectedOrg, setSelectedOrg] = useState({ name: '', id: 0 });
  const [selectedCollection, setSelectedCollection] = useState({
    name: '',
    id: 0,
  });
  const [selectedItem, setSelectedItem] = useState({ name: '', id: 0 });
  const [collectionPairs, setCollectionPairs] = useState<Array<CollectionPair>>(
    []
  );

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

  async function fetchCollections() {
    const collections = await getCollectionsFromOrg(selectedOrg.id);
    setCollections(collections);
  }

  async function fetchItems() {
    const items = await getItemsFromCollection(selectedCollection.id);
    setItems(items);
  }

  const clearFilter = () => {
    setSelectedOrg({ name: '', id: 0 });
    setSelectedCollection({ name: '', id: 0 });
    setSelectedItem({ name: '', id: 0 });
  };

  const decCollectedItem = async () => {
    const [updatedPair] = await decreaseCollectedItem(user.id, selectedItem.id);
    const updatedCollectionPairs = collectionPairs.filter(
      (pair) => !(pair.userId == user.id && pair.itemId == selectedItem.id)
    );
    const mutatedPair = {
      id: updatedPair.id,
      userId: updatedPair.userId,
      itemId: updatedPair.itemId,
      quantity: updatedPair.quantity,
    };

    updatedCollectionPairs.push(mutatedPair);
    setCollectionPairs(updatedCollectionPairs);
  };

  const incCollectedItem = () => {
    collectOrIncreaseItem(user.id, selectedItem.id);
  };

  useEffect(() => {
    fetchCurrentUserInformation();
  }, [clerkUser]);

  useEffect(() => {
    fetchOrganisations();
  }, []);

  useEffect(() => {
    if (selectedOrg.id !== 0) {
      fetchCollections();
    }
  }, [selectedOrg]);

  useEffect(() => {
    if (selectedCollection.id !== 0) {
      fetchItems();
    }
  }, [selectedCollection]);

  return (
    <div className='flex flex-col items-center h-full p-4'>
      <div className='mb-4 text-xl font-semibold'>
        {`Hello, ${
          user.username
            ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
            : 'User'
        }`}
      </div>
      <div>
        <button onClick={() => clearFilter()}>Clear Filters</button>
      </div>
      <div>
        {selectedItem.name !== '' && (
          <div className={'flex gap-4 p-4'}>
            {selectedItem.name + ' '}
            <Button onClick={() => decCollectedItem()}>lower count</Button>
            <Button onClick={() => incCollectedItem()}>increase count</Button>
          </div>
        )}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {selectedOrg.name == '' &&
          organisations.map((org) => (
            <div key={org.id} className='flex flex-col items-center'>
              <img
                onClick={() => {
                  setSelectedOrg({ name: org.name, id: org.id });
                }}
                src={org.imageUrl ?? ''}
                alt={org.description ?? ''}
                className='w-48 h-48 object-cover rounded-lg'
              />
              <div className='mt-2 text-center'>{org.name}</div>
            </div>
          ))}
        {/* {END OF ORGS} */}
        {selectedOrg.name !== '' &&
          selectedCollection.name === '' &&
          collections.map((collection) => (
            <div
              onClick={() =>
                setSelectedCollection({
                  name: collection.name,
                  id: collection.id,
                })
              }
              key={collection.id}
              className='flex flex-col items-center'
            >
              <img
                src={collection.imageUrl ?? ''}
                alt={collection.description ?? ''}
                className='w-48 h-48 object-cover rounded-lg'
              />
              <div className='mt-2 text-center'>{collection.name}</div>
            </div>
          ))}
        {/* End of Collections */}
        {selectedOrg.name !== '' &&
          selectedCollection.name !== '' &&
          items.map((item) => (
            <div
              onClick={() =>
                setSelectedItem({
                  name: item.name,
                  id: item.id,
                })
              }
              key={item.id}
              className='flex flex-col items-center'
            >
              <img
                src={item.imageUrl ?? ''}
                alt={item.description ?? ''}
                className='w-48 h-48 object-cover rounded-lg'
              />
              <div className='mt-2 text-center'>{item.name}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserPage;
