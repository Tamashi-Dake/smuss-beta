"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/patials/AuthModal";
import CreateModal from "@/components/patials/CreateModal";
import ArtistModal from "@/components/patials/AddArtistModal";
import CategoryModal from "@/components/patials/AddCategoryModal";
import { Play } from "next/font/google";
import Song from "@/components/shared/Song";
import SongModal from "@/components/patials/AddSongModal";
import { Artist, Category, Playlist, Song as SongType } from "@/types";
// import SubscribeModal from "@/components/SubscribeModal";
// import { ProductWithPrice } from "@/types_stripe";

interface ModalProviderProps {
  artists: Artist[];
  categories: Category[];
  playlists: Playlist[];
  songs: SongType[];
  //   products: ProductWithPrice[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({
  artists,
  categories,
  playlists,
  songs,
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
      <ArtistModal />
      <CategoryModal />
      <CreateModal />
      {/* <SubscribeModal products={products} /> */}
      <SongModal categories={categories} artists={artists} />
    </>
  );
};

export default ModalProvider;
