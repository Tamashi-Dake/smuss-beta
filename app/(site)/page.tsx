import SongsWrapper from "@/components/home/SongsWrapper";
import SectionList from "@/components/home/SectionList";
import getRandomPublicPlaylists from "@/acitons/getRandomPublicPlaylists";
import getRandomSongs from "@/acitons/getRandomSongs";
import PlaylistWrapper from "@/components/home/PlaylistWrapper";
import getSongInPlaylist from "@/acitons/getSongInPlaylist";
import getNewHits from "@/acitons/getNewHit";
import NewHits from "@/components/home/NewHits";
import getAlbums from "@/acitons/getAlbum";
import getTopArtists from "@/acitons/getTopArtist";
import ArtistsWrapper from "@/components/home/ArtistWapper";
import getHistory from "@/acitons/getHistory";

// export const revalidate = 0;

export default async function Home() {
  // TODO: get all user playlists (for now, will change to get artists playlists later)
  const newHits = await getNewHits();
  const recentlyPlayed = await getHistory();
  const playlists = await getRandomPublicPlaylists();
  const topArtists = await getTopArtists();
  const album = await getAlbums();
  const randomSongs = await getRandomSongs();
  const relatedSong = await getSongInPlaylist();

  // console.log(album);
  return (
    <>
      <div
        className=" flex flex-col m-auto gap-y-10 px-4 text-white max-w-[1500px]
        mx-auto select-none"
      >
        <SectionList>
          <h1 className="text-2xl font-bold ">New Hits</h1>
          <NewHits songs={newHits} />
        </SectionList>
        <SectionList>
          {recentlyPlayed.length > 0 && (
            <h1 className="text-2xl font-bold ">Recently Played</h1>
          )}
          <SongsWrapper songs={recentlyPlayed} />
        </SectionList>
        <SectionList>
          <h1 className="text-2xl font-bold ">New Albums</h1>
          <PlaylistWrapper data={album} related={relatedSong} />
          {/* animation section */}
        </SectionList>
        <SectionList>
          <h1 className="text-2xl font-bold ">Your Top Artists</h1>
          <ArtistsWrapper artists={topArtists} />
        </SectionList>
        <SectionList>
          <h1 className="text-2xl font-bold ">Have you tried these?</h1>
          {/* will change to wrapper cpn later */}
          <SongsWrapper songs={randomSongs} />
        </SectionList>
        <SectionList>
          <h1 className="text-2xl font-bold ">Discovery</h1>
          <PlaylistWrapper data={playlists} related={relatedSong} />
        </SectionList>
      </div>
    </>
  );
}
