"use client";

import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";
import { Playlist } from "@/types";
import toast from "react-hot-toast";

interface UserPlaylistProps {
  data: Playlist;
  onClick?: (id: string) => void;
}

const UserPlaylist: React.FC<UserPlaylistProps> = ({ data, onClick }) => {
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    toast.success(`Playlist ${data.name} clicked`);
  };

  return (
    <div
      onClick={handleClick}
      className="
        flex 
        items-center 
        gap-x-3 
        cursor-pointer 
        hover:bg-neutral-600/50 
        w-full 
        p-2 
        rounded-md
      "
    >
      <div
        className="
          relative 
          rounded-md 
          min-h-[48px] 
          min-w-[48px] 
          overflow-hidden
        "
      >
        <Image
          fill
          sizes="48px"
          src={imageUrl || "/images/music-placeholder.png"}
          alt="UserPlaylist"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{data.name}</p>
        <p className="text-neutral-400 text-sm truncate">{data.description}</p>
      </div>
    </div>
  );
};

export default UserPlaylist;
