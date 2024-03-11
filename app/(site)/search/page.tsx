import getSearchResult from "@/acitons/getSearchQuery";
import getSongInPlaylist from "@/acitons/getSongInPlaylist";
import SearchContent from "@/components/home/search/searchContent";
import SearchInput from "@/components/home/search/searchInput";
import React from "react";

interface SearchProps {
  searchParams: { query: string };
}

const Search = async ({ searchParams }: SearchProps) => {
  const { songs, playlists, artists, categories } = await getSearchResult(
    searchParams.query
  );
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
