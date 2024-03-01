"use client";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface PlaylistProps {
  song: Song;
}

const PlayerSong: React.FC<PlaylistProps> = ({ song }) => {
  const router = useRouter();
  const imagePath = useLoadImage(song);
  return (
    <div
      onClick={() =>
        // router.push(`/song/${song.id}`)
        console.log(song.id)
      }
      className=" 
      flex
      items-center
      justify-start
rounded-md 
overflow-hidden 
gap-x-2
bg-neutral-400/5 
text-white
hover:bg-neutral-400/10 
cursor-pointer 
transition 
select-none
"
    >
      <div
        className="
        min-h-[64px] min-w-[64px]
    rounded-md 
    overflow-hidden
  "
      >
        <Image
          draggable={false}
          className="object-cover size-16 rounded-md overflow-hidden"
          src={imagePath || "/liked.png"}
          width={200}
          height={200}
          objectFit="cover"
          alt={song.title}
          priority={true}
        />
      </div>
      <div
        className="flex flex-col items-start w-full pt-4 gap-y-1 
max-w-[100px] md:max-w-[150px] lg:max-w-[200px]
"
      >
        <p className="font-semibold truncate w-full">{song.title}</p>
        <p
          className="
      text-neutral-400 
      text-sm 
      pb-4 
      w-full 
      truncate
    "
        >
          Song artist
        </p>
      </div>
    </div>
  );
};

export default PlayerSong;
