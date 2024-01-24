import { createClient } from "@supabase/supabase-js";

// Get the environment variables from .env.local
export default createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
