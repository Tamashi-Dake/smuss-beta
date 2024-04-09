"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";

import { Song } from "@/types";

import useGetArtistBySongId from "@/hooks/useGetArtistsBySongId";
import useLoadImage from "@/hooks/useLoadImage";
import { useAddPlaylistModal, useAuthModal } from "@/hooks/useModal";
import { useUser } from "@/hooks/useUser";

import { ContextMenu, ContextMenuTrigger } from "../ui/context-menu";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import LikeButton from "./LikeButton";
import ContextMenuContentSongMin from "../patials/ContextMenuContentSongMin";
import DropdownMenuContentSong from "../patials/DropdownMenuContentSong";

import { MoreHorizontal } from "lucide-react";
import { FaPlay } from "react-icons/fa";

interface SongListItemProps {
  songData: Song;
  onClick: (id: string) => void;
}

const SongListItem: React.FC<SongListItemProps> = ({ songData, onClick }) => {
  const router = useRouter();
  const imageUrl = useLoadImage(songData);
  const authModal = useAuthModal();
  const addPlaylist = useAddPlaylistModal();
  const { user } = useUser();
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
        gap-x-2 
        cursor-pointer 
        hover:bg-neutral-600/50 
        w-full 
        p-2 
        rounded-md
      "
      >
        <div className="grid grid-cols-[auto,1fr,1fr] sm:grid-cols-[auto,1fr,1fr,1fr] md:grid-cols-[auto,1fr,1fr,1fr,1fr] w-full gap-2 overflow-hidden">
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
          <div className="flex flex-col gap-y-1 overflow-hidden">
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
          <div className="hidden md:flex flex-col gap-y-1 m-auto">
            <p className="text-white truncate">{songData.view}</p>
          </div>
          <div className="flex gap-x-4 ml-auto px-2 h-full">
            <LikeButton songId={songData.id} refresh={true} />
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:border-neutral-600/90">
                <MoreHorizontal className="size-10 text-white hover:bg-neutral-600/90 rounded-full p-2" />
              </DropdownMenuTrigger>
              <DropdownMenuContentSong
                user={user}
                authModal={authModal}
                addPlaylist={addPlaylist}
                handleShare={handleShare}
                handleAddToPlaylist={handleAddToPlaylist}
                playlists={playlists}
                relationship={relPlaylist}
              />
            </DropdownMenu>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContentSongMin
        user={user}
        authModal={authModal}
        addPlaylist={addPlaylist}
        handleShare={handleShare}
        handleAddToPlaylist={handleAddToPlaylist}
        playlists={playlists}
        relationship={relPlaylist}
      />
    </ContextMenu>
  );
};

export default SongListItem;
