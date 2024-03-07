"use client";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

interface NewHitItemProps {
  data: Song;
  onClick: (id: string) => void;
}

const NewHitItem: React.FC<NewHitItemProps> = ({ data, onClick }) => {
  const image = useLoadImage(data);
  return (
    <div className="relative h-32 w-36 xl:min-h-40 xl:min-w-64 cursor-pointer  overflow-hidden ">
      <Image
        className="object-cover w-full h-full rounded-md xl:min-h-40 xl:min-w-64 hover:scale-110 transition-all ease-in-out duration-200"
        src={image || "/liked.png"}
        alt={data.title}
        width={500}
        height={500}
        onClick={() => onClick(data.id)}
      />
      <div
        className="absolute group top-0 left-0 w-full h-full bg-black bg-opacity-0 flex justify-center items-center transition-all ease-in-out duration-200 hover:bg-opacity-50"
        onClick={() => onClick(data.id)}
      >
        <FaPlay className=" text-white text-2xl opacity-0 group-hover:opacity-100" />
      </div>
    </div>
  );
};

export default NewHitItem;
