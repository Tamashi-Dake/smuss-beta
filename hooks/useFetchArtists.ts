import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { Record } from "@/types";

const useFetchArtists = ({ isOpen }: { isOpen: boolean }) => {
  const [artists, setArtists] = useState<Record[]>([]);
  const { supabaseClient } = useSessionContext();
  useEffect(() => {
    const fetchArtists = async () => {
      const { data, error } = await supabaseClient
        .from("artist")
        .select("id, name");
      if (error) {
        return toast.error(error.message);
      }
      setArtists(data || []);
    };
    if (isOpen) {
      fetchArtists();
    }
  }, [isOpen, supabaseClient]);
  return useMemo(() => ({ artists }), [artists]);
};

export default useFetchArtists;
