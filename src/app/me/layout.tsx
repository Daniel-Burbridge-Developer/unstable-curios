import { currentUser } from "@clerk/nextjs/server";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
  }
}
