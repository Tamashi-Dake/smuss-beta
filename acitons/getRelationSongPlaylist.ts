import { supabase } from "@/utils/supabaseSever";

const getRelationSongPlaylist = async (): Promise<any[]> => {
  const { data, error } = await supabase.from("rel_song_playlist").select("*");
  // console.log(data);
  if (error) console.log("error", error);
  return (data as any[]) || [];
};

export default getRelationSongPlaylist;
