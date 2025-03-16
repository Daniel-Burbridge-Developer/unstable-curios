'use client';

import * as React from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { completeOnboarding } from './_actions';

export default function OnboardingComponent() {
  const [error, setError] = React.useState('');
  const { user, isLoaded } = useUser();
  const router = useRouter();

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }
  const handleSubmit = async (formData: FormData) => {
    const res = await completeOnboarding(formData);
    if (res?.message) {
      // Reloads the user's data from the Clerk API
      await user?.reload();
      //should move passed the onboarding
      router.push('/');
    }
    if (res?.error) {
      setError(res?.error);
    }
  };

  return (
    <div>
      <h1>Welcome</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleSubmit(formData);
        }}
      >
        <div>
          <label>Application Name</label>
          <p>Enter the name of your application.</p>
          <input type='text' name='applicationName' required />
        </div>

        <div>
          <label>Application Type</label>
          <p>Describe the type of your application.</p>
          <input type='text' name='applicationType' required />
        </div>
        {error && <p className='text-red-600'>Error: {error}</p>}
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
