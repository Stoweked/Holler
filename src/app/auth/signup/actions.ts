// stoweked/holler/Holler-main/src/app/auth/signup/actions.ts
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
    return redirect("/signup?message=Could not authenticate user");
  }

  return redirect("/signup?message=Check email to continue sign in process");
}
