"use client";
import { useRouter } from "next/navigation";
import { Song } from "@/types";

import useLoadImage from "@/hooks/useLoadImage";

import Image from "next/image";
import { ContextMenu, ContextMenuTrigger } from "../ui/context-menu";

import { FaPlay } from "react-icons/fa";
import ContextMenuContentSong from "../patials/ContextMenuContentSong";

interface SongProps {
  songData: Song;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongProps> = ({ songData, onClick }) => {
  const router = useRouter();
  const image = useLoadImage(songData);

  const handleClick = () => {
    router.push(`/song/${songData.id}`);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger
        onClick={handleClick}
        className="relative group flex items-center gap-x-4 bg-neutral-100/10 transition-all pr-4 rounded-md cursor-pointer hover:bg-neutral-100/20 min-h-16"
      >
        <div className="relative min-h-[64px] min-w-[64px] ">
          <Image
            className="object-cover size-16 rounded-md overflow-hidden"
            src={image || "/liked.png"}
            alt={songData.title}
            width={200}
            height={200}
          />
        </div>

        <h1 className="text-white text-xl truncate font-bold">
          {songData.title}
        </h1>
        <div
          className="absolute transition-all opacity-100 md:opacity-0 rounded-full flex items-center justify-center bg-green-500 p-3 drop-shadow-md group-hover:opacity-100 hover:scale-110 right-5 "
          onClick={(e) => {
            e.stopPropagation();
            onClick(songData.id);
          }}
        >
          <FaPlay className="text-black" />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContentSong songData={songData} />
    </ContextMenu>
  );
};

export default SongItem;
