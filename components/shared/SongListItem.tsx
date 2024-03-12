"use client";

import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import toast from "react-hot-toast";
import LikeButton from "./LikeButton";
import {
  MoreHorizontal,
  MoreHorizontalIcon,
  MoreVerticalIcon,
  PlusSquare,
  Share2Icon,
} from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { useRouter } from "next/navigation";
import { useAuthModal } from "@/hooks/useModal";
import { useUser } from "@/hooks/useUser";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useGetArtistBySongId from "@/hooks/useGetArtistsBySongId";
import Link from "next/link";

interface SongListItemProps {
  songData: Song;
  onClick: (id: string) => void;
}

const SongListItem: React.FC<SongListItemProps> = ({ songData, onClick }) => {
  const router = useRouter();
  const imageUrl = useLoadImage(songData);
  const authModal = useAuthModal();
  const { user } = useUser();
  const supabase = useSupabaseClient();
  const { supabaseClient } = useSessionContext();
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [relPlaylist, setRelPlaylist] = useState<any[]>([]);
  const { artist: artists } = useGetArtistBySongId(songData.id);
  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const fetchUserPlaylistData = async () => {
      const { data, error } = await supabaseClient
        .from("playlist")
        .select("id,name")
        .eq("user_id", user.id)
        .order("name", { ascending: true });

      if (!error && data) {
        setPlaylists(data);
      }
    };
    const fetchPlaylistData = async () => {
      const { data, error } = await supabaseClient
        .from("rel_song_playlist")
        .select("playlist_id,playlist!inner(id,name)")
        .eq("song_id", songData.id);

      if (!error && data) {
        setRelPlaylist(data);
      }
    };

    fetchUserPlaylistData();
    fetchPlaylistData();
  }, [songData.id, supabaseClient, user?.id]);

  const handleClick = () => {
    router.push(`/song/${songData.id}`);
  };
  const handleAddToPlaylist = async (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }
    if (relPlaylist.some((rel) => rel.playlist_id === id)) {
      const { error } = await supabaseClient
        .from("rel_song_playlist")
        .delete()
        .eq("playlist_id", id)
        .eq("song_id", songData.id);
      if (error) {
        toast.error(error.message);
      } else {
        setRelPlaylist(relPlaylist.filter((rel) => rel.playlist_id !== id));
        toast.success("Removed from playlist!");
      }
    } else {
      const { error } = await supabaseClient.from("rel_song_playlist").insert({
        song_id: songData.id,
        playlist_id: id,
      });
      if (error) {
        toast.error(error.message);
      } else {
        setRelPlaylist([
          ...relPlaylist,
          {
            playlist_id: id,
            playlist: {
              id,
              name: playlists.find((playlist) => playlist.id === id)?.name,
            },
          },
        ]);
      }
      toast.success("Added to playlist!");
    }
  };
  const handleShare = (event: any) => {
    event.stopPropagation();
    navigator.clipboard.writeText(
      `https://smuss-beta.vercel.app/song/${songData.id}`
    );
    toast.success("Copied to clipboard!");
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
        <div className="flex w-full gap-4 overflow-hidden">
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
              alt="SongListItem"
              className="object-cover"
            />
            <div
              className="
          absolute group top-0 left-0 w-full h-full bg-black bg-opacity-0 flex justify-center items-center transition-all ease-in-out duration-200 hover:bg-opacity-50
          "
              onClick={(e) => {
                e.stopPropagation();
                onClick(songData.id);
              }}
            >
              <FaPlay className=" text-white text-2xl opacity-0 group-hover:opacity-100" />
            </div>
          </div>
          <div className="flex flex-col gap-y-1 overflow-hidden w-28 sm:min-w-52  lg:w-80">
            <p className="text-white truncate">{songData.title}</p>
            <p className="text-neutral-400 text-sm truncate">
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
          <div className="hidden sm:flex flex-col gap-y-1 m-auto">
            <p className="text-white truncate">{songData.time}</p>
          </div>
          <div className="flex gap-x-4 ml-auto px-2 h-full">
            <LikeButton songId={songData.id} refresh={true} />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreHorizontal className="size-10 text-white hover:bg-neutral-600/90 rounded-full p-2" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="bg-neutral-800 rounded-md shadow-lg p-2 text-neutral-100/90 w-48 "
              >
                {user ? (
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <PlusSquare className="w-4 h-4 mr-2" />
                      Add to Playlist
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="bg-neutral-800/90 rounded-md shadow-lg p-2 text-neutral-100/90 w-48 ">
                        {playlists.map((playlist) => (
                          <DropdownMenuItem
                            key={playlist.id}
                            onClick={() => handleAddToPlaylist(playlist.id)}
                          >
                            {relPlaylist.some(
                              (rel) => rel.playlist_id === playlist.id
                            ) ? (
                              <span className="w-2 mr-2">✓</span>
                            ) : (
                              <span className="w-2 mr-2"> </span>
                            )}
                            <p>{playlist.name}</p>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                ) : (
                  <DropdownMenuItem onClick={authModal.onOpen}>
                    <PlusSquare className="w-4 h-4 mr-2" />
                    Add to Playlist
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleShare}>
                  {" "}
                  <Share2Icon className="w-4 h-4 mr-2" />
                  Share
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="bg-neutral-800/90 rounded-md shadow-lg p-2 text-neutral-100/90 w-48"
      >
        {user ? (
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <PlusSquare className="w-4 h-4 mr-2" />
              Add to Playlist
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="bg-neutral-800/90 rounded-md shadow-lg p-2 text-neutral-100/90 w-48">
              {playlists.map((playlist) => (
                <ContextMenuItem
                  key={playlist.id}
                  onClick={() => handleAddToPlaylist(playlist.id)}
                >
                  {relPlaylist.some(
                    (rel) => rel.playlist_id === playlist.id
                  ) ? (
                    <span className="w-2 mr-2">✓</span>
                  ) : (
                    <span className="w-2 mr-2"> </span>
                  )}
                  <p>{playlist.name}</p>
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
        ) : (
          <ContextMenuItem onClick={authModal.onOpen}>
            <PlusSquare className="w-4 h-4 mr-2" />
            Add to Playlist
          </ContextMenuItem>
        )}
        <ContextMenuItem onClick={handleShare}>
          <Share2Icon className="w-4 h-4 mr-2" />
          Share
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default SongListItem;
