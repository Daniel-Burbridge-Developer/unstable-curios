"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export const completeOnboarding = async (formData: FormData) => {
  const { userId } = await auth();

  if (!userId) {
    return { message: "No Logged In User" };
  }

  const client = await clerkClient();
  const currentUser = await client.users.getUser(userId);

  try {
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        ...currentUser.publicMetadata,
        onboardingComplete: true,
      },
    });
    return { message: res.publicMetadata };
  } catch (err) {
    return { error: "There was an error updating the user metadata." };
  }
};
