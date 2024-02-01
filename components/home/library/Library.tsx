import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useCreateModal from "@/hooks/useCreateModal";
import { Playlist } from "@/types";
import UserPlaylist from "@/components/shared/UserPlaylist";

// interface Playlist {
//   id: number;
//   name: string;
// }

interface LibraryProps {
  playlists: Playlist[];
}

const Library: React.FC<LibraryProps> = ({ playlists }) => {
  const authModal = useAuthModal();
  const createModal = useCreateModal();
  const { user } = useUser();
  const handleLibraryClick = () => {
    console.log("Library clicked");
  };
  const handlePlaylistClick = () =>
    // playlist: Playlist
    {
      // Handle playlist click
    };
  const handleAddPlaylist = () => {
    if (!user) {
      return authModal.onOpen();
    }
    return createModal.onOpen();
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div
          className="inline-flex items-center gap-x-4 px-2 text-neutral-400 cursor-pointer hover:text-white transition-all"
          onClick={handleLibraryClick}
        >
          <TbPlaylist size={20} />
          <h3 className="text-md font-semibold">Your Library</h3>
        </div>
        <AiOutlinePlus
          className="cursor-pointer text-neutral-400 hover:text-white transition-all"
          size={20}
          onClick={handleAddPlaylist}
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-4">
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
