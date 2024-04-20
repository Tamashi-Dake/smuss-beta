"use client";

import { useEffect, useState } from "react";
import { ProductWithPrice } from "@/types";

import AuthModal from "@/components/patials/AuthModal";
import AddPlaylistModal from "@/components/patials/AddPlaylistModal";
import AddArtistModal from "@/components/patials/AddArtistModal";
import AddCategoryModal from "@/components/patials/AddCategoryModal";
import AddSongModal from "@/components/patials/AddSongModal";
import UpdateSongModal from "@/components/patials/UpdateSongModal";
import DeleteModal from "@/components/patials/DeleteModal";
import UpdateArtistModal from "@/components/patials/UpdateArtistModal";
import UpdateCategoryModal from "@/components/patials/UpdateCategoryModal";
import UpdatePlaylistModal from "@/components/patials/UpdatePlaylistModal";
import SubscribeModal from "@/components/patials/SubscribeModal";
import AdModal from "@/components/patials/AdModal";
import AddUserModal from "@/components/patials/AddUserModal";

interface ModalProviderProps {
  products: ProductWithPrice[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({ products }) => {
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
      <AddPlaylistModal />
      <AddSongModal />
      <AddUserModal />
      <UpdateArtistModal />
      <UpdateCategoryModal />
      <UpdatePlaylistModal />
      <UpdateSongModal />
      <DeleteModal />
      <AdModal products={products} />
      <SubscribeModal products={products} />
    </>
  );
};

export default ModalProvider;
