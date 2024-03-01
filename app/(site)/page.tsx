import SongsWrapper from "@/components/home/SongsWrapper";
import SectionList from "@/components/home/SectionList";
import getPublicPlaylists from "@/acitons/getPublicPlaylists";
import Wrapper from "@/components/shared/Wrapper";
import PlaylistItem from "@/components/shared/PlaylistItem";
import Link from "next/link";
import getRandomSongs from "@/acitons/getRandomSongs";
import PlaylistWrapper from "@/components/home/PlaylistWrapper";
import getSongInPlaylist from "@/acitons/getSongInPlaylist";

export const revalidate = 0;

export default async function Home() {
  // TODO: get all user playlists (for now, will change to get artists playlists later)
  const randomSongs = await getRandomSongs();
  const playlists = await getPublicPlaylists();
  const relatedSong = await getSongInPlaylist();
  return (
    <>
      <div
        className="mt-8 flex flex-col m-auto gap-y-10 px-4 text-white max-w-[1500px]
        mx-auto"
      >
        <Link className="text-xl font-bold  bg-blue-400" href="/favorites">
          Favorites
        </Link>
        <SectionList>
          <h1 className="text-2xl font-bold ">New Hits</h1>
          {/* animation section */}
        </SectionList>
        <SectionList>
          <h1 className="text-2xl font-bold ">Recently Played</h1>
          {/* <SongsWrapper /> */}
        </SectionList>
        <SectionList>
          <h1 className="text-2xl font-bold ">New Playlists</h1>
          <PlaylistWrapper data={playlists} related={relatedSong} />
          {/* animation section */}
        </SectionList>
        <SectionList>
          <h1 className="text-2xl font-bold ">Your Top Artists</h1>
          {/* <ItemList></ItemList> */}
        </SectionList>
        <SectionList>
          <h1 className="text-2xl font-bold ">Have you tried these?</h1>
          {/* will change to wrapper cpn later */}
          <SongsWrapper songs={randomSongs} />
        </SectionList>
        <SectionList>
          <h1 className="text-2xl font-bold ">Discovery</h1>
          {/* <ItemList></ItemList> */}
        </SectionList>
      </div>
    </>
  );
}
