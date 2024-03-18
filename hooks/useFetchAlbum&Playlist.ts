import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { Record } from "@/types";

const useFetchAlbumAndPlaylist = ({ isOpen }: { isOpen: boolean }) => {
  const [playlists, setPlaylists] = useState<Record[]>([]);
  const { supabaseClient } = useSessionContext();
  useEffect(() => {
    const fetchPlaylists = async () => {
      const { data, error } = await supabaseClient
        .from("playlist")
        .select("id,name, users!inner(id,role)")
        .filter("users.role", "eq", "admin");
      if (error) {
        return toast.error(error.message);
      }
      setPlaylists(data || []);
    };
    if (isOpen) {
      fetchPlaylists();
    }
  }, [isOpen, supabaseClient]);
  return useMemo(() => ({ playlists }), [playlists]);
};

export default useFetchAlbumAndPlaylist;
