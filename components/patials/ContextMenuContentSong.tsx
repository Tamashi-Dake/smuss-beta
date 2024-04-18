"use client";
import { Heart, HeartCrack, PlusSquare, Share2Icon } from "lucide-react";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "../ui/context-menu";
import { useAddPlaylistModal, useAuthModal } from "@/hooks/useModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Song } from "@/types";
import toast from "react-hot-toast";

interface ContextMenuContentSongProps {
  songData: Song;
}

const ContextMenuContentSong: React.FC<ContextMenuContentSongProps> = ({
  songData,
}) => {
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const addPlaylist = useAddPlaylistModal();
  const { user } = useUser();

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
        toast.success("Removed from favorite!");
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
        toast.success("Added to favorite!");
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

  return (
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
          <ContextMenuSubTrigger onClick={addPlaylist.onOpen}>
            <PlusSquare className="w-4 h-4 mr-2" />
            Add to Playlist
          </ContextMenuSubTrigger>
          {playlists.length > 0 && (
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
          )}
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
  );
};

export default ContextMenuContentSong;
