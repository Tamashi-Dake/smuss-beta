"use client";

import { PlusCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  ModalStore,
  useAddArtistModal,
  useAddCategoryModal,
  useAddSongModal,
  useCreateModal,
} from "@/hooks/useModal";

type AddButtonProps = {
  pathname: string;
};

const AddButton: React.FC<AddButtonProps> = ({ pathname }) => {
  const modals: Record<string, ModalStore> = {
    "/dashboard/artists": useAddArtistModal(),
    "/dashboard/categories": useAddCategoryModal(),
    "/dashboard/playlists": useCreateModal(),
    "/dashboard/songs": useAddSongModal(),
  };

  const itemMapping: Record<string, string> = {
    "/dashboard/artists": "Artist",
    "/dashboard/categories": "Category",
    "/dashboard/playlists": "Playlist",
    "/dashboard/songs": "Song",
    "/dashboard/users": "User",
  };

  const item = itemMapping[pathname];
  const modal = modals[pathname];

  const handleClick = () => {
    if (modal) {
      modal.onOpen();
    } else if (pathname === "/dashboard/users") {
      window.open(
        "https://supabase.com/dashboard/project/bikzxtxhkpzavgevuqmb/auth/users",
        "_blank"
      );
    }
  };

  return (
    <Button
      className="bg-green-500 hover:bg-green-600 ml-auto flex items-center gap-2 px-4 py-2 rounded-md text-white transition-all"
      onClick={handleClick}
    >
      <PlusCircleIcon size={20} />
      Add {item}
    </Button>
  );
};

export default AddButton;
