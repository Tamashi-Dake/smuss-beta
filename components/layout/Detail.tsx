"use client";

import usePlayer from "@/hooks/usePlayer";
import useLoadSong from "@/hooks/useLoadSong";
import useGetSongById from "@/hooks/useGetSongById";

// import PlayerContent from "./PlayerContent";

const Detail = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSong(song!);

  //   if (!song || !songUrl || !player.activeId) {
  //     return null;
  //   }

  return (
    <div
      className="
        bg-black 
        min-w-[300px]
        max-w-[500px]
        py-2 
        h-full
        px-4
        text-white
        z-[1001]
      "
    >
      wut?
      {/* <PlayerContent key={songUrl} song={song} songUrl={songUrl} /> */}
    </div>
  );
};

export default Detail;
