import getArtistAlbum from "@/acitons/getArtistAlbum";
import getArtistInfo from "@/acitons/getArtistInfo";
import getArtists from "@/acitons/getArtists";
import getRandomPublicPlaylists from "@/acitons/getRandomPublicPlaylists";
import getSongInPlaylist from "@/acitons/getSongInPlaylist";
import getSongByArtistID from "@/acitons/getSongsbyArtistID";
import ArtistsWrapper from "@/components/home/ArtistWapper";
import PlaylistWrapper from "@/components/home/PlaylistWrapper";
import SectionList from "@/components/home/SectionList";
import ArtistInfo from "@/components/layout/ArtistInfo";
import PlaylistContent from "@/components/layout/PlaylistContent";
import Box from "@/components/shared/Box";

const ArtistPage = async ({ params }: { params: { id: string } }) => {
  const artist = await getArtistInfo(params.id);
  const album = await getArtistAlbum(params.id);
  const response = await getSongByArtistID(params.id);
  const songByArtist = response.map((item) => item.songs);
  const relatedSong = await getSongInPlaylist();
  const randomPlaylist = await getRandomPublicPlaylists();
  const artitsts = await getArtists();
  return (
    <>
      <div className=" flex flex-col m-auto gap-y-10 max-w-wide-screen px-4 text-white">
        <ArtistInfo artist={artist} songs={songByArtist} />
        {album.length >= 1 && (
          <SectionList>
            <Box classname="bg-neutral-800 p-2">
              <h1 className="text-2xl font-bold p-2">
                Discography of {artist.name}
              </h1>
              <PlaylistWrapper data={album} related={relatedSong} />
            </Box>
          </SectionList>
        )}
        <SectionList>
          <h1 className="text-2xl font-bold p-2">Featuring {artist.name}</h1>
          <PlaylistWrapper data={randomPlaylist} related={randomPlaylist} />
        </SectionList>
        <SectionList>
          <h1 className="text-2xl font-bold p-2">Fan also like</h1>
          <ArtistsWrapper artists={artitsts} />
        </SectionList>
        <SectionList>
          <h1 className="text-2xl font-bold p-2">Songs by {artist.name}</h1>
          <PlaylistContent songs={songByArtist} />
        </SectionList>
      </div>
    </>
  );
};
export default ArtistPage;
