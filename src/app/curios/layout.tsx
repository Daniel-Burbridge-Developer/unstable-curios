import { currentUser } from '@clerk/nextjs/server';

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    return (
      <div>
        <h1>No logged in user - display login stuff</h1>
      </div>
    );
  }

  if (
    !(
      Array.isArray(user.publicMetadata?.roles) &&
      user.publicMetadata.roles.includes('user')
    )
  ) {
    <div>
      <h1>{"You're not a user - How did we even get here?"}</h1>
    </div>;
  }

  return <div>{children}</div>;
}
