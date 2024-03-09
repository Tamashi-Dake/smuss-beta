import { Category } from "@/types";
import { getSupabase } from "@/utils/supabaseSever";

const getCategories = async (): Promise<Category[]> => {
  const supabase = await getSupabase();
  const { data, error } = await supabase.from("categories").select("*");
  if (error) console.log("error", error);
  return (data as Category[]) || [];
};

export default getCategories;
