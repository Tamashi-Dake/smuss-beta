import getPlaylistInfo from "@/acitons/getPlaylistInfo";
import getSongByPlaylistID from "@/acitons/getSongByPlaylistID";
import PlaylistContent from "@/components/layout/PlaylistContent";
import PlaylistInfo from "@/components/layout/PlaylistInfo";
import React from "react";

export const revalidate = 0;

const PlaylistPage = async ({ params }: { params: { id: string } }) => {
  const response = await getSongByPlaylistID(params.id);
  const playlist = await getPlaylistInfo(params.id);
  const songs = response.map((item) => item.songs);
  const totalTime = songs.map((song) => song.time);
  return (
    <>
      <div className=" flex flex-col m-auto gap-y-10 max-w-wide-screen px-4 text-white">
        <div className="bg flex items-end h-80 md:h-60 bg-gradient-to-b from-purple-900/80 via-yellow-800/30 to-[#171717] md:mb-4">
          <div className="w-full">
            <PlaylistInfo
              playlist={playlist}
              totalTime={totalTime}
              songs={songs}
            />
          </div>
        </div>
        <PlaylistContent songs={songs} />
      </div>
    </>
  );
};

export default PlaylistPage;
