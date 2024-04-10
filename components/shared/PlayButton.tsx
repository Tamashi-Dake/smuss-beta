"use client";
import { useAuthModal } from "@/hooks/useModal";
import useOnPlay from "@/hooks/useOnPlay";
import usePlayer from "@/hooks/usePlayer";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/libs/utils";
import { FaPlay } from "react-icons/fa";
import { useMediaQuery } from "usehooks-ts";

interface PlayButtonProps {
  songIds: any[];
}

const PlayButton: React.FC<PlayButtonProps> = ({ songIds }) => {
  const { user } = useUser();
  const authModal = useAuthModal();
  const player = usePlayer();
  const isMobile = useMediaQuery("(max-width: 768px)");
  // console.log("songIds", songIds);
  const handleFavPlay = (e: any) => {
    e.stopPropagation();
    if (songIds.length > 0) {
      player.setIds(songIds);
      player.setId(songIds[0]);
    }
  };

  return (
    <div
      className={cn(
        "w-14 transition-all rounded-full flex items-center justify-center bg-green-500 p-5 drop-shadow-md hover:bg-green-400 cursor-pointer"
        // isMobile ? "" : " absolute top-10"
      )}
      onClick={user ? handleFavPlay : authModal.onOpen}
    >
      <FaPlay className="text-black" />
    </div>
  );
};

export default PlayButton;
