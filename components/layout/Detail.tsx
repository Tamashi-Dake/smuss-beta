"use client";

import React, { useEffect, useState } from "react";
import Box from "../shared/Box";
import { Artist, Record, Song } from "@/types";
import { useRouter } from "next/navigation";
import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";
import Link from "next/link";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import {
  MoreHorizontal,
  PlusSquare,
  Share2Icon,
  UserPlus,
  X,
} from "lucide-react";
import useNowPlaying from "@/hooks/usePlaying";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "../ui/context-menu";
import { ContextMenuTrigger } from "@radix-ui/react-context-menu";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useAuthModal } from "@/hooks/useModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface NowPlayingProps {
  song: Song;
  // songList: string[];
  artists: Artist[];
}

const NowPlaying: React.FC<NowPlayingProps> = ({
  song,
  // songList,
  artists,
}) => {
  const router = useRouter();
  const imagePath = useLoadImage(song);
  const [artistImage, setArtistImage] = useState<string[]>([]);
  const supabaseClient = useSupabaseClient();
  const { onHide } = useNowPlaying();
  const { user } = useUser();
  const authModal = useAuthModal();
  const { supabaseClient: sesionContext } = useSessionContext();
  const [isLiked, setIsLiked] = useState<boolean>(false);
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
      hidden
      md:block
      fixed 
      top-0
      right-0
      w-[350px]
      py-2 
      h-[calc(100%-100px)]
      px-4
      bg-black 
        text-white
        z-[1001]
        overflow-y-auto
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
                  <DropdownMenuContent
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="bg-neutral-800 rounded-md shadow-lg p-2 text-neutral-100/90 w-48 z-[1002]"
                  >
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <PlusSquare className="w-4 h-4 mr-2" />
                        Add to Playlist
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent className="bg-neutral-800/90 rounded-md shadow-lg p-2 text-neutral-100/90 w-48 z-[1002]">
                          {playlists.map((playlist) => (
                            <DropdownMenuItem
                              key={playlist.id}
                              onClick={() => handleAddToPlaylist(playlist.id)}
                            >
                              {relationship.some(
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
                    <DropdownMenuItem onClick={handleShare}>
                      {" "}
                      <Share2Icon className="w-4 h-4 mr-2" />
                      Share
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </Box>
        </ContextMenuTrigger>
        <ContextMenuContent
          onContextMenu={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="bg-neutral-800 rounded-md shadow-lg p-2 text-neutral-100/90 w-48 z-[1002]"
        >
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
                  {relationship.some(
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

          <ContextMenuItem onClick={handleShare}>
            <Share2Icon className="w-4 h-4 mr-2" />
            Share
          </ContextMenuItem>
        </ContextMenuContent>
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
      {/* lyric box */}
      <Box classname="mt-4 p-2">
        <h3 className="text-lg font-bold">Lyrics</h3>
        <p className="text-sm text-neutral-200 whitespace-pre-line">
          {song.lyric || "No lyrics available"}
        </p>
      </Box>
    </div>
  );
};

export default NowPlaying;
