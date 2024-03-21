"use client";
import { useLyrics } from "@/hooks/usePlaying";
import { useWindowScrollPositions } from "@/hooks/useScroll";
import { cn } from "@/libs/utils";
import { Song } from "@/types";
import { Lrc, Runner } from "lrc-kit";
import { X } from "lucide-react";
import { forwardRef, useEffect, useRef, useState } from "react";
interface LyricCardProps {
  song: Song;
  songRef: React.RefObject<any>;
  songUrl: string;
  isPlaying: boolean;
}
// eslint-disable-next-line react/display-name
const LyricCard = forwardRef<HTMLAudioElement, LyricCardProps>(
  ({ song, songRef, songUrl, isPlaying }, audioRef) => {
    const { scrollX, scrollY } = useWindowScrollPositions();
    const [lrc, setLrc] = useState<Lrc | null>(null);
    const [runner, setRunner] = useState<Runner | null>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const { onHide } = useLyrics();
    const fallbackRef = useRef<HTMLAudioElement>(null);
    const ref: any = audioRef || fallbackRef;
    useEffect(() => {
      const parsedLrc = Lrc.parse(song.lyric);
      const lrcRunner = new Runner(parsedLrc);
      setLrc(parsedLrc);
      setRunner(lrcRunner);
    }, [songUrl, song.lyric]);

    useEffect(() => {
      if (isPlaying && ref.current) {
        ref.current.play();
        ref.current.currentTime = songRef.current.seek();

        // for each 10 seconds, we will match the current time with songRef (because songref is from Howler, although we set the currentTime of audioRef, it's not accurate, so we need to update it every 15 seconds to make sure it's accurate) - temporary solution
        setInterval(() => {
          if (
            ref.current &&
            ref.current.currentTime !== songRef.current.seek()
          ) {
            ref.current.currentTime = songRef.current.seek();
          }
        }, 15000);
      } else if (ref.current) {
        ref.current.pause();
      }
    }, [audioRef, isPlaying, songRef]);

    // useEffect(() => {
    //   if (runner) {
    //     const index = runner.curIndex();
    //     const lyric = lrc?.lyrics[index];
    //     if (lyric) {
    //       const element = document.querySelector(`li:nth-child(${index + 1})`);
    //       if (element) {
    //         element.scrollIntoView({
    //           behavior: "smooth",
    //           block: "center",
    //         });
    //       }
    //     }
    //   }
    // }, [lrc?.lyrics, runner]);
    // audioRef.current.currentTime = songRef.current.seek();
    // runner?.timeUpdate(songRef.current.seek());
    const handleTimeUpdate = () => {
      setCurrentTime(ref.current.currentTime);
      if (runner) {
        runner.timeUpdate(ref.current.currentTime);
      }
      // console.log(audioRef.current.currentTime);
    };
    const handleLyricClick = (index: number) => {
      const lyric = lrc?.lyrics[index];
      if (lyric) {
        songRef.current.seek(lyric.timestamp);
        ref.current.currentTime = lyric.timestamp;
        // audioRef.current.playbackRate = 1.01;
        if (runner) {
          runner.timeUpdate(lyric.timestamp);
        }
      }
    };
    // const handleLyricClick = (index) => {
    //   const lyric = lrc.lyrics[index];
    //   if (lyric) {
    //     audioRef.current.currentTime = lyric.timestamp;
    //     audioRef.current.play();
    //   }
    // };
    return (
      <>
        <audio
          className="hidden"
          ref={ref}
          src={songUrl}
          controls
          autoPlay
          muted
          onTimeUpdate={handleTimeUpdate} // Sử dụng onTimeUpdate để xử lý sự kiện timeupdate
        />

        <div
          className={cn(
            "bg-neutral-500 flex flex-col items-center m-auto overflow-y-auto h-full p-5 md:py-10 w-full relative"
          )}
        >
          <button
            onClick={onHide}
            className="text-white hover:bg-gray-300 absolute top-3 left-3 rounded-full transition-all duration-300 p-2 "
          >
            <X size={24} />
          </button>
          <ul>
            {lrc ? (
              lrc.lyrics.map((lyric, index) => (
                <li
                  key={index}
                  className={cn(
                    "font-bold text-2xl py-2 w-11/12 text-left cursor-pointer hover:text-green-200",
                    runner && runner.curIndex() === index
                      ? "active text-green-400"
                      : ""
                  )}
                  onClick={() => handleLyricClick(index)}
                >
                  {lyric.content}
                </li>
              ))
            ) : (
              <li className="font-bold text-5xl py-2 w-11/12 text-center hover:text-neutral-200">
                Look like we don&apos;t have lyric for this song
              </li>
            )}
          </ul>
        </div>
      </>
    );
  }
);

export default LyricCard;
