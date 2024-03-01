"use client";
import useLoadImage from "@/hooks/useLoadImage";
import { Playlist } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";

interface PlaylistProps {
  data: Playlist;
  onClick: (id: string) => void;
}

const PlaylistItem: React.FC<PlaylistProps> = ({ data, onClick }) => {
  const router = useRouter();
  const imagePath = useLoadImage(data);
  const handlePlaylist = (event: any) => {
    event.stopPropagation();
    onClick(data.id);
  };
  return (
    <div
      onClick={
        () => {}
        // router.push(`/playlist/${data.id}`)
        // console.log(data.id)
        // router.push(`/playlist/${data.id}`)
      }
      className=" relative 
      group 
      flex 
      flex-col 
      items-center 
      justify-center 
      rounded-md 
      overflow-hidden 
      gap-x-4 
      bg-neutral-400/5 
      text-white
      hover:bg-neutral-400/10 
      cursor-pointer 
      transition 
      p-3
      max-w-52
      select-none
      "
    >
      <div
        className="
          relative 
          aspect-square 
          w-full
          h-full 
          rounded-md 
          overflow-hidden
        "
      >
        <Image
          draggable={false}
          className="object-cover  w-full h-full rounded-md overflow-hidden"
          src={imagePath || "/liked.png"}
          width={200}
          height={200}
          alt="Image"
          priority={true}
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{data.name}</p>
        <p
          className="
            text-neutral-400 
            text-sm 
            pb-4 
            w-full 
            truncate
          "
        >
          {data.description}
        </p>
      </div>
      <div
        className="
          absolute 
          bottom-24 
          right-5
        "
      >
        <button
          className="
    transition-all
    duration-400
    ease-in-out
    translate-y-2
    opacity-0
    p-4
    bg-green-500
    rounded-full
    hover:scale-110
    hover:bg-green-400
    group-hover:-translate-y-1 
    group-hover:opacity-100
    peer
    "
        >
          <FaPlay className="text-black" onClick={handlePlaylist} />
        </button>
      </div>
    </div>
  );
};

export default PlaylistItem;
