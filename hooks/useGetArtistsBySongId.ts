import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { Artist } from "@/types";

const useGetArtistBySongId = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [artist, setArtist] = useState<Artist[]>([]);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    const fetchArtist = async () => {
      const { data, error } = await supabaseClient
        .from("rel_song_artist")
        .select("*, artist!inner(*)")
        .eq("song_id", id)
        .order("created_at", { ascending: true });

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setArtist(data.map((item) => item.artist));
      setIsLoading(false);
    };

    fetchArtist();
  }, [id, supabaseClient]);

  return useMemo(
    () => ({
      isLoading,
      artist,
    }),
    [isLoading, artist]
  );
};

export default useGetArtistBySongId;
