"use client";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";

interface SongProps {
  data: Song;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongProps> = ({ data, onClick }) => {
  const router = useRouter();
  const image = useLoadImage(data);
  const handleClick = () => {
    // router.push();
  };
  return (
    <div
      onClick={handleClick}
      className="relative group flex items-center overflow-hidden gap-x-4 bg-neutral-100/10 transition-all pr-4 rounded-md cursor-pointer hover:bg-neutral-100/20 min-h-16"
    >
      {/* TODO: Add shadow */}
      <div className="relative min-h-[64px] min-w-[64px] ">
        <Image
          className="object-cover size-16 rounded-md overflow-hidden"
          src={image || "/liked.png"}
          alt={data.title}
          width={200}
          height={200}
        />
      </div>

      <h1 className="text-white text-xl truncate font-medium">{data.title}</h1>
      <div
        className="absolute transition-all opacity-0 rounded-full flex items-center justify-center bg-green-500 p-3 drop-shadow-md group-hover:opacity-100 hover:scale-110 right-5 "
        onClick={() => onClick(data.id)}
      >
        <FaPlay className="text-black" />
      </div>
    </div>
  );
};

export default SongItem;
