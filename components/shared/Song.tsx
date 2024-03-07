"use client";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import ContextMenuSong from "../patials/ContextMenuSong";

interface SongProps {
  data: Song;
  onClick: (id: string) => void;
}
const initialContextMenu = {
  x: 0,
  y: 0,
  show: false,
};
const SongItem: React.FC<SongProps> = ({ data, onClick }) => {
  const router = useRouter();
  const image = useLoadImage(data);
  const [contextMenu, setContextMenu] = useState(initialContextMenu);
  const handleClick = () => {
    router.push(`/song/${data.id}`);
  };
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    console.log(clientX, clientY);
    setContextMenu({ x: clientX, y: clientY, show: true });
  };
  const closeContextMenu = (e: any) => {
    e.stopPropagation();
    setContextMenu(initialContextMenu);
  };
  return (
    <div
      onClick={handleClick}
      onContextMenu={(e) => handleContextMenu(e)}
      className="relative group flex items-center gap-x-4 bg-neutral-100/10 transition-all pr-4 rounded-md cursor-pointer hover:bg-neutral-100/20 min-h-16"
    >
      {/* TODO: Add shadow */}
      <div className="relative min-h-[64px] min-w-[64px] ">
        <Image
          className="object-cover size-16 rounded-md overflow-hidden"
          src={image || "/liked.png"}
          alt={data.title}
          width={200}
          height={200}
        />
      </div>

      <h1 className="text-white text-xl truncate font-medium">{data.title}</h1>
      <div
        className="absolute transition-all opacity-0 rounded-full flex items-center justify-center bg-green-500 p-3 drop-shadow-md group-hover:opacity-100 hover:scale-110 right-5 "
        onClick={() => onClick(data.id)}
      >
        <FaPlay className="text-black" />
      </div>
      {contextMenu.show && (
        <ContextMenuSong
          x={contextMenu.x}
          y={contextMenu.y}
          close={closeContextMenu}
        />
      )}
    </div>
  );
};

export default SongItem;
