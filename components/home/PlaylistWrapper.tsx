"use client";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";
import { Playlist, Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

import { useAuthModal } from "@/hooks/useModal";
import { useUser } from "@/hooks/useUser";

import PlaylistItem from "../shared/PlaylistItem";
import Wrapper from "../shared/Wrapper";

interface PlaylistWrapperProps {
  data: Playlist[];
  related: any;
}
const PlaylistWrapper: React.FC<PlaylistWrapperProps> = ({ data, related }) => {
  const [activePlaylist, setActivePlaylist] = useState<string>("");
  const [songList, setSongList] = useState<Song[]>([]);
  const player = usePlayer();
  const authModal = useAuthModal();
  const { subscription, user } = useUser();
  // Lấy danh sách bài hát từ hook và cập nhật state songList
  useEffect(() => {
    const relatedSong = related.filter(
      (item: any) => item.playlist_id === activePlaylist
    );
    const songPlayList = relatedSong.map((item: any) => item.songs);
    setSongList(songPlayList);
  }, [related, activePlaylist]);

  useEffect(() => {
    if (songList.length > 0) {
      player.setIds(songList.map((song: any) => song.id));
      player.setId(songList[0].id);
    }
  }, [songList]);
  // console.log(songList);
  const handlePlaylist = (playlistId: string) => {
    if (!user) {
      return authModal.onOpen();
    }
    // player.reset();
    setActivePlaylist(playlistId);
  };
  return (
    <Wrapper>
      {data.map((item) => (
        // <p key={item.id}>{item.name}</p>
        <PlaylistItem
          key={item.id}
          data={item}
          onClick={() => handlePlaylist(item.id)}
        />
      ))}
    </Wrapper>
  );
};

export default PlaylistWrapper;
