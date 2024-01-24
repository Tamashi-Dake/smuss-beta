import { redirect, useRouter } from "next/navigation";
import React from "react";
import { supabase } from "@/utils/supabaseSever";

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
