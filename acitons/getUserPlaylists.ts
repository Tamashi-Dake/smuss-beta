import { Playlist } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getUserPlaylists = async (): Promise<Playlist[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    console.log("No session data found");
    return [];
  }

  // TODO: sessionData.session?.user.id returns undefined when user just login, might need to add loading state to load the user session first.
  const { data, error } = await supabase
    .from("playlist")
    .select("*")
    .eq("user_id", sessionData.session?.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
    console.log("No playlists found for this user.");
  }

  return (data as any) || [];
};

export default getUserPlaylists;
