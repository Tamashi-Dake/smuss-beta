import { create } from "zustand";

export interface ModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export interface UpdateModalStore {
  isOpen: boolean;
  id: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export interface DeleteModalStore {
  isOpen: boolean;
  id: string;
  type: string;
  onOpen: (id: string, type: string) => void;
  onClose: () => void;
}

const toggleModalHook = () => {
  return create<ModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));
};

const toggleUpdateModalHook = () => {
  return create<UpdateModalStore>((set) => ({
    isOpen: false,
    id: "", // default
    onOpen: (id: string) => set({ isOpen: true, id }),
    onClose: () => set({ isOpen: false, id: "" }), // return default id when close
  }));
};

const toggleDeleteModalHook = () => {
  return create<DeleteModalStore>((set) => ({
    isOpen: false,
    id: "", // default
    type: "", // default
    onOpen: (id: string, type: string) => set({ isOpen: true, id, type }),
    onClose: () => set({ isOpen: false, id: "", type: "" }),
  }));
};

const useAuthModal = toggleModalHook();
const useAddPlaylistModal = toggleModalHook();
const useAddArtistModal = toggleModalHook();
const useAddCategoryModal = toggleModalHook();
const useAddSongModal = toggleModalHook();
const useAddUserModal = toggleModalHook();
const useSubscribeModal = toggleModalHook();
const useAdModal = toggleModalHook();

const useUpdateArtistModal = toggleUpdateModalHook();
const useUpdateCategoryModal = toggleUpdateModalHook();
const useUpdatePlaylistModal = toggleUpdateModalHook();
const useUpdateSongModal = toggleUpdateModalHook();

const useDeleteModal = toggleDeleteModalHook();

export {
  useAuthModal,
  useAddPlaylistModal,
  useAddArtistModal,
  useAddCategoryModal,
  useAddSongModal,
  useAddUserModal,
  useUpdateArtistModal,
  useUpdateCategoryModal,
  useUpdatePlaylistModal,
  useUpdateSongModal,
  useDeleteModal,
  useSubscribeModal,
  useAdModal,
};
