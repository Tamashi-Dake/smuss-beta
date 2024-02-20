import { Category } from "@/types";
import { supabase } from "@/utils/supabaseSever";

const getSelectCategory = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name")
    .order("name", { ascending: true });
  if (error) console.log("error", error);
  return (data as Category[]) || [];
};

export default getSelectCategory;
