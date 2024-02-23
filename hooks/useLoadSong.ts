import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadSong = (item: Song): string | null => {
  const supabaseClient = useSupabaseClient();
  if (!item) return null;
  const { data: image } = supabaseClient.storage
    .from("songs")
    .getPublicUrl(item.song_path);
  return image.publicUrl;
};

export default useLoadSong;
