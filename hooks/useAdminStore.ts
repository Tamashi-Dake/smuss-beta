import { create } from "zustand";

type AdminState = {
  isAdmin: boolean;
  checkAdmin: () => void;
};

const useAdminStore = create<AdminState>((set) => ({
  isAdmin: false,
  checkAdmin: () => set((state) => ({ isAdmin: !state.isAdmin })),
}));

export default useAdminStore;
