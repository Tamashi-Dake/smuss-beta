import { getSupabase } from "@/utils/supabaseSever";

const getPlaylistInfo = async (id: string): Promise<any> => {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from("playlist")
    .select("*")
    .eq("id", id)
    .single();
  if (error) console.log("error", error);
  return data as any;
};

export default getPlaylistInfo;
