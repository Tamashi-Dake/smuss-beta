import { FaPlay } from "react-icons/fa";

const PlayButton = () => {
  return (
    <button
      className="
    transition-all
    duration-400
    ease-in-out
    translate-y-2
    opacity-0
    p-4
    bg-green-500
    rounded-full
    hover:scale-110
    hover:bg-green-400
    group-hover:-translate-y-1 
    group-hover:opacity-100
    peer
    "
    >
      <FaPlay className="text-black" />
    </button>
  );
};

export default PlayButton;
