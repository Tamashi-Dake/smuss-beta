"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";

import { Artist, Song } from "@/types";

import useLoadImage from "@/hooks/useLoadImage";
import { useNowPlaying } from "@/hooks/usePlaying";
import { useUser } from "@/hooks/useUser";
import { useAddPlaylistModal, useAuthModal } from "@/hooks/useModal";

import Box from "../shared/Box";
import { ContextMenu, ContextMenuTrigger } from "../ui/context-menu";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import DropdownMenuContentSong from "../patials/DropdownMenuContentSong";
import ContextMenuContentSongMin from "../patials/ContextMenuContentSongMin";

import { MoreHorizontal, X } from "lucide-react";

interface NowPlayingProps {
  song: Song;
  artists: Artist[];
}

const NowPlaying: React.FC<NowPlayingProps> = ({ song, artists }) => {
  const { supabaseClient: sesionContext } = useSessionContext();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const imagePath = useLoadImage(song);
  const { onHide } = useNowPlaying();
  const { user } = useUser();
  const authModal = useAuthModal();
  const addPlaylist = useAddPlaylistModal();

  const [artistImage, setArtistImage] = useState<string[]>([]);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [relationship, setRelationship] = useState<any[]>([]);

  useEffect(() => {
    if (artists.length > 0) {
      const artistImage = artists.map((artist) => {
        const { data: image } = supabaseClient.storage
          .from("images")
          .getPublicUrl(artist.image_path);
        return image.publicUrl;
      });
      setArtistImage(artistImage);
    }
  }, [artists]);

  useEffect(() => {
    if (!user) return;
    const fetchPlaylistData = async () => {
      const { data, error } = await sesionContext
        .from("playlist")
        .select("id,name")
        .eq("user_id", user.id)
        .order("name", { ascending: true });

      if (!error && data) {
        setPlaylists(data);
      }
    };
    const fetchRelationshipData = async () => {
      const { data, error } = await sesionContext
        .from("rel_song_playlist")
        .select("playlist_id,playlist!inner(id,name)")
        .eq("song_id", song.id);

      if (!error && data) {
        setRelationship(data);
      }
    };
    fetchPlaylistData();
    fetchRelationshipData();
  }, [song.id, sesionContext, user?.id]);

  const handleClick = () => {
    router.push(`/song/${song.id}`);
  };
  const handleAddToPlaylist = async (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }
    if (relationship.some((rel) => rel.playlist_id === id)) {
      const { error } = await sesionContext
        .from("rel_song_playlist")
        .delete()
        .eq("playlist_id", id)
        .eq("song_id", song.id);
      if (error) {
        toast.error(error.message);
      } else {
        setRelationship(relationship.filter((rel) => rel.playlist_id !== id));
        toast.success("Removed from playlist!");
      }
    } else {
      const { error } = await sesionContext.from("rel_song_playlist").insert({
        song_id: song.id,
        playlist_id: id,
      });
      if (error) {
        toast.error(error.message);
      } else {
        setRelationship([
          ...relationship,
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
      w-[350px]
      py-2 
      px-4
      bg-black 
        text-white
        z-[1001]
        overflow-y-auto
        shrink-0
      "
    >
      <ContextMenu>
        <ContextMenuTrigger>
          <Box>
            <div className="flex justify-between p-2">
              <h3 className="text-lg font-bold">Now Playing</h3>
              <button
                onClick={onHide}
                className="text-white hover:text-gray-300"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-2 p-2" onClick={handleClick}>
              <Image
                draggable={false}
                className="object-cover md:h-60 lg:h-72 w-full rounded-md overflow-hidden cursor-pointer transition transform hover:scale-105 duration-300 ease-in-out"
                src={imagePath || "/liked.png"}
                width={500}
                height={500}
                alt={song.title}
              />
              <div className="grid grid-cols-[1fr,auto]">
                <div className="overflow-hidden">
                  <h4 className="text-lg font-bold cursor-pointer">
                    {song.title}
                  </h4>
                  <p className="text-neutral-400 text-sm w-full truncate ">
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
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreHorizontal className="size-10 hover:bg-neutral-600/90 rounded-full p-2" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContentSong
                    user={user}
                    authModal={authModal}
                    addPlaylist={addPlaylist}
                    handleShare={handleShare}
                    handleAddToPlaylist={handleAddToPlaylist}
                    playlists={playlists}
                    relationship={relationship}
                    pathname="/song/[id]"
                    handleDeleteHistory={() => {}}
                  />
                </DropdownMenu>
              </div>
            </div>
          </Box>
        </ContextMenuTrigger>
        <ContextMenuContentSongMin
          user={user}
          authModal={authModal}
          addPlaylist={addPlaylist}
          handleShare={handleShare}
          handleAddToPlaylist={handleAddToPlaylist}
          playlists={playlists}
          relationship={relationship}
          pathname="/song/[id]"
          handleDeleteHistory={() => {}}
        />
      </ContextMenu>

      {/* credit box  */}
      <Box classname="mt-4 p-2">
        <h3 className="text-lg font-bold pb-4">Credits</h3>

        <h3 className="text-lg font-bold">
          {artists.length === 0
            ? "Unknown"
            : artists.map((artist, index) => (
                <React.Fragment key={artist.id}>
                  <Link
                    href={`/artist/${artist.id}`}
                    className="group/credit text-neutral-400 flex justify-start items-center gap-4 hover:underline hover:text-neutral-200 transition select-none p-2"
                  >
                    <Image
                      draggable={false}
                      className="object-cover md:h-10 lg:12 w-10 rounded-full overflow-hidden transition transform group-hover/credit:scale-125 duration-300 ease-in-out"
                      src={artistImage[index] || "/liked.png"}
                      width={300}
                      height={300}
                      alt={artist.name}
                    />
                    {artist.name}
                  </Link>
                </React.Fragment>
              ))}
        </h3>
      </Box>
    </div>
  );
};

export default NowPlaying;
