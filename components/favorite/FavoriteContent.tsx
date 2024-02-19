"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Song } from "@/types";
import { useUser } from "@/hooks/useUser";
// import useOnPlay from "@/hooks/useOnPlay";
import SongListItem from "../shared/SongListItem";

interface FavoriteContentProps {
  songs: Song[];
}

const FavoriteContent: React.FC<FavoriteContentProps> = ({ songs }) => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  //   const onPlay = useOnPlay(songs);

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
    <div className="flex flex-col gap-y-2 w-full p-6">
      {songs.map((song: any) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <SongListItem
              // onClick={(id) => onPlay(id)}
              data={song}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoriteContent;
