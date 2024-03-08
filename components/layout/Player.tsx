"use client";

import usePlayer from "@/hooks/usePlayer";
import useLoadSong from "@/hooks/useLoadSong";
import useGetSongById from "@/hooks/useGetSongById";
import PlayerContent from "./PlayerContent";
import useGetArtistBySongId from "@/hooks/useGetArtistsBySongId";

// import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);
  const { artist } = useGetArtistBySongId(player.activeId);
  // console.log(artist);
  const songUrl = useLoadSong(song!);

  if (!song || !songUrl || !player.activeId) {
    console.log(song, songUrl, player.activeId);
    return null;
  }

  return (
    <div
      className="
        fixed 
        bottom-0 
        bg-black 
        w-full 
        py-2 
        min-h-[100px] 
        px-4
        text-white
        z-[1001]
      "
    >
      <PlayerContent song={song} songUrl={songUrl} artists={artist} />
    </div>
  );
};

export default Player;
