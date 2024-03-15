import { Playlist } from "@/types";
import { getSupabase } from "@/utils/supabaseSever";

const getArtistAlbum = async (id: string): Promise<Playlist[]> => {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from("playlist")
    .select("*, artist!inner(*)")
    .eq("artist_id", id);
  if (error) console.log("error", error);
  return (data as Playlist[]) || [];
};

export default getArtistAlbum;
