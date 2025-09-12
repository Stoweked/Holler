// src/features/auth/actions/signup-complete.ts
"use server";

import { createServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signupComplete(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("full_name") as string;
  const username = formData.get("username") as string;
  let phoneNumber = formData.get("phone_number") as string | null;

  if (phoneNumber === "") {
    phoneNumber = null;
  }

  const supabase = await createServer();

  const {
    data: { user },
    error: signUpError,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        username: username,
      },
    },
  });

  if (signUpError) {
    // Special case: If user exists, redirect to login with a message.
    if (signUpError.message.includes("User already registered")) {
      return redirect(
        `/login?message=An account with this email already exists. Please log in.`
      );
    }
    // For other errors, return an error object
    console.error("Supabase signup error:", signUpError.message);
    return { error: signUpError.message };
  }

  if (user) {
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        phone_number: phoneNumber,
        username: username,
      })
      .eq("id", user.id);

    if (profileError) {
      console.error("Error updating profile:", profileError);
      return { error: profileError.message };
    }
  }

  // Only redirect on success
  return redirect("/dashboard");
}
