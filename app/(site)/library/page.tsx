import React from "react";
import SectionList from "@/components/home/SectionList";
import SongsWrapper from "@/components/home/SongsWrapper";
import PlaylistWrapper from "@/components/home/PlaylistWrapper";
import getSongInPlaylist from "@/acitons/getSongInPlaylist";
import getRandomSongs from "@/acitons/getRandomSongs";
import getTopArtists from "@/acitons/getTopArtist";
import ArtistsWrapper from "@/components/home/ArtistWapper";
import getUserPlaylists from "@/acitons/getUserPlaylists";
export const revalidate = 0;

const LibraryPage: React.FC = async () => {
  const playlists = await getUserPlaylists();
  const relatedSong = await getSongInPlaylist();
  const randomSongs = await getRandomSongs();
  const topArtists = await getTopArtists();
  return (
    <div
      className="
      bg-neutral-900 
      flex flex-col
      h-full gap-y-10
      w-full 
      px-4
      max-w-screen-2xl
      m-auto text-white
    "
    >
      <div className="mb-2 flex flex-col gap-y-6">
        <h1 className=" text-3xl font-semibold">Library</h1>
      </div>
      <SectionList>
        <h1 className="text-2xl font-bold ">Recently Played</h1>
        <SongsWrapper songs={randomSongs} />
      </SectionList>
      <SectionList>
        <h1 className="text-2xl font-bold ">Your Playlists</h1>
        <PlaylistWrapper data={playlists} related={relatedSong} />
      </SectionList>
      <SectionList>
        <h1 className="text-2xl font-bold ">Your Top Artists</h1>
        <ArtistsWrapper artists={topArtists} />
      </SectionList>
    </div>
  );
};

export default LibraryPage;
