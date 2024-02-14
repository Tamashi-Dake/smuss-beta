import { Playlist } from "@/types";
import { supabase } from "@/utils/supabaseSever";

const getPlaylists = async (): Promise<Playlist[]> => {
  const { data, error } = await supabase.from("playlist").select("*");
  if (error) console.log("error", error);
  return (data as Playlist[]) || [];
};

export default getPlaylists;
