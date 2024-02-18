"use client";

import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import toast from "react-hot-toast";
import LikeButton from "./LikeButton";
import { MoreHorizontalIcon, MoreVerticalIcon } from "lucide-react";

interface SongListItemProps {
  data: Song;
  onClick?: (id: string) => void;
}

const SongListItem: React.FC<SongListItemProps> = ({ data, onClick }) => {
  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    toast.success(`Song ${data.title} clicked`);
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
          src={
            imageUrl && imageUrl.endsWith("null")
              ? "/liked.png"
              : imageUrl || "/liked.png"
          }
          alt="SongListItem"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden max-w-28 md:max-w-52 lg:max-w-96">
        <p className="text-white truncate">{data.title}</p>
        <p className="text-neutral-400 text-sm truncate">{data.time}</p>
      </div>
      <div className="flex gap-x-4 ml-auto px-2 h-full">
        <LikeButton songId={data.id} />
        <MoreHorizontalIcon className="w-4 text-neutral-400" />
      </div>
    </div>
  );
};

export default SongListItem;
