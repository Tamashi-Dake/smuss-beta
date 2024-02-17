import { Artist, Category, Playlist, Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadImage = (
  item: Playlist | Song | Artist | Category
): string | null => {
  const supabaseClient = useSupabaseClient();
  if (!item) return null;
  const { data: image } = supabaseClient.storage
    .from("images")
    .getPublicUrl(item.image_path);
  return image.publicUrl;
};

export default useLoadImage;
