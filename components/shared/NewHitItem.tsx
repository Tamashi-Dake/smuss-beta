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
    <div className="relative min-h-40 min-w-64 cursor-pointer">
      <Image
        className="object-cover size-32 min-w-52 rounded-md overflow-hidden"
        src={image || "/liked.png"}
        alt={data.title}
        onClick={() => onClick(data.id)}
      />
    </div>
  );
};

export default NewHitItem;
