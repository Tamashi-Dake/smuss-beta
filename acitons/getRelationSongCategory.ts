import { getSupabase } from "@/utils/supabaseSever";

const getRelationSongCategory = async (): Promise<any[]> => {
  const supabase = await getSupabase();
  const { data, error } = await supabase.from("rel_song_category").select("*");
  if (error) console.log("error", error);
  return (data as any[]) || [];
};

export default getRelationSongCategory;
