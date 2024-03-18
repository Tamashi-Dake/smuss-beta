import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { Record } from "@/types";

const useFetchCategories = ({ isOpen }: { isOpen: boolean }) => {
  const [categories, setCategories] = useState<Record[]>([]);
  const { supabaseClient } = useSessionContext();
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabaseClient
        .from("categories")
        .select("id, name");
      if (error) {
        return toast.error(error.message);
      }
      setCategories(data || []);
    };
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen, supabaseClient]);
  return useMemo(() => ({ categories }), [categories]);
};

export default useFetchCategories;
