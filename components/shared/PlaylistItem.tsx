"use client";
import useLoadImage from "@/hooks/useLoadImage";
import { Playlist } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import PlayButton from "./PlayButton";

interface PlaylistProps {
  data: Playlist;
}

const PlaylistItem: React.FC<PlaylistProps> = ({ data }) => {
  const router = useRouter();
  const imagePath = useLoadImage(data);
  return (
    <div
      onClick={() =>
        // router.push(`/playlist/${data.id}`)
        console.log(data.id)
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
      cursor-pointer 
      hover:bg-neutral-400/10 
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
        <PlayButton />
      </div>
    </div>
  );
};

export default PlaylistItem;
