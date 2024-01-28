import { create } from "zustand";

type AdminState = {
  isAdmin: boolean;
  isIn: () => void;
  isOut: () => void;
};

const useAdminStore = create<AdminState>((set) => ({
  isAdmin: false,
  isIn: () => set({ isAdmin: true }),
  isOut: () => set({ isAdmin: false }),
}));

export default useAdminStore;
