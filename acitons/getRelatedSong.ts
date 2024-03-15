import { getSupabase } from "@/utils/supabaseSever";

// get related song in the same categories, but got stuck when compare mutiple categories rows
const getRelatedSong = async (id: string): Promise<any[]> => {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from("rel_song_category")
    .select("*,songs!inner(*)")
    .eq("song_id", id)
    .order("created_at", { ascending: true });
  if (error) console.log("error", error);
  return (data as any[]) || [];
};

export default getRelatedSong;
