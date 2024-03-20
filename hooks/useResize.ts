import { create } from "zustand";

export interface ResizeStore {
  width: number;
  onResize: (newWidth: number) => void;
}

const useResize = create<ResizeStore>()((set) => ({
  width: 240,
  onResize: (newWidth) => set({ width: newWidth }),
}));

export default useResize;
