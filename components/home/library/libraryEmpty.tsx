"use client";
import { Button } from "@/components/ui/button";
import { useAddPlaylistModal } from "@/hooks/useModal";

const LibraryEmpty = () => {
  const addPlaylist = useAddPlaylistModal();

  return (
    <div className="text-white flex flex-col justify-center items-center gap-10">
      <h3>You don&apos;t have any playlist yet</h3>
      <Button
        className="bg-green-400 rounded-full hover:bg-green-500"
        onClick={addPlaylist.onOpen}
      >
        Create new Playlist
      </Button>
    </div>
  );
};

export default LibraryEmpty;
