import { Playlist } from "@/types";
import { supabase } from "@/utils/supabaseSever";

const getSelectPlaylist = async (): Promise<Playlist[]> => {
  const { data, error } = await supabase
    .from("playlist")
    .select("id, name,users!inner(id,role)")
    .eq("users.role", "admin")
    .order("name", { ascending: true });
  if (error) console.log("error", error);
  return (data as unknown as Playlist[]) || [];
};

export default getSelectPlaylist;
