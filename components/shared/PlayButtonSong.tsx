// "use client";
// import useOnPlay from "@/hooks/useOnPlay";
// import usePlayer from "@/hooks/usePlayer";
// import { cn } from "@/lib/utils";
// import { FaPlay } from "react-icons/fa";

// interface PlayButtonProps {
//   songId: string;
// }

// const PlayButtonSong: React.FC<PlayButtonProps> = ({ songId }) => {
//   const player = usePlayer();
//   const handleFavPlay = () => {
//     player.setId(songId);
//   };
//   console.log("player ids", player.ids);

//   return (
//     <div
//       className={cn(
//         "w-14 transition-all rounded-full flex items-center justify-center bg-green-500 p-5 drop-shadow-md hover:bg-green-400 cursor-pointer"
//       )}
//       onClick={handleFavPlay}
//     >
//       <FaPlay className="text-black" />
//     </div>
//   );
// };

// export default PlayButtonSong;
