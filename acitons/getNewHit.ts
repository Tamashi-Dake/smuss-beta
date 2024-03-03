import { Song } from "@/types";
import { supabase } from "@/utils/supabaseSever";

const getNewHits = async (): Promise<Song[]> => {
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .limit(3)
    .order("created_at", { ascending: false });
  if (error) console.log("error", error);
  return (data as Song[]) || [];
};

export default getNewHits;
