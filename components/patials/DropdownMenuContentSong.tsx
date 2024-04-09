import { PlusSquare, Share2Icon } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "../ui/dropdown-menu";
import { User } from "@supabase/supabase-js";

interface DropdownMenuContentSongProps {
  user: User | null;
  authModal: any;
  addPlaylist: any;
  handleShare: (event: any) => void;
  handleAddToPlaylist: (playlistId: string) => void;
  playlists: any[];
  relationship: any[];
}

const DropdownMenuContentSong: React.FC<DropdownMenuContentSongProps> = ({
  user,
  authModal,
  addPlaylist,
  handleShare,
  handleAddToPlaylist,
  playlists,
  relationship,
}) => {
  return (
    <DropdownMenuContent
      onClick={(e) => {
        e.stopPropagation();
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className="bg-neutral-800 rounded-md shadow-lg p-2 text-neutral-100/90 w-48 z-[1002]"
    >
      {user ? (
        playlists.length > 0 ? (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger
              className="data-[state=open]:text-black hover:text-black"
              onClick={addPlaylist.onOpen}
            >
              <PlusSquare className="w-4 h-4 mr-2" />
              Add to Playlist
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="bg-neutral-800/90 rounded-md shadow-lg p-2 text-neutral-100/90 w-48 z-[1002]">
                {playlists.map((playlist) => (
                  <DropdownMenuItem
                    key={playlist.id}
                    onClick={() => handleAddToPlaylist(playlist.id)}
                  >
                    {relationship.some(
                      (rel) => rel.playlist_id === playlist.id
                    ) ? (
                      <span className="w-2 mr-2">✓</span>
                    ) : (
                      <span className="w-2 mr-2"> </span>
                    )}
                    <p>{playlist.name}</p>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        ) : (
          <DropdownMenuItem onClick={addPlaylist.onOpen}>
            <PlusSquare className="w-4 h-4 mr-2" />
            Add to Playlist
          </DropdownMenuItem>
        )
      ) : (
        <DropdownMenuItem onClick={authModal.onOpen}>
          <PlusSquare className="w-4 h-4 mr-2" />
          Add to Playlist
        </DropdownMenuItem>
      )}
      <DropdownMenuItem onClick={handleShare}>
        {" "}
        <Share2Icon className="w-4 h-4 mr-2" />
        Share
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default DropdownMenuContentSong;
