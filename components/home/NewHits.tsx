"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Song } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";
import SongItem from "../shared/Song";
import NewHitItem from "../shared/NewHitItem";

interface NewHitsProps {
  songs: Song[];
}

const NewHits: React.FC<NewHitsProps> = ({ songs }) => {
  const [songState, setSongState] = useState<Song[]>(songs);
  const [positonIndex, setPositionIndex] = useState([0, 1, 2]);
  const position = ["left", "center", "right"];
  const onPlay = useOnPlay(songs);

  const songVariants = {
    left: {
      x: "-100%",
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    center: {
      x: "0%",
      opacity: 1,

      transition: {
        duration: 0.5,
      },
    },
    right: {
      x: "100%",
      opacity: 1,

      transition: {
        duration: 0.5,
      },
    },
  };

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
      console.log(positonIndex);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className=" relative flex flex-col justify-between items-center min-h-32">
        {songState.map((song, index) => (
          <motion.div
            key={song.id}
            initial="center"
            animate={position[positonIndex.indexOf(index)]}
            exit={{ opacity: 0 }}
            variants={songVariants}
            transition={{ duration: 0.5 }}
            className="absolute song-item rounded-lg px-10"
          >
            <NewHitItem data={song} onClick={(id) => onPlay(id)} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default NewHits;
