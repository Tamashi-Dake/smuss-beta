import getPlaylistInfo from "@/acitons/getPlaylistInfo";
import getSongByPlaylistID from "@/acitons/getSongsByPlaylistID";
import PlaylistContent from "@/components/patials/PlaylistContent";
import PlaylistInfo from "@/components/patials/PlaylistInfo";
import React from "react";

// set revalidate to 0 can enable refresh data (when user add song in playlist) but also cause authentication error when pressing back button
// export const revalidate = 0;

const PlaylistPage = async ({ params }: { params: { id: string } }) => {
  const response = await getSongByPlaylistID(params.id);
  const playlist = await getPlaylistInfo(params.id);
  const songs = response.map((item) => item.songs);
  const totalTime = songs.map((song) => song.time);
  return (
    <>
      <div className=" flex flex-col m-auto gap-y-10 max-w-wide-screen px-4 text-white">
        <div className="bg w-full flex justify-center md:justify-normal items-end h-fit md:min-h-60 bg-gradient-to-b from-purple-900/80 via-yellow-800/30 to-[#171717] md:mb-4">
          <PlaylistInfo
            playlist={playlist}
            totalTime={totalTime}
            songs={songs}
          />
        </div>
        <PlaylistContent songs={songs} />
      </div>
    </>
  );
};

export default PlaylistPage;
