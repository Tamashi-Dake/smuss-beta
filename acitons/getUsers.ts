import { UserDetails } from "@/types";
import { supabase } from "@/utils/supabaseSever";

const getUsersDetails = async (): Promise<UserDetails[]> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("full_name", { ascending: true });
  if (error) console.log("error", error);
  return (data as UserDetails[]) || [];
};

export default getUsersDetails;
