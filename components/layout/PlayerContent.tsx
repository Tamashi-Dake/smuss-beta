"use client";

import { use, useEffect, useRef, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { Howl, Howler } from "howler";

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

import LikeButton from "../shared/LikeButton";
import Slider from "../shared/Slider";
import PlayerSong from "./PlayerSong";
import PlayerSlider from "../shared/PlayerSlider";
import { Repeat, Repeat1, Shuffle } from "lucide-react";
import { TbRepeatOff } from "react-icons/tb";
import { set } from "react-hook-form";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // Progress in seconds
  const [repeatMode, setRepeatMode] = useState("none"); // 'none', 'repeat', 'repeatList'
  const [shuffleMode, setShuffleMode] = useState(false);
  const [playedSongs, setPlayedSongs] = useState<string[]>([]);
  const repeatModeRef = useRef("none"); // Sử dụng useRef để lưu trữ giá trị repeatMode
  const soundRef = useRef<Howl | null>(null);
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;
  const toggleRepeatMode = () => {
    // console.log("repeatModeRef.current", repeatModeRef.current);
    switch (repeatModeRef.current) {
      case "none":
        repeatModeRef.current = "repeat";
        break;
      case "repeat":
        repeatModeRef.current = "repeatList";
        break;
      case "repeatList":
        repeatModeRef.current = "none";
        break;
      default:
        break;
    }
    setRepeatMode(repeatModeRef.current);
  };

  // useEffect(() => {
  //   setRepeatMode(repeatModeRef.current);
  //   console.log("repeatMode", repeatMode);
  // }, [repeatModeRef.current]);

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    let nextSong;
    if (shuffleMode) {
      const unplayedSongs = player.ids.filter((id) => id !== player.activeId);
      const randomIndex = Math.floor(Math.random() * unplayedSongs.length);
      nextSong = unplayedSongs[randomIndex];
    } else {
      nextSong = player.ids[currentIndex + 1];
    }
    // console.log("repeatMode", repeatModeRef.current); // Sử dụng repeatModeRef.current ở đây
    // console.log("nextSong", nextSong);
    if (!nextSong) {
      if (repeatModeRef.current === "repeatList") {
        return player.setId(player.ids[0]);
      } else {
        return;
      }
    }
    if (repeatModeRef.current === "repeat") {
      // console.log("setProgress", 0);
      setProgress(0);
      soundRef.current?.seek(0);
      soundRef.current?.play();
      return;
    } else {
      player.setId(nextSong);
    }
  };
  const handlePlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    let nextSong;

    if (shuffleMode) {
      const unplayedSongs = player.ids.filter((id) => id !== player.activeId);
      const randomIndex = Math.floor(Math.random() * unplayedSongs.length);
      nextSong = unplayedSongs[randomIndex];
    } else {
      nextSong = player.ids[currentIndex + 1];
    }
    console.log("player.ids", player.ids);
    console.log("nextSong", nextSong);
    console.log("playedSongs", playedSongs);

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }
    player.setId(nextSong);
  };
  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    soundRef.current?.volume(value);
  };
  const handleProgressChange = (newValue: number) => {
    setProgress(newValue);
    soundRef.current?.seek(newValue);
  };

  useEffect(() => {
    soundRef.current = new Howl({
      src: [songUrl],
      autoplay: true,
      volume: volume,
      onplay: () => setIsPlaying(true),
      onend: () => {
        repeatModeRef.current !== "repeat" && setIsPlaying(false);
        onPlayNext();
      },
      onpause: () => setIsPlaying(false),
      format: ["mp3"],
      // loop: repeatMode === "repeat" ? true : false,
    });

    return () => {
      if (soundRef.current && repeatModeRef.current !== "repeat") {
        // console.log("unmount");
        soundRef.current.unload();
      }
    };
  }, [songUrl]);

  useEffect(() => {
    const updateProgress = () => {
      const seek = soundRef.current?.seek() || 0;
      setProgress(seek);
      requestAnimationFrame(updateProgress);
    };

    if (isPlaying) {
      requestAnimationFrame(updateProgress);
    }
  }, [isPlaying]);

  const handlePlay = () => {
    if (!isPlaying) {
      soundRef.current?.play();
    } else {
      soundRef.current?.pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
      soundRef.current?.volume(1);
    } else {
      setVolume(0);
      soundRef.current?.volume(0);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex  justify-start items-center gap-x-4">
        <PlayerSong song={song} />
        <LikeButton songId={song.id} />
      </div>

      {/* mobile play/pause button
       */}
      <div
        className="
            flex 
            md:hidden 
            col-auto 
            w-full 
            justify-end 
            items-center
          "
      >
        <div
          onClick={handlePlay}
          className="
              h-10
              w-10
              flex 
              items-center 
              justify-center 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            "
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      {/* player controls
       */}
      <div
        className="
            hidden
            h-full
            md:flex
            flex-col
            justify-center
            items-center
          "
      >
        <div
          className="md:flex 
            justify-center 
            items-center 
            w-full 
            max-w-[722px] 
            gap-x-6"
        >
          {repeatMode === "none" && (
            <TbRepeatOff
              onClick={toggleRepeatMode}
              size={30}
              className="
                text-neutral-400 
                cursor-pointer 
                hover:text-neutral-300 
                transition
              "
            />
          )}
          {repeatMode === "repeat" && (
            <Repeat1
              onClick={toggleRepeatMode}
              size={30}
              className="
                text-white 
                cursor-pointer 
                transition
              "
            />
          )}
          {repeatMode === "repeatList" && (
            <Repeat
              onClick={toggleRepeatMode}
              size={30}
              className="
                text-white
                cursor-pointer 
                transition
              "
            />
          )}

          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={30}
            className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
          />
          <div
            onClick={handlePlay}
            className="
              flex 
              items-center 
              justify-center
              h-10
              w-10 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            "
          >
            <Icon size={30} className="text-black" />
          </div>
          <AiFillStepForward
            onClick={handlePlayNext}
            size={30}
            className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
          />

          <Shuffle
            size={30}
            className={
              (shuffleMode
                ? "text-white"
                : "text-neutral-400 hover:text-neutral-200") +
              " cursor-pointer  transition "
            }
            onClick={() => setShuffleMode(!shuffleMode)}
          />
        </div>
        <PlayerSlider
          duration={soundRef.current?.duration()}
          value={progress}
          onChange={handleProgressChange}
        />
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <Slider value={volume} onChange={handleVolumeChange} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
