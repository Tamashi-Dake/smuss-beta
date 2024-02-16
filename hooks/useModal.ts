import { create } from "zustand";

export interface ModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const createModalHook = () => {
  return create<ModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));
};

const useAuthModal = createModalHook();
const useCreateModal = createModalHook();
const useAddArtistModal = createModalHook();
const useAddCategoryModal = createModalHook();
const useAddSongModal = createModalHook();

export {
  useAuthModal,
  useCreateModal,
  useAddArtistModal,
  useAddCategoryModal,
  useAddSongModal,
};
