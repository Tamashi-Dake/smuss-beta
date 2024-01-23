import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect, useRouter } from "next/navigation";
import { headers, cookies } from "next/headers";
import React from "react";
import { supabase } from "@/untils/supabaseSever";
import toast from "react-hot-toast";

const DashboardPage: React.FC = async () => {
  const { data: user } = await supabase.from("users").select("*").single();
  if (user.role !== "admin") {
    redirect("/");
  }
  return (
    <div>
      <h1>Hello,admin world!</h1>
    </div>
  );
};

export default DashboardPage;
