"use client";
import useLoadImage from "@/hooks/useLoadImage";
import { Artist } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface ArtistItemProps {
  data: Artist;
}

const ArtistItem: React.FC<ArtistItemProps> = ({ data }) => {
  const router = useRouter();
  const imageUrl = useLoadImage(data);
  return (
    <div
      onClick={
        () => router.push(`/artist/${data.id}`)
        // console.log(data.id)
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
      bg-neutral-500/5
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
          className="object-cover  w-full h-full rounded-full overflow-hidden"
          src={
            imageUrl && imageUrl.endsWith("null")
              ? "/liked.png"
              : imageUrl || "/liked.png"
          }
          width={200}
          height={200}
          alt="Image"
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
      ></div>
    </div>
  );
};

export default ArtistItem;
