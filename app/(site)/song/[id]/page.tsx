import getRandomSongs from "@/acitons/getRandomSongs";
import getSongInfo from "@/acitons/getSongInfo";
import SongInfo from "@/components/layout/SongInfo";

const SongPage = async ({ params }: { params: { id: string } }) => {
  const song = await getSongInfo(params.id);
  const randomSongs = await getRandomSongs();
  // const playlist = await getPlaylistInfo(params.id);
  // const response = await getSongByPlaylistID(params.id);
  return (
    <>
      <div className=" flex flex-col m-auto gap-y-10 max-w-wide-screen px-4 text-white">
        <div className="bg flex items-end h-80 md:h-60 bg-gradient-to-b from-purple-900/80 via-yellow-800/30 to-[#171717] md:mb-4">
          <div className="w-full">
            <SongInfo song={song} randomSongs={randomSongs} />
          </div>
        </div>
        {/* <PlaylistContent songs={songs} /> */}
        <pre>{JSON.stringify(song, null, 2)}</pre>
      </div>
    </>
  );
};
export default SongPage;
