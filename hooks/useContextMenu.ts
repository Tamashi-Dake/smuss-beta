// import { create } from "zustand";

// export interface ContextMenuStore {
//   show: boolean;
//   id: string;
//   x: number;
//   y: number;
//   onShow: (id: string, x: number, y: number) => void;
//   onHide: () => void;
// }

// const toggleContextMenuHook = () => {
//   return create<ContextMenuStore>((set) => ({
//     show: false,
//     id: "", // default
//     x: 0,
//     y: 0,
//     onShow: (id: string, x: number, y: number) => set({ show: true, id, x, y }),
//     onHide: () => set({ show: false, id: "", x: 0, y: 0 }),
//   }));
// };

// const usePlaylistContextMenu = toggleContextMenuHook();
// const useSongContextMenu = toggleContextMenuHook();

// export { usePlaylistContextMenu, useSongContextMenu };
