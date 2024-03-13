import { Song } from "@/types";
import { getSupabase } from "@/utils/supabaseSever";

const getSongInfo = async (id: string): Promise<Song> => {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("id", id)
    .single();
  if (error) console.log("error", error);
  return data as Song;
};

export default getSongInfo;
