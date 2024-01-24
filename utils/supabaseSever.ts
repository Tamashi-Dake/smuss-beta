import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import type { Database } from "@/types_db";
export const supabase = createServerComponentClient({
  headers,
  cookies,
});
