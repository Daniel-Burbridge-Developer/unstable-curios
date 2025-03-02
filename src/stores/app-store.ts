// src/stores/App-store.ts
import { createStore } from 'zustand/vanilla';

// Slices

// export type UploadStateSlice = {
//   selectedImages: File[];
// };

// export type UploadActionsSlice = {
//   addImage: (file: File) => void;
//   removeImage: (index: number) => void;
// };

// export type FriendsStateSlice = {
//   friendList: string[];
// };

// export type FriendsActionsSlice = {
//   addFriend: (friend: string) => void;
//   removeFriend: (friend: string) => void;
// };

// End of Slices

// TEST SLICES

export type UploadStateSlice = {
  fileCount: number;
};

export type UploadActionsSlice = {
  fileDecrementCount: () => void;
  fileIncrementCount: () => void;
};

export type FriendsStateSlice = {
  friendCount: number;
};

export type FriendsActionsSlice = {
  friendDecrementCount: () => void;
  friendIncrementCount: () => void;
};

// END OF TEST SLICES

export type AppState = UploadStateSlice & FriendsStateSlice;
export type AppActions = FriendsActionsSlice & UploadActionsSlice;

export type AppStore = AppState & AppActions;

export const initAppStore = (): AppState => {
  return { fileCount: new Date().getFullYear(), friendCount: 0 };
};

export const defaultInitState: AppState = {
  fileCount: 0,
  friendCount: 0,
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
