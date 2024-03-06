import { Artist } from "@/types";
import { supabase } from "@/utils/supabaseSever";

// Get top 6 artists for user (will change after we have user data)
const getTopArtists = async (): Promise<Artist[]> => {
  const { data, error } = await supabase
    .from("artist")
    .select("*")
    .limit(6)
    .order("created_at", { ascending: false });
  if (error) console.log("error", error);
  return (data as Artist[]) || [];
};

export default getTopArtists;
