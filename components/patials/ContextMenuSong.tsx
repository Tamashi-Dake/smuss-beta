// import useClickAway from "@/hooks/useClickAway";
// import { useSongContextMenu } from "@/hooks/useContextMenu";
// import { cn } from "@/lib/utils";
// import { useRef } from "react";
// import toast from "react-hot-toast";
// import {
//   ContextMenu,
//   ContextMenuContent,
//   ContextMenuItem,
//   ContextMenuShortcut,
//   ContextMenuTrigger,
// } from "@/components/ui/context-menu";
// import { Plus } from "lucide-react";

// interface ContextMenuSongProps {}
// const ContextMenuSong: React.FC<ContextMenuSongProps> = ({}) => {
//   const { show, id, x, y, onHide } = useSongContextMenu();
//   const ref = useRef<HTMLDivElement>(null);
//   useClickAway(ref, onHide);
//   return (
//     <div
//       ref={ref}
//       onClick={(e) => {
//         e.stopPropagation();
//         onHide();
//       }}
//       onContextMenu={(e) => {
//         e.preventDefault();
//         e.stopPropagation();
//       }}
//       style={{ top: y + 2 + "px", left: x + 2 + "px" }}
//       className={cn(
//         "bg-white shadow-lg p-2 rounded-md z-[1000] text-black select-none",
//         show ? "absolute" : "hidden"
//       )}
//     >
//       <ul>
//         <li>{id}</li>
//         <li
//           onClick={() => {
//             toast.success("Added to playlist");
//           }}
//         >
//           Add to playlist
//         </li>
//         <li>Add to Favorite</li>
//         <li>Share</li>
//       </ul>
//     </div>
//   );
// };

// export default ContextMenuSong;
