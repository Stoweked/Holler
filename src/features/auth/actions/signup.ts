// src/features/auth/actions/signup.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { checkEmailExists } from "./check-email";

export async function signup(formData: FormData) {
  const email = formData.get("email") as string;
  const supabase = await createClient();

  const emailExists = await checkEmailExists(email);

  if (emailExists) {
    // If the email exists, return an error object.
    // This stops execution and sends the error back to the form.
    return {
      error: "An account with this email already exists.",
    };
  }

  // If the email does NOT exist, sign out any lingering session
  // and then perform the redirect.
  await supabase.auth.signOut();

  // This will correctly throw the NEXT_REDIRECT error and navigate the user.
  redirect(`/signup/multi-step?email=${encodeURIComponent(email)}`);
}
