"use client";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import { on } from "events";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";

interface NewHitItemProps {
  data: Song;
  onClick: (id: string) => void;
}

const NewHitItem: React.FC<NewHitItemProps> = ({ data, onClick }) => {
  const router = useRouter();
  const image = useLoadImage(data);
  return (
    <div className="relative h-28 w-36 xl:min-h-40 xl:min-w-64 cursor-pointer  overflow-hidden ">
      <Image
        className="object-cover rounded-md h-28 w-36 xl:min-h-40 xl:min-w-64 hover:scale-125 transition-all ease-in-out duration-200"
        src={image || "/liked.png"}
        alt={data.title}
        width={500}
        height={500}
        onClick={() => onClick(data.id)}
      />
    </div>
  );
};

export default NewHitItem;
