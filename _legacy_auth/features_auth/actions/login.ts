// src/features/auth/actions/login.ts
"use server";

import { createServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createServer();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error: "Please check your credentials and try again",
    };
  }

  return redirect("/dashboard");
}
