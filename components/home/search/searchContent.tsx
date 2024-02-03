"use client";

import PlaylistItem from "@/components/shared/PlaylistItem";
import { Playlist } from "@/types";

// import LikeButton from "@/components/LikeButton";
// import useOnPlay from "@/hooks/useOnPlay";

interface SearchContentProps {
  playlists: Playlist[];
}

const SearchContent: React.FC<SearchContentProps> = ({ playlists }) => {
  //   const onPlay = useOnPlay(playlists);

  if (playlists.length === 0) {
    return (
      <div
        className="
          flex 
          flex-col 
          gap-y-2 
          w-full 
          px-6 
          text-neutral-400
        "
      >
        No playlists found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {playlists.map((playlist: Playlist) => (
        <div key={playlist.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <PlaylistItem
              //   onClick={(id: string) => onPlay(id)}
              data={playlist}
            />
          </div>
          {/* <LikeButton playlistId={playlist.id} /> */}
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
