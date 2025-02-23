// app/admin/layout.tsx (Server Component)
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  // If there's no user or the user does not have the "admin" role, redirect.
  if (
    !user ||
    !(
      Array.isArray(user.publicMetadata?.roles) &&
      user.publicMetadata.roles.includes("admin")
    )
  ) {
    redirect("/404");
  }

  return <div>{children}</div>;
}
