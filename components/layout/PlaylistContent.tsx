"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Song } from "@/types";
import { useUser } from "@/hooks/useUser";
import SongListItem from "../shared/SongListItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Eye, Music, PenSquare, Timer } from "lucide-react";

interface PlaylistContentProps {
  songs: Song[];
}

const PlaylistContent: React.FC<PlaylistContentProps> = ({ songs }) => {
  // const router = useRouter();
  // const { isLoading, user } = useUser();
  const onPlay = useOnPlay(songs);

  // useEffect(() => {
  //   if (!isLoading && !user) {
  //     // TODO: Remove this to fix when user is not logged in
  //     // router.replace("/");
  //   }
  // }, [isLoading, user, router]);

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
        <h1 className="text-3xl font-bold">No songs found</h1>
        <p>You should add some songs to this playlist! 👍</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 w-full p-2">
      <div className="flex items-center gap-x-4 w-full sticky top-[60px] bg-neutral-900 z-[1001]">
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
          <div className="grid grid-cols-[auto,1fr,1fr] sm:grid-cols-[auto,1fr,1fr,1fr] md:grid-cols-[auto,1fr,1fr,1fr,1fr] w-full gap-2 overflow-hidden ">
            <div className="p-2 my-auto w-[48px]">
              <h3 className="">
                <Music size={16} />
              </h3>
            </div>
            <h4 className="inline">Title</h4>
            <div className="hidden sm:flex flex-row gap-x-2 m-auto items-center">
              <h3 className="">
                <Timer size={16} className="" />
              </h3>
              <h4 className=" hidden lg:inline">Duration</h4>
            </div>
            <div className="hidden md:flex flex-row gap-x-2 m-auto items-center">
              <h3 className="">
                <Eye size={16} className="" />
              </h3>
              <h4 className=" hidden lg:inline">View</h4>
            </div>
            <div className="flex gap-x-2 ml-auto px-2 h-full items-center">
              <h3 className="">
                <PenSquare size={16} className="" />
              </h3>
              <h4 className="inline">Action</h4>
            </div>
          </div>
        </div>
      </div>

      {songs.map((song: any) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <SongListItem onClick={(id) => onPlay(id)} songData={song} />
        </div>
      ))}
    </div>
  );
};

export default PlaylistContent;
