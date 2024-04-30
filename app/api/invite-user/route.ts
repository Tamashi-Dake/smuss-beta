import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request, response: Response) {
  const supbaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
  try {
    const { email } = await request.json();
    const { data, error } = await supbaseAdmin.auth.admin.inviteUserByEmail(
      email,
      {
        redirectTo: "/",
      }
    );

    if (error) {
      console.error(error);
      return NextResponse.json({ message: error }, { status: 500 });
    }

    return NextResponse.json({ message: "Email sent" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
