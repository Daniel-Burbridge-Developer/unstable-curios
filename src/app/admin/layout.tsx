// app/admin/layout.tsx (Server Component)
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

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
    // redirect("/404");
  }

  return (
    <div>
      <NextSSRPlugin
        /**
         * The `extractRouterConfig` will extract **only** the route configs
         * from the router to prevent additional information from being
         * leaked to the client. The data passed to the client is the same
         * as if you were to fetch `/api/uploadthing` directly.
         */
        routerConfig={extractRouterConfig(ourFileRouter)}
      />
      {children}
    </div>
  );
}
