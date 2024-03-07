import useClickAway from "@/hooks/useClickAway";
import { useRef } from "react";

interface ContextMenuSongProps {
  x: number;
  y: number;
  close: (e: any) => void;
}
const ContextMenuSong: React.FC<ContextMenuSongProps> = ({ x, y, close }) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickAway(ref, close);
  return (
    <div
      ref={ref}
      onClick={(e) => close(e)}
      style={{ top: y + 2 + "px", left: x + 2 + "px" }}
      className="fixed bg-white shadow-lg p-2 rounded-md z-[1000] text-black"
    >
      Context menu Song
    </div>
  );
};

export default ContextMenuSong;
