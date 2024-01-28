"use client";

import useUsers from "@/hooks/useUsers";
import supabaseClient from "@/utils/supabaseClient";
import { useEffect } from "react";

const Table = () => {
  const user = useUsers();
  useEffect(() => {
    const getPosts = async () => {
      const { data } = await supabaseClient.from("posts").select("*");
      console.log(data);
    };

    getPosts();
  }, []);
  return (
    <>
      table
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
};

export default Table;
