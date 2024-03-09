import React from "react";
import SectionList from "@/components/home/SectionList";
import SongsWrapper from "@/components/home/SongsWrapper";
import PlaylistWrapper from "@/components/home/PlaylistWrapper";
import getRandomPublicPlaylists from "@/acitons/getRandomPublicPlaylists";
import getSongInPlaylist from "@/acitons/getSongInPlaylist";
export const revalidate = 0;

const LibraryPage: React.FC = async () => {
  const playlists = await getRandomPublicPlaylists();
  const relatedSong = await getSongInPlaylist();
  return (
    <div
      className="
      bg-neutral-900 
      flex flex-col
      h-full 
      w-full 
      px-4
      max-w-screen-2xl
      m-auto
    "
    >
      <div className="mb-2 flex flex-col gap-y-6">
        <h1 className="text-white text-3xl font-semibold">Library</h1>
      </div>
      <SectionList>
        <h1 className="text-2xl font-bold ">Recently Played</h1>
        {/* <SongsWrapper /> */}
      </SectionList>
      <SectionList>
        <PlaylistWrapper data={playlists} related={relatedSong} />
      </SectionList>
      <SectionList>
        <h1 className="text-2xl font-bold ">Your Top Artists</h1>
        {/* <ItemList></ItemList> */}
      </SectionList>
    </div>
  );
};

export default LibraryPage;
