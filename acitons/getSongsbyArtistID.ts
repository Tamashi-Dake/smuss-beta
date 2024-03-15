import { getSupabase } from "@/utils/supabaseSever";

const getSongByArtistID = async (id: string): Promise<any[]> => {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from("rel_song_artist")
    .select("*,songs!inner(*)")
    .eq("artist_id", id)
    .order("created_at", { ascending: true });
  if (error) console.log("error", error);
  return (data as any[]) || [];
};

export default getSongByArtistID;
