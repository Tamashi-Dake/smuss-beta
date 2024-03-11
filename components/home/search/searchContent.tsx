"use client";

import CategoryItem from "@/components/shared/CategoryItem";
import SongListItem from "@/components/shared/SongListItem";
import { Artist, Category, Playlist, Song } from "@/types";
import { useRouter } from "next/navigation";
import PlaylistWrapper from "../PlaylistWrapper";
import ArtistsWrapper from "../ArtistWapper";
import useOnPlay from "@/hooks/useOnPlay";

interface SearchContentProps {
  songs: Song[];
  playlists: Playlist[];
  artists: Artist[];
  categories: Category[];
  relatedSong: any;
}

const SearchContent: React.FC<SearchContentProps> = ({
  songs,
  playlists,
  artists,
  categories,
  relatedSong,
}) => {
  const router = useRouter();
  const onPlay = useOnPlay(songs);
  if (categories?.length > 0) {
    return (
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-3">
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
              onClick={(id: string) => onPlay(id)}
              songData={song}
            />
          </div>
        </div>
      ))}
      {/* TODO: add album */}
      {playlists.length > 0 ? (
        <h3 className="text-2xl font-bold text-neutral-100">Playlists</h3>
      ) : (
        ""
      )}
      <PlaylistWrapper data={playlists} related={relatedSong} />
      {artists.length > 0 ? (
        <h3 className="text-2xl font-bold text-neutral-100">Artists</h3>
      ) : (
        ""
      )}
      <ArtistsWrapper artists={artists} />
    </div>
  );
};

export default SearchContent;
