"use client";

import { useEffect, useState } from "react";
import supabase from "@/utils/supabaseClient";
import { useUser } from "@/hooks/useUser";
import Header from "@/components/layout/Header";

export default function ClientPosts() {
  const user = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [account, setAccount] = useState<any>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      if (user?.user?.id) {
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.user.id)
          .single();
        setAccount(data);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [user]);
  // console.log(account.role);
  return isLoading ? (
    <p>Loading</p>
  ) : (
    <>
      <Header>A</Header>
      <pre>{/* {JSON.stringify(account, null, 2)} */}</pre>
    </>
  );
}
