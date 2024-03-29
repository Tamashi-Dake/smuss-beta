import { create } from "zustand";

export interface NowPlayingStore {
  isShow: boolean;
  onShow: () => void;
  onHide: () => void;
}

const toggleNowPlaying = () => {
  return create<NowPlayingStore>((set) => ({
    isShow: false,
    onShow: () => set({ isShow: true }),
    onHide: () => set({ isShow: false }),
  }));
};
const toggleLyrics = () => {
  return create<NowPlayingStore>((set) => ({
    isShow: false,
    onShow: () => set({ isShow: true }),
    onHide: () => set({ isShow: false }),
  }));
};
const useNowPlaying = toggleNowPlaying();
const useLyrics = toggleLyrics();
export { useNowPlaying, useLyrics };
