import getRandomSongs from "@/acitons/getRandomSongs";
import getSongInfo from "@/acitons/getSongInfo";
import SongContent from "@/components/layout/SongContent";
import SongInfo from "@/components/layout/SongInfo";

const SongPage = async ({ params }: { params: { id: string } }) => {
  const song = await getSongInfo(params.id);
  const randomSongs = await getRandomSongs();
  return (
    <>
      <div className=" flex flex-col m-auto gap-y-10 max-w-wide-screen px-4 text-white">
        <div className="bg w-full flex justify-center md:justify-normal items-end h-fit md:min-h-60 bg-gradient-to-b from-green-400/80 via-green-700/80 to-[#171717] md:mb-4">
          <SongInfo song={song} randomSongs={randomSongs} />
        </div>
        <SongContent song={song} songList={randomSongs} />
      </div>
    </>
  );
};
export default SongPage;
