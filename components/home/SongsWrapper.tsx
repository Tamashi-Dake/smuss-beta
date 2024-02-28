"use client";
import { Song } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";
import SongItem from "../shared/Song";
interface SongsWrapperProps {
  songs: Song[];
}
const SongsWrapper: React.FC<SongsWrapperProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);
  return (
    <div
      className="
    grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4 rounded-md"
    >
      {songs.map((song) => (
        <SongItem key={song.id} data={song} onClick={(id) => onPlay(id)} />
      ))}
    </div>
  );
};

export default SongsWrapper;
