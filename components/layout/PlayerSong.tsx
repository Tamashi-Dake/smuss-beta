"use client";
import useLoadImage from "@/hooks/useLoadImage";
import { ArtistRecord, Song } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface PlaylistProps {
  song: Song;
  artists: ArtistRecord[];
}

const PlayerSong: React.FC<PlaylistProps> = ({ song, artists }) => {
  const router = useRouter();
  const imagePath = useLoadImage(song);
  return (
    <div
      onClick={
        () => router.push(`/song/${song.id}`)
        // console.log(song.id)
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
          alt={song.title}
        />
      </div>
      <div
        className="flex flex-col items-start w-full pt-4 gap-y-1 
         md:max-w-40 lg:max-w-52 truncate
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
          {/* map mảng artists với mỗi item là 1 link đến artist đó, liền trên 1 dòng, ngăn cách bằng dấu "," */}

          {artists.length === 0
            ? "Unknown"
            : artists.map((artist, index) => (
                <React.Fragment key={artist.id}>
                  <Link
                    href={`/artist/${artist.id}`}
                    className="text-neutral-400 hover:underline hover:text-neutral-200 transition select-none"
                  >
                    {artist.name}
                  </Link>
                  {index < artists.length - 1 && ", "}
                </React.Fragment>
              ))}
        </p>
      </div>
    </div>
  );
};

export default PlayerSong;
