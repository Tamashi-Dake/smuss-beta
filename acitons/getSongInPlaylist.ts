import { supabase } from "@/utils/supabaseSever";

const getSongInPlaylist = async (): Promise<any[]> => {
  const { data, error } = await supabase
    .from("rel_song_playlist")
    .select("*,songs(*)")
    .order("created_at", { ascending: true });
  // console.log(data);
  if (error) console.log("error", error);
  return (data as any[]) || [];
};

export default getSongInPlaylist;
