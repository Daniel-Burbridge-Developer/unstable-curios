// src/stores/App-store.ts
import { createStore } from 'zustand/vanilla';

// TEST SLICES'

export type UploadStateSlice = {
  fileCount: number;
};

export type UploadActionsSlice = {
  fileDecrementCount: () => void;
  fileIncrementCount: () => void;
};

export const initUploadSlice = (): UploadStateSlice => {
  return { fileCount: new Date().getFullYear() };
};

export const defaultUploadState: UploadStateSlice = {
  fileCount: 0,
};

export type FriendsStateSlice = {
  friendCount: number;
};

export type FriendsActionsSlice = {
  friendDecrementCount: () => void;
  friendIncrementCount: () => void;
};

export const initFriendsSlice = (): FriendsStateSlice => {
  return { friendCount: 0 };
};

export const defaultFriendsState: FriendsStateSlice = {
  friendCount: 0,
};

// END OF TEST SLICES

export type AppState = UploadStateSlice & FriendsStateSlice;
export type AppActions = FriendsActionsSlice & UploadActionsSlice;

export type AppStore = AppState & AppActions;

export const initAppStore = (): AppState => {
  return { ...initUploadSlice(), ...initFriendsSlice() };
};

export const defaultInitState: AppState = {
  ...defaultUploadState,
  ...defaultFriendsState,
};

export const createAppStore = (initState: AppState = defaultInitState) => {
  return createStore<AppStore>()((set) => ({
    ...initState,
    fileDecrementCount: () =>
      set((state) => ({ fileCount: state.fileCount - 1 })),
    fileIncrementCount: () =>
      set((state) => ({ fileCount: state.fileCount + 1 })),
    friendDecrementCount: () =>
      set((state) => ({ friendCount: state.friendCount - 1 })),
    friendIncrementCount: () =>
      set((state) => ({ friendCount: state.friendCount + 1 })),
  }));
};
