import getSearchResult from "@/acitons/getSearchQuery";
import getSongInPlaylist from "@/acitons/getSongInPlaylist";
import SearchContent from "@/components/search/searchContent";
import SearchInput from "@/components/search/searchInput";
import React from "react";

interface SearchProps {
  searchParams: { query: string };
}

const Search = async ({ searchParams }: SearchProps) => {
  const { albums, songs, playlists, artists, categories } =
    await getSearchResult(searchParams.query);
  const relatedSong = await getSongInPlaylist();
  return (
    <div
      className="
        bg-neutral-900 
        h-full 
        w-full 
        px-4
        max-w-screen-2xl
        m-auto
      "
    >
      <div className="mb-2 flex flex-col gap-y-6">
        <h1 className="text-white text-3xl font-semibold">Search</h1>
        <SearchInput />
      </div>
      <SearchContent
        albums={albums}
        songs={songs}
        playlists={playlists}
        artists={artists}
        categories={categories}
        relatedSong={relatedSong}
      />
    </div>
  );
};

export default Search;
