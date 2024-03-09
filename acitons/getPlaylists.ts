import { Playlist } from "@/types";
import { getSupabase } from "@/utils/supabaseSever";

const getPlaylists = async (): Promise<Playlist[]> => {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from("playlist")
    .select("*, users!inner(id,role)")
    .filter("users.role", "eq", "admin");
  if (error) console.log("error", error);
  return (data as Playlist[]) || [];
};

export default getPlaylists;
