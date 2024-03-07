"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Song } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";
import NewHitItem from "../shared/NewHitItem";
import { useMediaQuery } from "usehooks-ts";

interface NewHitsProps {
  songs: Song[];
}

const NewHits: React.FC<NewHitsProps> = ({ songs }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [songState, setSongState] = useState<Song[]>(songs);
  const [positonIndex, setPositionIndex] = useState(
    isMobile ? [0, 1] : [0, 1, 2]
  );
  const onPlay = useOnPlay(songs);
  const position = isMobile ? ["left", "right"] : ["left", "center", "right"];
  const [variants, setVariants] = useState({});
  useEffect(() => {
    const songVariants = {
      left: {
        x: "-100%",
        opacity: 1,
        transition: {
          duration: 0.5,
        },
      },
      ...(isMobile
        ? {
            center: {
              x: "0%",
              opacity: 1,
              transition: {
                duration: 0.5,
              },
            },
          }
        : {}),
      right: {
        x: "100%",
        opacity: 1,

        transition: {
          duration: 0.5,
        },
      },
    };
    setVariants(songVariants);
  }, [isMobile]);

  useEffect(() => {
    setSongState(songs);
  }, [songs]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPositionIndex((prevIndex) => {
        const nextIndex = prevIndex.map(
          (index) => (index + 1) % songState.length
        );
        return nextIndex;
      });

      // console.log(variants);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      <div className=" relative flex flex-col justify-between items-center min-h-32 w-full">
        {songState.map((song, index) => (
          <motion.div
            key={song.id}
            initial={isMobile ? "left" : "center"}
            animate={position[positonIndex[index]]}
            exit={{ opacity: 0 }}
            variants={variants}
            transition={{ duration: 0.5 }}
            className="absolute song-item rounded-lg px-4 lg:px-7 xl:px-8"
          >
            <NewHitItem data={song} onClick={(id) => onPlay(id)} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default NewHits;
