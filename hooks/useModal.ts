import { create } from "zustand";

export interface ModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const toggleModalHook = () => {
  return create<ModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));
};

const useAuthModal = toggleModalHook();
const useAddPlaylistModal = toggleModalHook();
const useAddArtistModal = toggleModalHook();
const useAddCategoryModal = toggleModalHook();
const useAddSongModal = toggleModalHook();

export {
  useAuthModal,
  useAddPlaylistModal,
  useAddArtistModal,
  useAddCategoryModal,
  useAddSongModal,
};
