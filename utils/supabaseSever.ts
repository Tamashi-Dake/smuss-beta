import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
// import { cache } from "react";
// import "server-only";
// export const dynamic = "force-dynamic";
export const supabase = createServerComponentClient({
  cookies,
});

// attempt to fix the error: "Invariant: cookies() expects to have requestAsyncStorage -> Node.js run time"
// failed custom cache, currently get runtime error when open dynamic page

// const getsupabase = cache(async () => {
//   const cookieStore = cookies();
//   return createServerComponentClient({ cookies: () => cookieStore });
// });

// export const supabase = getsupabase();
