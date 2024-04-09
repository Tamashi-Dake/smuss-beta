import { Edit, Share2Icon, Trash2 } from "lucide-react";
import { DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { useDeleteModal, useUpdatePlaylistModal } from "@/hooks/useModal";

const DropdownMenuContentPlaylist = ({
  playlistID,
  handleShare,
}: {
  playlistID: string;
  handleShare: (event: any) => void;
}) => {
  const updateModal = useUpdatePlaylistModal();
  const deleteModal = useDeleteModal();
  return (
    <DropdownMenuContent
      onContextMenu={(e) => {
        e.preventDefault();
      }}
      className="bg-neutral-800/90 rounded-md shadow-lg p-2 text-neutral-100/90 w-48 z-[1002]"
    >
      <DropdownMenuItem onClick={() => updateModal.onOpen(playlistID)}>
        <Edit className="w-4 h-4 mr-2" />
        Update Playlist
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => deleteModal.onOpen(playlistID, "playlist")}
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Delete Playlist
      </DropdownMenuItem>
      <DropdownMenuItem onClick={handleShare}>
        {" "}
        <Share2Icon className="w-4 h-4 mr-2" />
        Share
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default DropdownMenuContentPlaylist;
