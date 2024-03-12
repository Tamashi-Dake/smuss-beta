"use client";

import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";
import { Playlist } from "@/types";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";
import { ContextMenu } from "@radix-ui/react-context-menu";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useDeleteModal, useUpdatePlaylistModal } from "@/hooks/useModal";

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
  const updateModal = useUpdatePlaylistModal();
  const deleteModal = useDeleteModal();
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
      <ContextMenuContent
        onContextMenu={(e) => {
          e.preventDefault();
        }}
        className="bg-neutral-800/90 rounded-md shadow-lg p-2 text-neutral-100/90 w-48 z-[1002]"
      >
        <ContextMenuItem onClick={() => updateModal.onOpen(playlistData.id)}>
          <Edit className="w-4 h-4 mr-2" />
          Update Playlist
        </ContextMenuItem>
        <ContextMenuItem
          onClick={() => deleteModal.onOpen(playlistData.id, "playlist")}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Playlist
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default UserPlaylist;
