import { Artist } from "@/types";
import { supabase } from "@/utils/supabaseSever";

const getSelectArtist = async (): Promise<Artist[]> => {
  const { data, error } = await supabase
    .from("artist")
    .select("id, name")
    .order("name", { ascending: true });
  if (error) console.log("error", error);
  return (data as Artist[]) || [];
};

export default getSelectArtist;
