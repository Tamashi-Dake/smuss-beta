import { getSupabase } from "@/utils/supabaseSever";

const getTopArtists = async (): Promise<any[]> => {
  const supabase = await getSupabase();
  //   get all artists from top_artists table, join with artist table
  const { data, error } = await supabase
    .from("top_artists")
    .select("*, artist(*)");
  if (error) console.log("error", error);
  return (data as any[]) || [];
};

export default getTopArtists;
