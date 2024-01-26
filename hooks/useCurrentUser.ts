"use client";
import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import supabaseClient from "@/utils/supabaseClient";

export default function useCurrentUser() {
  const { user } = useUser();
  const [account, setAccount] = useState<any>([]);

  useEffect(() => {
    const getUser = async () => {
      if (user?.id) {
        const { data } = await supabaseClient
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();
        setAccount(data);
      }
    };

    getUser();
  }, [user]);
  return account;
}
