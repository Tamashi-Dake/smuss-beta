import { Playlist } from "@/types";
import { supabase } from "@/utils/supabaseSever";

const getAlbums = async (): Promise<Playlist[]> => {
  const { data, error } = await supabase
    .from("playlist")
    .select("*, artist!inner(*)")
    .limit(6);
  if (error) console.log("error", error);
  return (data as Playlist[]) || [];
};

export default getAlbums;
