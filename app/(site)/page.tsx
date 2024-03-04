import SongsWrapper from "@/components/home/SongsWrapper";
import SectionList from "@/components/home/SectionList";
import getPublicPlaylists from "@/acitons/getPublicPlaylists";
import getRandomSongs from "@/acitons/getRandomSongs";
import PlaylistWrapper from "@/components/home/PlaylistWrapper";
import getSongInPlaylist from "@/acitons/getSongInPlaylist";
import getNewHits from "@/acitons/getNewHit";
import NewHits from "@/components/home/NewHits";

// export const revalidate = 0;

export default async function Home() {
  // TODO: get all user playlists (for now, will change to get artists playlists later)
  const randomSongs = await getRandomSongs();
  const playlists = await getPublicPlaylists();
  const relatedSong = await getSongInPlaylist();
  const newHits = await getNewHits();
  return (
    <>
      <div
        className=" flex flex-col m-auto gap-y-10 px-4 text-white max-w-[1500px]
        mx-auto"
      >
        <SectionList>
          <h1 className="text-2xl font-bold ">New Hits</h1>
          <NewHits songs={newHits} />
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
