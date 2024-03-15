import { Category } from "@/types";
import { getSupabase } from "@/utils/supabaseSever";

const getCategoryInfo = async (id: string): Promise<Category> => {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();
  if (error) console.log("error", error);
  return data as Category;
};

export default getCategoryInfo;
