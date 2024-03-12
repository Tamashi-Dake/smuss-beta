"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Song } from "@/types";
import { useUser } from "@/hooks/useUser";
import SongListItem from "../shared/SongListItem";
import useOnPlay from "@/hooks/useOnPlay";
import Image from "next/image";
import { Music, PenSquare, Timer } from "lucide-react";

interface FavoriteContentProps {
  songs: Song[];
}

const FavoriteContent: React.FC<FavoriteContentProps> = ({ songs }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return (
      <div
        className="
          flex 
          flex-col 
          gap-y-2 
          w-full px-6 
          text-neutral-400
        "
      >
        No Favorite songs.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 w-full p-2">
      <div className="flex items-center gap-x-4 w-full sticky top-[60px] bg-neutral-900 z-[1001]">
        <div className="flex-1">
          <div
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
            <div className="flex w-full gap-4 overflow-hidden">
              <div className="flex gap-x-2">
                <h3 className="text-white">
                  <Music size={16} className="inline" />
                </h3>
                <h4 className="inline">Title</h4>
              </div>
              <div className="w-0 sm:min-w-52 lg:w-80"></div>
              <div className="hidden sm:flex flex-row gap-x-2 m-auto">
                <h3 className="text-white truncate">
                  <Timer size={16} className="inline" />
                </h3>
                <h4 className="inline ">Duration</h4>
              </div>
              <div className="flex gap-x-2 ml-auto px-2 h-full">
                <h3 className="text-white">
                  <PenSquare size={16} className="inline" />
                </h3>
                <h4 className="inline">Action</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {songs.map((song: any) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <SongListItem onClick={(id) => onPlay(id)} songData={song} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoriteContent;
