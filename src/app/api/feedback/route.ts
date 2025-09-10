// src/app/api/feedback/route.ts
import { createServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { formEmail, formRating, formMessage, formType, canContact } =
    await req.json();
  const supabase = await createServer();

  const { data, error } = await supabase
    .from("feedback")
    .insert([
      {
        email: formEmail,
        rating: formRating,
        message: formMessage,
        type: formType,
        can_contact: canContact,
      },
    ])
    .select();

  if (error) {
    console.error("Error inserting feedback:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
