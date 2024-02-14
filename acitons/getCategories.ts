import { Category } from "@/types";
import { supabase } from "@/utils/supabaseSever";

const getCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase.from("categories").select("*");
  if (error) console.log("error", error);
  return (data as Category[]) || [];
};

export default getCategories;
