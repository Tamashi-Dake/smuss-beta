import { useDeleteModal, useUpdatePlaylistModal } from "@/hooks/useModal";
import { ContextMenuContent, ContextMenuItem } from "../ui/context-menu";
import { Edit, Share2Icon, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const ContextMenuContentPlaylist = ({ playlistID }: { playlistID: string }) => {
  const updateModal = useUpdatePlaylistModal();
  const deleteModal = useDeleteModal();
  const handleShare = (event: any) => {
    event.stopPropagation();
    navigator.clipboard.writeText(
      `https://smuss-beta.vercel.app/playlist/${playlistID}`
    );
    toast.success("Copied to clipboard!");
  };
  return (
    <ContextMenuContent
      onContextMenu={(e) => {
        e.preventDefault();
      }}
      className="bg-neutral-800/90 rounded-md shadow-lg p-2 text-neutral-100/90 w-48 z-[1002]"
    >
      <ContextMenuItem onClick={() => updateModal.onOpen(playlistID)}>
        <Edit className="w-4 h-4 mr-2" />
        Update Playlist
      </ContextMenuItem>
      <ContextMenuItem
        onClick={() => deleteModal.onOpen(playlistID, "playlist")}
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Delete Playlist
      </ContextMenuItem>
      <ContextMenuItem onClick={handleShare}>
        {" "}
        <Share2Icon className="w-4 h-4 mr-2" />
        Share
      </ContextMenuItem>
    </ContextMenuContent>
  );
};

export default ContextMenuContentPlaylist;
