import { Song } from "@/types";
import { getSupabase } from "@/utils/supabaseSever";

const getSongs = async (): Promise<Song[]> => {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) console.log("error", error);
  return (data as Song[]) || [];
};

export default getSongs;
