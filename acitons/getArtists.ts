import { Artist } from "@/types";
import { supabase } from "@/utils/supabaseSever";

const getArtists = async (): Promise<Artist[]> => {
  const { data, error } = await supabase.from("artist").select("*");
  if (error) console.log("error", error);
  return (data as Artist[]) || [];
};

export default getArtists;
