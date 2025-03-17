// app/providers/AppProviders.tsx
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers as TanstackProviders } from "@/app/providers/tanstack-query-provider";
import { AppStoreProvider } from "@/app/providers/app-store-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";

// Create the query client instance once
const queryClient = new QueryClient();

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ClerkProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <TanstackProviders>
          <AppStoreProvider>
            {children}
            <Toaster richColors />
            <Analytics />
          </AppStoreProvider>
        </TanstackProviders>
      </ThemeProvider>
    </ClerkProvider>
  );
};
