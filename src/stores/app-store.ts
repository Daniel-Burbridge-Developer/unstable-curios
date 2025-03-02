// src/stores/App-store.ts
import { createStore } from 'zustand/vanilla';

// Slices

export type UploadSlice = {
  selectedImages: File[];
  addImage: (file: File) => void;
  removeImage: (index: number) => void;
};

export type FriendsSlice = {
  friendList: string[];
  addFriend: (friend: string) => void;
  removeFriend: (friend: string) => void;
};

// End of Slices

export type AppState = {
  count: number;
};

export type AppActions = {
  decrementCount: () => void;
  incrementCount: () => void;
};

export type AppStore = AppState & AppActions;

export const initAppStore = (): AppState => {
  return { count: new Date().getFullYear() };
};

export const defaultInitState: AppState = {
  count: 0,
};

export const createAppStore = (initState: AppState = defaultInitState) => {
  return createStore<AppStore>()((set) => ({
    ...initState,
    decrementCount: () => set((state) => ({ count: state.count - 1 })),
    incrementCount: () => set((state) => ({ count: state.count + 1 })),
  }));
};
