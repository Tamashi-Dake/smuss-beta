"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/patials/AuthModal";
import AddPlaylistModal from "@/components/patials/AddPlaylistModal";
import AddArtistModal from "@/components/patials/AddArtistModal";
import AddCategoryModal from "@/components/patials/AddCategoryModal";
import { Play } from "next/font/google";
import Song from "@/components/shared/Song";
import AddSongModal from "@/components/patials/AddSongModal";
import { Artist, Category, Playlist, Song as SongType } from "@/types";
import UpdateSongModal from "@/components/patials/UpdateSongModal";
import DeleteModal from "@/components/patials/DeleteModal";
import UpdateArtistModal from "@/components/patials/UpdateArtistModal";
import UpdateCategoryModal from "@/components/patials/UpdateCategoryModal";
// import SubscribeModal from "@/components/SubscribeModal";
// import { ProductWithPrice } from "@/types_stripe";

interface ModalProviderProps {
  artists: Artist[];
  categories: Category[];
  playlists: Playlist[];
  songs: SongType[];
  relationshipSongArtist: any[];
  relationshipSongCategory: any[];
  relationshipSongPlaylist: any[];
  //   products: ProductWithPrice[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({
  artists,
  categories,
  playlists,
  songs,
  relationshipSongArtist,
  relationshipSongPlaylist,
  relationshipSongCategory,
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
      <AddArtistModal />
      <AddCategoryModal />
      <AddPlaylistModal artists={artists} songs={songs} />
      {/* <SubscribeModal products={products} /> */}
      <AddSongModal
        categories={categories}
        artists={artists}
        playlists={playlists}
      />
      <UpdateArtistModal />
      <UpdateCategoryModal />
      {/* 
      <UpdatePlaylistModal  />
       */}
      <UpdateSongModal
        categories={categories}
        artists={artists}
        playlists={playlists}
        songs={songs}
        relationshipSongArtist={relationshipSongArtist}
        relationshipSongCategory={relationshipSongCategory}
        relationshipSongPlaylist={relationshipSongPlaylist}
      />
      <DeleteModal />
    </>
  );
};

export default ModalProvider;
