'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import {
  type AppStore,
  createAppStore,
  initAppStore,
} from '@/stores/app-store';

export type AppStoreApi = ReturnType<typeof createAppStore>;

export const AppStoreContext = createContext<AppStoreApi | undefined>(
  undefined
);

export interface AppStoreProviderProps {
  children: ReactNode;
}

export const AppStoreProvider = ({ children }: AppStoreProviderProps) => {
  const storeRef = useRef<AppStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createAppStore(initAppStore());
  }

  return (
    <AppStoreContext.Provider value={storeRef.current}>
      {children}
    </AppStoreContext.Provider>
  );
};

export const useAppStore = <T,>(selector: (store: AppStore) => T): T => {
  const appStoreContext = useContext(AppStoreContext);

  if (!appStoreContext) {
    throw new Error(`useappStore must be used within appStoreProvider`);
  }

  return useStore(appStoreContext, selector);
};
