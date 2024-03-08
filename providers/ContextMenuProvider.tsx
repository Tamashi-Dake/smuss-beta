"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/patials/AuthModal";
import { Playlist, Song as SongType } from "@/types";
import DeleteModal from "@/components/patials/DeleteModal";
import ContextMenuSong from "@/components/patials/ContextMenuSong";
// import SubscribeModal from "@/components/SubscribeModal";
// import { ProductWithPrice } from "@/types_stripe";

interface ContextMenuProviderProps {
  playlists: Playlist[];
  songs: SongType[];
  relationshipSongPlaylist: any[];
  //   products: ProductWithPrice[];
}

const ContextMenuProvider: React.FC<ContextMenuProviderProps> = ({
  playlists,
  songs,
  relationshipSongPlaylist,
  //   products
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <ContextMenuSong />
      <DeleteModal />
    </>
  );
};

export default ContextMenuProvider;
