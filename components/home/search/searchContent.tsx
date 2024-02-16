"use client";

import LikeButton from "@/components/shared/LikeButton";
import PlaylistItem from "@/components/shared/PlaylistItem";
import UserPlaylist from "@/components/shared/UserPlaylist";
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
        No results found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full ">
      {playlists.map((playlist: Playlist) => (
        <div key={playlist.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <UserPlaylist
              //   onClick={(id: string) => onPlay(id)}
              data={playlist}
            />
          </div>
          <LikeButton playlistId={playlist.id} />
          {/* <LikeButton playlistId={playlist.id} /> */}
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
