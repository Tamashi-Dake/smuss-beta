"use client";
import { PlusSquare, Share2Icon } from "lucide-react";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "../ui/context-menu";

import { User } from "@supabase/auth-helpers-react";

interface ContextMenuContentSongMinProps {
  user: User | null;
  authModal: any;
  addPlaylist: any;
  handleShare: (event: any) => void;
  handleAddToPlaylist: (playlistId: string) => void;
  playlists: any[];
  relationship: any[];
}

const ContextMenuContentSongMin: React.FC<ContextMenuContentSongMinProps> = ({
  user,
  authModal,
  addPlaylist,
  handleShare,
  handleAddToPlaylist,
  playlists,
  relationship,
}) => {
  return (
    <ContextMenuContent
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className="bg-neutral-800/90 rounded-md shadow-lg p-2 text-neutral-100/90 w-48 z-[1002]"
    >
      {user ? (
        playlists.length > 0 ? (
          <ContextMenuSub>
            <ContextMenuSubTrigger onClick={addPlaylist.onOpen}>
              <PlusSquare className="w-4 h-4 mr-2" />
              Add to Playlist
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="bg-neutral-800/90 rounded-md shadow-lg p-2 text-neutral-100/90 w-48 z-[1002]">
              {playlists.map((playlist) => (
                <ContextMenuItem
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
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
        ) : (
          <ContextMenuItem onClick={addPlaylist.onOpen}>
            <PlusSquare className="w-4 h-4 mr-2" />
            Add to Playlist
          </ContextMenuItem>
        )
      ) : (
        <ContextMenuItem onClick={authModal.onOpen}>
          <PlusSquare className="w-4 h-4 mr-2" />
          Add to Playlist
        </ContextMenuItem>
      )}
      <ContextMenuItem onClick={handleShare}>
        <Share2Icon className="w-4 h-4 mr-2" />
        Share
      </ContextMenuItem>
    </ContextMenuContent>
  );
};

export default ContextMenuContentSongMin;
