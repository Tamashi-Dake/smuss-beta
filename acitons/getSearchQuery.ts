import { Playlist } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getPlaylists from "./getPlaylists";

const getSearchResult = async (query: string): Promise<Playlist[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  // TODO: Add search by name of artist, song and playlist.
  // If no query, return all playlists (for now)
  if (!query) {
    const allPlaylists = await getPlaylists();
    return allPlaylists;
  }

  const { data, error } = await supabase
    .from("playlist")
    .select("*")
    .ilike("name", `%${query}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return (data as any) || [];
};

export default getSearchResult;
