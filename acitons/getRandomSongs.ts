import { Song } from "@/types";
import { supabase } from "@/utils/supabaseSever";

const getRandomSongs = async (): Promise<Song[]> => {
  const { data, error } = await supabase
    .from("random_songs")
    .select("*")
    .limit(6);
  if (error) console.log("error", error);
  return (data as Song[]) || [];
};

export default getRandomSongs;
