import { Artist } from "@/types";
import { getSupabase } from "@/utils/supabaseSever";

const getArtistInfo = async (id: string): Promise<Artist> => {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from("artist")
    .select("*")
    .eq("id", id)
    .single();
  if (error) console.log("error", error);
  return data as Artist;
};

export default getArtistInfo;
