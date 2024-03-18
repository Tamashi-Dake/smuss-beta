import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { SongRecord } from "@/types";

const useFetchSongs = ({ isOpen }: { isOpen: boolean }) => {
  const [songs, setSongs] = useState<SongRecord[]>([]);
  const { supabaseClient } = useSessionContext();
  useEffect(() => {
    const fetchSongs = async () => {
      const { data, error } = await supabaseClient
        .from("songs")
        .select("id, title");
      if (error) {
        return toast.error(error.message);
      }
      setSongs(data || []);
    };
    if (isOpen) {
      fetchSongs();
    }
  }, [isOpen, supabaseClient]);
  return useMemo(() => ({ songs }), [songs]);
};

export default useFetchSongs;
