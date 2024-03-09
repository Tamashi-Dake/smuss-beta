import { Artist } from "@/types";
import { getSupabase } from "@/utils/supabaseSever";

const getArtists = async (): Promise<Artist[]> => {
  const supabase = await getSupabase();
  const { data, error } = await supabase.from("artist").select("*");
  if (error) console.log("error", error);
  return (data as Artist[]) || [];
};

export default getArtists;
