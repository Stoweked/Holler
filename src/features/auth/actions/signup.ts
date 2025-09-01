// src/features/auth/actions/initial-signup.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  const email = formData.get("email") as string;
  const supabase = await createClient();

  // Log out any existing user to ensure a fresh sign-up flow
  await supabase.auth.signOut();

  // Redirect to the multi-step page to collect more info
  return redirect(`/signup/multi-step?email=${encodeURIComponent(email)}`);
}
