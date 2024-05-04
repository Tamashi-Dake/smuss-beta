import SongsWrapper from "@/components/home/SongsWrapper";
import SectionList from "@/components/home/SectionList";
import getRandomPublicPlaylists from "@/acitons/getRandomPublicPlaylists";
import getRandomSongs from "@/acitons/getRandomSongs";
import PlaylistWrapper from "@/components/home/PlaylistWrapper";
import getSongInPlaylist from "@/acitons/getSongInPlaylist";
import getNewHits from "@/acitons/getNewHit";
import NewHits from "@/components/home/NewHits";
import getAlbums from "@/acitons/getAlbum";
import ArtistsWrapper from "@/components/home/ArtistWapper";
import getHistory from "@/acitons/getHistory";
import Footer from "@/components/layout/Footer";
import getTopArtists from "@/acitons/getTopArtists";

// export const revalidate = 0;

export default async function Home() {
  const newHits = await getNewHits();
  const recentlyPlayed = await getHistory();
  const playlists = await getRandomPublicPlaylists();
  const topArtists = await getTopArtists();
  const album = await getAlbums();
  const randomSongs = await getRandomSongs();
  const relatedSong = await getSongInPlaylist();

  // topArtists: {id,total_views, artist: {...}}
  const artistsData = topArtists.map((artist) => artist.artist);
  const sixRecentlyPlayed = recentlyPlayed.slice(0, 6);

  // console.log(album);
  return (
    <>
      <div
        className=" flex flex-col m-auto gap-y-10 p-4 text-white max-w-[1500px]
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
          <SongsWrapper songs={sixRecentlyPlayed} />
        </SectionList>
        <SectionList>
          <h1 className="text-2xl font-bold ">New Albums</h1>
          <PlaylistWrapper data={album} related={relatedSong} />
          {/* animation section */}
        </SectionList>
        <SectionList>
          <h1 className="text-2xl font-bold ">Top Artists</h1>
          <ArtistsWrapper artists={artistsData} />
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
      <Footer />
    </>
  );
}