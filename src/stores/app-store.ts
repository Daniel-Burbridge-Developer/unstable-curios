// src/stores/App-store.ts
import { createStore } from 'zustand/vanilla';

// SLICES
// UPLOAD SLICE
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

// END OF SLICES

export type AppState = UploadStateSlice; // & FriendsStateSlice;
export type AppActions = UploadActionsSlice; // & FriendsActionsSlice;

export type AppStore = AppState & AppActions;

export const initAppStore = (): AppState => {
  return { ...initUploadSlice() }; //, ...initFriendsSlice() };
};

export const defaultInitState: AppState = {
  ...defaultUploadState,
  //...defaultFriendsState,
};

export const createAppStore = (initState: AppState = defaultInitState) => {
  return createStore<AppStore>()((set) => ({
    ...initState,
    //Files
    fileDecrementCount: () =>
      set((state) => ({ fileCount: state.fileCount - 1 })),
    fileIncrementCount: () =>
      set((state) => ({ fileCount: state.fileCount + 1 })),
  }));
};
