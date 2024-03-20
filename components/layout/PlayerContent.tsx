"use client";

import { useEffect, useRef, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { Howl } from "howler";
import { useMediaQuery } from "usehooks-ts";

import { Artist, Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { useLyrics, useNowPlaying } from "@/hooks/usePlaying";
import { cn } from "@/libs/utils";

import LikeButton from "../shared/LikeButton";
import Slider from "../shared/Slider";
import PlayerSong from "./PlayerSong";
import PlayerSlider from "../shared/PlayerSlider";

import { Mic2, PlaySquare, Repeat, Repeat1, Shuffle } from "lucide-react";
import { TbRepeatOff } from "react-icons/tb";
import NowPlaying from "./NowPlaying";
import LyricCard from "./Lyric";
import useResize from "@/hooks/useResize";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
  artists: Artist[];
}

const PlayerContent: React.FC<PlayerContentProps> = ({
  song,
  songUrl,
  artists,
}) => {
  const [artistRecord, setArtistRecord] = useState<Artist[]>([]);
  const player = usePlayer();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [repeatMode, setRepeatMode] = useState("none");
  const [shuffleMode, setShuffleMode] = useState(false);
  const repeatModeRef = useRef("none");
  const soundRef = useRef<Howl | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nowPlaying = useNowPlaying();
  const lyrics = useLyrics();
  const resize = useResize();
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  useEffect(() => {
    if (isMobile) {
      nowPlaying.onHide();
      lyrics.onHide();
    }
    if (containerRef.current) {
      if (nowPlaying.isShow && lyrics.isShow) {
        containerRef.current.style.setProperty("left", `${resize.width}px`);
        containerRef.current.style.setProperty(
          "width",
          `calc(100% - ${resize.width}px)`
        );
      } else if (nowPlaying.isShow) {
        containerRef.current.style.width = "350px";
        containerRef.current.style.setProperty("left", "auto");
      } else if (lyrics.isShow) {
        containerRef.current.style.setProperty("left", `${resize.width}px`);
        containerRef.current.style.setProperty(
          "width",
          `calc(100% - ${resize.width}px)`
        );
      } else containerRef.current.style.width = "0";
    }
  }, [isMobile, lyrics, nowPlaying, resize.width]);
  // containerRef.current.style.setProperty("left", `${resize.width}px`);
  const toggleRepeatMode = () => {
    // Chuyển đổi giá trị repeatModeRef
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

  // Next song
  const onPlayNext = () => {
    // Nếu không có bài hát nào thì dừng
    if (player.ids.length === 0) {
      return;
    }

    // Tìm vị trí của bài hát hiện tại trong danh sách
    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    let nextSong;
    if (shuffleMode) {
      const unplayedSongs = player.ids.filter((id) => id !== player.activeId);
      const randomIndex = Math.floor(Math.random() * unplayedSongs.length);
      nextSong = unplayedSongs[randomIndex];
    } else {
      nextSong = player.ids[currentIndex + 1];
    }
    // Nếu không có bài hát tiếp theo thì dừng
    if (!nextSong) {
      // Nếu đang bật chế độ repeatList thì quay lại bài hát đầu tiên
      if (repeatModeRef.current === "repeatList") {
        return player.setId(player.ids[0]);
      } else {
        return;
      }
    }
    // Nếu đang bật chế độ repeat thì quay lại bài hát hiện tại
    if (repeatModeRef.current === "repeat") {
      setProgress(0);
      soundRef.current?.seek(0);
      soundRef.current?.play();
      return;
    } else {
      player.setId(nextSong);
    }
  };

  // Next song (click next button)
  const handlePlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }
    soundRef.current?.unload();

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    let nextSong;

    if (shuffleMode) {
      const unplayedSongs = player.ids.filter((id) => id !== player.activeId);
      const randomIndex = Math.floor(Math.random() * unplayedSongs.length);
      nextSong = unplayedSongs[randomIndex];
    } else {
      nextSong = player.ids[currentIndex + 1];
    }

    // Nếu không có bài hát tiếp theo thì quay lại bài hát đầu tiên
    if (!nextSong) {
      return player.setId(player.ids[0]);
    }
    player.setId(nextSong);
  };

  // Previous song
  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    // Nếu không có bài hát trước đó thì quay lại bài hát cuối cùng
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
    if (audioRef.current) audioRef.current.currentTime = newValue;
  };

  useEffect(() => {
    soundRef.current = new Howl({
      src: [songUrl],
      autoplay: true,
      volume: volume,
      onplay: () => {
        setIsPlaying(true);
        if (audioRef.current)
          audioRef.current.currentTime = soundRef.current?.seek() || 0;
      },
      onend: () => {
        repeatModeRef.current !== "repeat" && setIsPlaying(false);
        onPlayNext();
      },
      onpause: () => setIsPlaying(false),
      format: ["mp3"],
    });

    return () => {
      if (soundRef.current && repeatModeRef.current !== "repeat") {
        soundRef.current.unload();
      }
    };
  }, [songUrl]);

  useEffect(() => {
    setArtistRecord(artists);
  }, [artists]);

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
      setIsPlaying(false);
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
    <div
      className={cn(
        "grid h-full",
        isMobile ? "grid-cols-[1fr,auto]" : "grid-cols-3"
      )}
    >
      <div
        className={cn(
          "grid gap-x-1 mr-auto ",
          isMobile ? "grid-cols-[1fr,auto]" : "grid-cols-2"
        )}
      >
        <PlayerSong song={song} artists={artistRecord} />
        <LikeButton songId={song.id} refresh={false} />
      </div>

      {/* mobile play/pause button
       */}
      <div
        className={cn(
          " flex gap-x-4 w-full justify-end items-center",
          isMobile ? "" : "hidden"
        )}
      >
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
      </div>

      {/* player controls
       */}
      <div
        className={cn(
          "h-full flex-col justify-center items-center",
          isMobile ? "hidden" : "flex"
        )}
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
        {/* current duration */}
        <div className="flex flex-row items-center gap-x-2 w-full justify-center">
          <div className="text-white w-10 flex-shrink-0">
            {new Date(progress * 1000).toISOString().substr(14, 5)}
          </div>
          <div className="flex-shrink-0 w-full h-10">
            <PlayerSlider
              duration={soundRef.current?.duration()}
              value={progress}
              onChange={handleProgressChange}
            />
          </div>
          <div className="text-white w-10 flex-shrink-0">
            {soundRef.current?.duration()
              ? new Date(soundRef.current?.duration() * 1000)
                  .toISOString()
                  .substr(14, 5)
              : "??:??"}
          </div>
        </div>
      </div>

      <div
        className={cn(" w-full justify-end pr-2", isMobile ? "hidden" : "flex")}
      >
        <div className="flex items-center gap-x-2 min-w-[200px]">
          <PlaySquare
            onClick={nowPlaying.isShow ? nowPlaying.onHide : nowPlaying.onShow}
            size={36}
            className={
              (nowPlaying.isShow
                ? "text-green-400 hover:text-green-300"
                : "text-neutral-400 hover:text-white") +
              " cursor-pointer transition mx-4 "
            }
          />
          <Mic2
            onClick={lyrics.isShow ? lyrics.onHide : lyrics.onShow}
            size={36}
            className={
              (lyrics.isShow
                ? "text-green-400 hover:text-green-300"
                : "text-neutral-400 hover:text-white") +
              " cursor-pointer transition mx-4 "
            }
          />
          {/* <Button
            onClick={() => {
              soundRef.current?.seek(17.259923);
            }}
          >
            Seek
          </Button> */}
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <Slider value={volume} onChange={handleVolumeChange} />
        </div>
      </div>
      <div
        ref={containerRef}
        className={cn(
          "containter bg-neutral-500 hidden md:flex justify-end flex-row fixed top-0 right-0 h-[calc(100%-100px)] z-[1001] overflow-hidden"
        )}
      >
        {lyrics.isShow && (
          <LyricCard
            song={song}
            songUrl={songUrl}
            songRef={soundRef}
            isPlaying={isPlaying}
            ref={audioRef}
          />
        )}
        {nowPlaying.isShow && <NowPlaying song={song} artists={artistRecord} />}
      </div>
    </div>
  );
};

export default PlayerContent;
