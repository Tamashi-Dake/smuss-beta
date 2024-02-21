import { Song } from "@/types";
import { supabase } from "@/utils/supabaseSever";

const getSelectSong = async (): Promise<Song[]> => {
  const { data, error } = await supabase
    .from("songs")
    .select("id, title")
    .order("title", { ascending: true });
  if (error) console.log("error", error);
  return (data as Song[]) || [];
};

export default getSelectSong;
