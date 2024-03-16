"use client";
import { useEffect, useState } from "react";
import { Playlist } from "@/types";

import { useAuthModal, useSubscribeModal } from "@/hooks/useModal";
import { useUser } from "@/hooks/useUser";
import { useAddPlaylistModal } from "@/hooks/useModal";
import usePlayer from "@/hooks/usePlayer";

import UserPlaylist from "@/components/shared/UserPlaylist";
import Link from "next/link";
import Image from "next/image";

import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import { FaPlay } from "react-icons/fa";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

interface LibraryProps {
  playlists: Playlist[];
}

const Library: React.FC<LibraryProps> = ({ playlists }) => {
  const [songList, setSongList] = useState<any[]>([]);
  const { subscription, user } = useUser();
  const { supabaseClient } = useSessionContext();

  const router = useRouter();
  const player = usePlayer();
  const authModal = useAuthModal();
  const subscribeModal = useSubscribeModal();
  const addPlaylistModal = useAddPlaylistModal();

  // Lấy danh sách bài hát từ hook và cập nhật state songList
  useEffect(() => {
    // get related songs in liked_songs
    const fetchFavData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("song_id")
        .eq("user_id", user?.id);

      if (!error && data) {
        setSongList(data);
      }
    };
    fetchFavData();
  }, [user?.id]);

  const handleFavPlay = (e: any) => {
    e.stopPropagation();
    if (songList.length > 0) {
      player.setIds(songList.map((song: any) => song.song_id));
      player.setId(songList[0].song_id);
    }
  };
  const handlePlaylist = (songIDs: any[]) => {
    if (songIDs.length > 0) {
      player.setIds(songIDs.map((song: any) => song.song_id));
      player.setId(songIDs[0].song_id);
    }
  };
  const handleAddPlaylist = () => {
    if (!user) {
      return authModal.onOpen();
    }
    // if user is not subscribed and number playlist is greater or equal 5
    if (subscription?.status !== "active" && playlists.length >= 5) {
      return subscribeModal.onOpen();
    }
    return addPlaylistModal.onOpen();
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <Link
          href="/library"
          className="inline-flex items-center gap-x-4 px-2 text-neutral-400 cursor-pointer hover:text-white transition-all"
        >
          <TbPlaylist size={20} />
          <h3 className="text-md font-semibold">Your Library</h3>
        </Link>
        <AiOutlinePlus
          className="cursor-pointer text-neutral-400 hover:text-white transition-all"
          size={20}
          onClick={handleAddPlaylist}
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-4">
        {user && (
          <div
            className="flex items-center gap-x-3 cursor-pointer  hover:bg-neutral-600/50 w-full p-2 rounded-md"
            onClick={() => router.push("/favorites")}
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
                src={"/liked.png"}
                alt="UserFavoritePlaylist"
                className="object-cover"
              />
              <div
                className="
          absolute group top-0 left-0 w-full h-full bg-black bg-opacity-0 flex justify-center items-center transition-all ease-in-out duration-200 hover:bg-opacity-50
          "
                onClick={handleFavPlay}
              >
                <FaPlay className=" text-white text-2xl opacity-0 group-hover:opacity-100" />
              </div>
            </div>

            <div className="flex flex-col gap-y-1 overflow-hidden">
              <p className="text-white truncate">Favorite</p>
              {/* <p className="text-neutral-400 text-sm truncate"></p> */}
            </div>
          </div>
        )}
        {playlists.map((playlist) => (
          <UserPlaylist
            key={playlist.id}
            playlistData={playlist}
            onClick={(songIDs) => handlePlaylist(songIDs)}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
