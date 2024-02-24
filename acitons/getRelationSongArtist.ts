import { supabase } from "@/utils/supabaseSever";

const getRelationSongArtist = async (): Promise<any[]> => {
  const { data, error } = await supabase.from("rel_song_artist").select("*");
  if (error) console.log("error", error);
  return (data as any[]) || [];
};

export default getRelationSongArtist;
