import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";

import { useAuthModal } from "@/hooks/useModal";
import { useUser } from "@/hooks/useUser";
import { useAddPlaylistModal } from "@/hooks/useModal";
import { Playlist } from "@/types";
import UserPlaylist from "@/components/shared/UserPlaylist";
import Link from "next/link";
import Image from "next/image";
import getFavorite from "@/acitons/getFavorite";

interface LibraryProps {
  playlists: Playlist[];
}

const Library: React.FC<LibraryProps> = ({ playlists }) => {
  const authModal = useAuthModal();
  const addPlaylistModal = useAddPlaylistModal();
  const { user } = useUser();
  // const favorite = getFavorite();
  // console.log(favorite);
  // const supabase =
  const handlePlaylistClick = () =>
    // playlist: Playlist
    {
      //TODO: Handle playlist click
    };
  const handleAddPlaylist = () => {
    if (!user) {
      return authModal.onOpen();
    }
    return addPlaylistModal.onOpen();
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <Link
          href="/library"
          className="inline-flex items-center gap-x-4 px-2 text-neutral-400 cursor-pointer hover:text-white transition-all"
        >
          <TbPlaylist size={20} />
          <h3 className="text-md font-semibold">Your Library</h3>
        </Link>
        <AiOutlinePlus
          className="cursor-pointer text-neutral-400 hover:text-white transition-all"
          size={20}
          onClick={handleAddPlaylist}
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-4">
        {user && (
          <Link
            href="/favorites"
            className="flex items-center gap-x-3 cursor-pointer  hover:bg-neutral-600/50 w-full p-2 rounded-md"
          >
            <div
              className="
          relative 
          rounded-md 
          min-h-[48px] 
          min-w-[48px] 
          overflow-hidden
        "
            >
              <Image
                fill
                sizes="48px"
                src={"/liked.png"}
                alt="UserFavoritePlaylist"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
              <p className="text-white truncate">Favorite</p>
              {/* <p className="text-neutral-400 text-sm truncate"></p> */}
            </div>
          </Link>
        )}
        {playlists.map((playlist) => (
          <div key={playlist.id}>
            <UserPlaylist data={playlist} onClick={handlePlaylistClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
