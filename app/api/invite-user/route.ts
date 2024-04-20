import supabaseClient from "@/utils/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(request: Request, response: Response) {
  try {
    const { email } = await request.json();
    const { data, error } = await supabaseClient.auth.admin.inviteUserByEmail(
      email
    );

    if (error) {
      console.error(error);
    }

    return NextResponse.json({ message: "Email sent" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
