"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";
interface SongProps {
  image: string;
  title: string;
  href: string;
}
const Song: React.FC<SongProps> = ({ image, title, href }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(href);
  };
  return (
    <div
      onClick={handleClick}
      className="relative group flex  items-center overflow-hidden gap-x-4 bg-neutral-100/10 transition-all pr-4 rounded-md cursor-pointer"
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image
          className=" rounded-lg "
          src={image}
          alt={title}
          width={70}
          height={70}
        />
      </div>

      <h1 className="text-white text-2xl truncate font-medium">{title}</h1>
      <div className="absolute transition-all opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md group-hover:opacity-100 hover:scale-110 right-5 ">
        <FaPlay className="text-black" />
      </div>
    </div>
  );
};

export default Song;
