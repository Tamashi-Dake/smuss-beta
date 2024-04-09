"use client";
import Image from "next/image";
import Link from "next/link";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { cn } from "@/libs/utils";
import { formatTotalTime } from "@/utils/time";

import useLoadImage from "@/hooks/useLoadImage";
import { useUser } from "@/hooks/useUser";

import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import DropdownMenuContentPlaylist from "../patials/DropdownMenuContentPlaylist";
import PlayButton from "../shared/PlayButton";
import { Dot, MoreHorizontal, Share2 } from "lucide-react";

const PlaylistInfo = ({
  playlist,
  totalTime,
  songs,
}: {
  playlist: any;
  totalTime: any;
  songs: any;
}) => {
  const playlistImage = useLoadImage(playlist);
  const [artist, setArtist] = useState<any>([]);
  const { user } = useUser();
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (playlist.artist_id) {
      const fetchArtist = async () => {
        const { data } = await supabaseClient
          .from("artist")
          .select("*")
          .eq("id", playlist.artist_id)
          .single();
        setArtist(data);
      };
      fetchArtist();
    }
  }, [playlist.artist_id]);
  const handleShare = (event: any) => {
    event.stopPropagation();
    navigator.clipboard.writeText(
      `https://smuss-beta.vercel.app/playlist/${playlist.id}`
    );
    toast.success("Copied to clipboard!");
  };
  return (
    <div
      className="
                    flex 
                    flex-col 
                    justify-center
                    md:justify-start
                    md:flex-row 
                    items-center 
                    gap-x-5
                    md:p-4
                  "
    >
      <div className="relative h-32 w-32 lg:h-44 lg:w-44">
        <Image
          className="object-cover rounded-sm "
          fill
          src={playlistImage || "/liked.png"}
          alt="Playlist image"
        />
      </div>
      <div className="flex flex-col gap-y-2 m-4 md:mt-0">
        <p className="hidden md:block font-semibold text-sm">
          {artist?.name ? "Album" : "Playlist"}
        </p>
        <h1
          className="
                        text-white 
                        text-4xl 
                        lg:text-6xl 
                        font-bold
                        text-center
                        md:text-left
                      "
        >
          {playlist.name}
        </h1>
        <div className="flex flex-col justify-center items-center md:items-start">
          <div className="flex flex-row ">
            {artist?.name ? (
              <>
                <Link
                  className="text-sm hover:text-gray-300 text-white"
                  href={`/artist/${playlist.artist_id}`}
                >
                  {artist.name}
                </Link>
              </>
            ) : (
              <p className="text-sm">Various Artists</p>
            )}

            <Dot size={20} className="block text-white" />

            <p className="text-sm">
              {songs.length} {songs.length > 1 ? "songs" : "song"}
            </p>
            <Dot size={20} className="block text-white" />
            <p className="text-sm ">about {formatTotalTime(totalTime)}</p>
          </div>
          <div className="relative flex justify-start gap-x-20 items-center">
            <PlayButton songIds={songs.map((song: any) => song.id)} />
            {user?.id === playlist.user_id ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreHorizontal
                    className={cn(
                      " transition-all size-10 text-white hover:bg-neutral-600/90 rounded-full cursor-pointer"
                      // isMobile ? "" : "absolute top-10 right-0"
                    )}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContentPlaylist
                  playlistID={playlist.id}
                  handleShare={handleShare}
                />
              </DropdownMenu>
            ) : (
              <div
                className="size-10 rounded-full cursor-pointer hover:bg-neutral-600/90"
                onClick={handleShare}
              >
                <Share2 className="transition-all w-8 h-10 p-1 text-white m-auto" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistInfo;
