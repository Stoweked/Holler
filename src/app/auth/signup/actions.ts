//src/app/auth/signup/actions.ts
"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    // Log the specific error to your server console for debugging
    console.error("Supabase signup error:", error.message);
    return redirect("/signup?message=Could not authenticate user");
  }

  // Redirect to a page that tells the user to check their email.
  return redirect("/signup?message=Check email to continue sign in process");
}
