import getSearchResult from "@/acitons/getSearchQuery";
import SearchContent from "@/components/home/search/searchContent";
import SearchInput from "@/components/home/search/searchInput";
import React from "react";

export const revalidate = 0;

interface SearchProps {
  searchParams: { query: string };
}

const Search = async ({ searchParams }: SearchProps) => {
  const { songs, playlists, artists, categories } = await getSearchResult(
    searchParams.query
  );
  return (
    <div
      className="
        bg-neutral-900 
        rounded-lg 
        h-full 
        w-full 
        px-4

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
      />
    </div>
  );
};

export default Search;
