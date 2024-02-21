import { Playlist } from "@/types";
import { supabase } from "@/utils/supabaseSever";

const getPublicPlaylists = async (): Promise<Playlist[]> => {
  const { data, error } = await supabase
    .from("playlist")
    .select("*, users!inner(*)")
    .eq("users.role", "admin");
  if (error) console.log("error", error);
  return (data as Playlist[]) || [];
};

export default getPublicPlaylists;
