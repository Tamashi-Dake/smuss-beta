import { useEffect, useState } from "react";
import supabaseClient from "@/utils/supabaseClient";

export default function useUsers() {
  const [account, setAccount] = useState<any>([]);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabaseClient.from("users").select("*");
      setAccount(data);
    };

    getUser();
  }, []);

  return account;
}
