"use client";

import ArtistItem from "@/components/shared/ArtistItem";
import CategoryItem from "@/components/shared/CategoryItem";
import PlaylistItem from "@/components/shared/PlaylistItem";
import SongListItem from "@/components/shared/SongListItem";
import Wrapper from "@/components/shared/Wrapper";
import { Artist, Category, Playlist, Song } from "@/types";
import { useRouter } from "next/navigation";

// import LikeButton from "@/components/LikeButton";
// import useOnPlay from "@/hooks/useOnPlay";

interface SearchContentProps {
  songs: Song[];
  playlists: Playlist[];
  artists: Artist[];
  categories: Category[];
}

const SearchContent: React.FC<SearchContentProps> = ({
  songs,
  playlists,
  artists,
  categories,
}) => {
  const router = useRouter();
  //   const onPlay = useOnPlay(playlists);
  if (categories?.length > 0) {
    return (
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category: Category) => (
          <CategoryItem
            key={category.id}
            //   onClick={(id: string) => onPlay(id)}
            data={category}
          />
        ))}
      </div>
    );
  }
  if (playlists.length === 0 && songs.length === 0 && artists.length === 0) {
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
  const handlePlaylist = (playlistId: string) => {
    router.push(`/playlist/${playlistId}`);
  };

  return (
    <div className="flex flex-col gap-y-2 w-full ">
      {songs.length > 0 ? (
        <h3 className="text-2xl font-bold text-neutral-100">Songs</h3>
      ) : (
        ""
      )}
      {songs.map((song: Song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <SongListItem
              // onClick={(id: string) => onPlay(id)}
              data={song}
            />
          </div>
        </div>
      ))}
      {playlists.length > 0 ? (
        <h3 className="text-2xl font-bold text-neutral-100">Playlists</h3>
      ) : (
        ""
      )}
      <Wrapper>
        {playlists.map((playlist: Playlist) => (
          <PlaylistItem
            key={playlist.id}
            onClick={() => handlePlaylist(playlist.id)}
            data={playlist}
          />
        ))}
      </Wrapper>
      {artists.length > 0 ? (
        <h3 className="text-2xl font-bold text-neutral-100">Artists</h3>
      ) : (
        ""
      )}
      <Wrapper>
        {artists.map((artist: Artist) => (
          <ArtistItem key={artist.id} data={artist} />
        ))}
      </Wrapper>
    </div>
  );
};

export default SearchContent;
