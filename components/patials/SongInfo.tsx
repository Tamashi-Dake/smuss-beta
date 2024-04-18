"use client";
import Image from "next/image";
import { Dot, MoreHorizontal, PlusSquare, Share2Icon } from "lucide-react";
import useLoadImage from "@/hooks/useLoadImage";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useAddPlaylistModal, useAuthModal } from "@/hooks/useModal";
import toast from "react-hot-toast";
import { cn } from "@/libs/utils";
import useGetArtistBySongId from "@/hooks/useGetArtistsBySongId";
import PlayButton from "../shared/PlayButton";
import LikeButton from "../shared/LikeButton";
import { useMediaQuery } from "usehooks-ts";
import DropdownMenuContentSong from "./DropdownMenuContentSong";

const SongInfo = ({ song, randomSongs }: { song: any; randomSongs: any[] }) => {
  const songImage = useLoadImage(song);
  const { artist: artists } = useGetArtistBySongId(song.id);
  const { user } = useUser();
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const addPlaylist = useAddPlaylistModal();
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [relPlaylist, setRelPlaylist] = useState<any[]>([]);
  //   merge song id with randomSongs ids (song is the first element, randomSongs is the rest)
  const allSongs = [song.id, ...randomSongs.map((song) => song.id)];
  const isMobile = useMediaQuery("(max-width: 768px)");

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
        .eq("song_id", song.id);

      if (!error && data) {
        setRelPlaylist(data);
      }
    };

    fetchUserPlaylistData();
    fetchPlaylistData();
  }, [song.id, supabaseClient, user?.id]);

  const handleAddToPlaylist = async (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }
    if (relPlaylist.some((rel) => rel.playlist_id === id)) {
      const { error } = await supabaseClient
        .from("rel_song_playlist")
        .delete()
        .eq("playlist_id", id)
        .eq("song_id", song.id);
      if (error) {
        toast.error(error.message);
      } else {
        setRelPlaylist(relPlaylist.filter((rel) => rel.playlist_id !== id));
        toast.success("Removed from playlist!");
      }
    } else {
      const { error } = await supabaseClient.from("rel_song_playlist").insert({
        song_id: song.id,
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
      `https://smuss-beta.vercel.app/song/${song.id}`
    );
    toast.success("Copied to clipboard!");
  };
  return (
    <div
      className="
                    grid
                    grid-cols-1
                    md:grid-cols-[auto,1fr] 
                    place-items-center
                    md:place-content-start
                    items-center 
                    gap-x-5
                    md:p-4
                  "
    >
      <div className="relative h-32 w-32 lg:h-44 lg:w-44">
        <Image
          className="object-cover rounded-sm"
          fill
          src={songImage || "/liked.png"}
          alt="Song image"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 m-2 md:m-0">
        <p className="hidden md:block font-semibold text-sm">Song</p>
        <h1
          className="
                        text-white 
                        text-4xl 
                        lg:text-6xl 
                        font-bold
                      "
        >
          {song.title}
        </h1>
        <div className="flex flex-col">
          <div className="flex items-center gap-y-2 sm:flex-row">
            {artists.length === 0 ? (
              <>
                <p className="text-neutral-400">Unknown Artist</p>
                <Dot size={20} className="hidden md:block text-white" />
              </>
            ) : (
              artists.map((artist, index) => (
                <div key={artist.id}>
                  <Link
                    href={`/artist/${artist.id}`}
                    className="text-neutral-400 hover:underline hover:text-neutral-200 transition select-none md:px-1"
                  >
                    {artist.name}
                  </Link>

                  {isMobile ? (
                    index < artists.length - 1 && ", "
                  ) : (
                    <Dot size={20} className=" hidden md:block text-white" />
                  )}
                </div>
              ))
            )}

            <Dot size={20} className="md:hidden text-white" />

            <p className="text-sm">{song.time}</p>
          </div>
          <div className="relative flex justify-between md:justify-start gap-x-20 items-center">
            {isMobile ? (
              <>
                <LikeButton songId={song.id} refresh={true} />
                <PlayButton songIds={allSongs} />
              </>
            ) : (
              <>
                <PlayButton songIds={allSongs} />
                <LikeButton songId={song.id} refresh={true} />
              </>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreHorizontal
                  className={cn(
                    " transition-all size-10 text-white hover:bg-neutral-600/90 rounded-full cursor-pointer"
                  )}
                />
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
      </div>
    </div>
  );
};

export default SongInfo;
