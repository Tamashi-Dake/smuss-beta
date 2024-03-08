"use client";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { Heart, HeartCrack, PlusSquare, Share2Icon } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { useAuthModal } from "@/hooks/useModal";
import toast from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

interface SongProps {
  songData: Song;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongProps> = ({ songData, onClick }) => {
  const router = useRouter();
  const image = useLoadImage(songData);
  // const { onShow } = useSongContextMenu();
  const authModal = useAuthModal();
  const { user } = useUser();
  const { supabaseClient } = useSessionContext();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [relationship, setRelationship] = useState<any[]>([]);
  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const fetchFavData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songData.id)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };
    const fetchPlaylistData = async () => {
      const { data, error } = await supabaseClient
        .from("playlist")
        .select("id,name")
        .eq("user_id", user.id)
        .order("name", { ascending: true });

      if (!error && data) {
        setPlaylists(data);
      }
    };
    const fetchRelationshipData = async () => {
      const { data, error } = await supabaseClient
        .from("rel_song_playlist")
        .select("playlist_id,playlist!inner(id,name)")
        .eq("song_id", songData.id);

      if (!error && data) {
        setRelationship(data);
      }
    };
    fetchFavData();
    fetchPlaylistData();
    fetchRelationshipData();
  }, [songData.id, supabaseClient, user?.id]);

  const handleClick = () => {
    router.push(`/song/${songData.id}`);
  };
  const handleLike = async (event: any) => {
    event.stopPropagation();
    if (!user) {
      return authModal.onOpen();
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songData.id);

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabaseClient.from("liked_songs").insert({
        song_id: songData.id,
        user_id: user.id,
      });

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
      }
    }
  };
  const handleAddToPlaylist = async (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }
    if (relationship.some((rel) => rel.playlist_id === id)) {
      const { error } = await supabaseClient
        .from("rel_song_playlist")
        .delete()
        .eq("playlist_id", id)
        .eq("song_id", songData.id);
      if (error) {
        toast.error(error.message);
      } else {
        setRelationship(relationship.filter((rel) => rel.playlist_id !== id));
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
      `https://smuss-beta.vercel.app/song/${songData.id}`
    );
    toast.success("Copied to clipboard!");
  };

  // const handleContextMenu = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   // window.onscroll = () => {};
  //   const { clientX, clientY } = e;
  //   // console.log(clientX, clientY);
  //   onShow(data.id, clientX, clientY);
  // };

  return (
    <ContextMenu>
      <ContextMenuTrigger
        onClick={handleClick}
        // onContextMenu={(e) => handleContextMenu(e)}
        className="relative group flex items-center gap-x-4 bg-neutral-100/10 transition-all pr-4 rounded-md cursor-pointer hover:bg-neutral-100/20 min-h-16"
      >
        {/* TODO: Add shadow */}
        <div className="relative min-h-[64px] min-w-[64px] ">
          <Image
            className="object-cover size-16 rounded-md overflow-hidden"
            src={image || "/liked.png"}
            alt={songData.title}
            width={200}
            height={200}
          />
        </div>

        <h1 className="text-white text-xl truncate font-medium">
          {songData.title}
        </h1>
        <div
          className="absolute transition-all opacity-0 rounded-full flex items-center justify-center bg-green-500 p-3 drop-shadow-md group-hover:opacity-100 hover:scale-110 right-5 "
          onClick={(e) => {
            e.stopPropagation();
            onClick(songData.id);
          }}
        >
          <FaPlay className="text-black" />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="bg-neutral-800/90 rounded-md shadow-lg p-2 text-neutral-100/90 w-48"
      >
        <ContextMenuItem onClick={handleLike}>
          {!isLiked ? (
            <>
              <Heart className="w-4 h-4 mr-2" />
              <p>Add to Favorite</p>
            </>
          ) : (
            <>
              <HeartCrack className="w-4 h-4 mr-2" />
              <p>Remove from Favorite</p>
            </>
          )}
        </ContextMenuItem>
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

export default SongItem;
