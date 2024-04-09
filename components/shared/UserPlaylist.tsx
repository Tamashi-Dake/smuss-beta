"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

import { Playlist } from "@/types";

import useLoadImage from "@/hooks/useLoadImage";
import { useUser } from "@/hooks/useUser";

import { ContextMenu, ContextMenuTrigger } from "../ui/context-menu";
import { FaPlay } from "react-icons/fa";
import ContextMenuContentPlaylist from "../patials/ContextMenuContentPlaylist";

interface UserPlaylistProps {
  playlistData: Playlist;
  onClick?: (songIDs: any[]) => void;
}

const UserPlaylist: React.FC<UserPlaylistProps> = ({
  playlistData,
  onClick,
}) => {
  const router = useRouter();
  const { user } = useUser();
  const { supabaseClient } = useSessionContext();

  const imageUrl = useLoadImage(playlistData);
  const [songIDs, setSongIDs] = useState<any[]>([]);

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const fetchRelationshipData = async () => {
      const { data, error } = await supabaseClient
        .from("rel_song_playlist")
        .select("song_id")
        .eq("playlist_id", playlistData.id);

      if (!error && data) {
        setSongIDs(data);
      }
    };
    fetchRelationshipData();
  }, [user?.id, supabaseClient, playlistData.id]);

  const handleClick = () => {
    router.push(`/playlist/${playlistData.id}`);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger
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
            alt="UserPlaylist"
            className="object-cover"
          />
          <div
            className="
          absolute group top-0 left-0 w-full h-full bg-black bg-opacity-0 flex justify-center items-center transition-all ease-in-out duration-200 hover:bg-opacity-50
          "
            onClick={(e) => {
              e.stopPropagation();
              if (onClick) {
                onClick(songIDs);
              }
            }}
          >
            <FaPlay className=" text-white text-2xl opacity-0 group-hover:opacity-100" />
          </div>
        </div>
        <div className="flex flex-col gap-y-1 overflow-hidden">
          <p className="text-white truncate">{playlistData.name}</p>
          <p className="text-neutral-400 text-sm truncate">
            {playlistData.description}
          </p>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContentPlaylist playlistID={playlistData.id} />
    </ContextMenu>
  );
};

export default UserPlaylist;
