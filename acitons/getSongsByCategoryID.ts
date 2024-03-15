import { getSupabase } from "@/utils/supabaseSever";

const getSongByCategoryID = async (id: string): Promise<any[]> => {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from("rel_song_category")
    .select("*,songs!inner(*)")
    .eq("category_id", id)
    .order("created_at", { ascending: true });
  if (error) console.log("error", error);
  return (data as any[]) || [];
};

export default getSongByCategoryID;
