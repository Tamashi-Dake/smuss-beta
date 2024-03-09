import { Playlist } from "@/types";
import { getSupabase } from "@/utils/supabaseSever";

const getRandomPublicPlaylists = async (): Promise<Playlist[]> => {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from("random_playlists")
    .select("*, users!inner(*)")
    .is("artist_id", null)
    .eq("users.role", "admin");
  if (error) console.log("error", error);
  return (data as Playlist[]) || [];
};

export default getRandomPublicPlaylists;
