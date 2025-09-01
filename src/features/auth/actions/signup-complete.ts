// src/features/auth/actions/signup-complete.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signupComplete(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("full_name") as string;
  const businessName = formData.get("business_name") as string;
  let phoneNumber = formData.get("phone_number") as string | null;

  // If the phone number is an empty string, set it to null
  if (phoneNumber === "") {
    phoneNumber = null;
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: signUpError,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (signUpError) {
    console.error("Supabase signup error:", signUpError.message);
    return redirect(`/signup?error=${encodeURIComponent(signUpError.message)}`);
  }

  if (user) {
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        business_name: businessName,
        phone_number: phoneNumber,
      })
      .eq("id", user.id);

    if (profileError) {
      console.error("Error updating profile:", profileError);
      return redirect(
        `/signup/multi-step?email=${encodeURIComponent(
          email
        )}&error=${encodeURIComponent(profileError.message)}`
      );
    }
  }

  return redirect("/dashboard");
}
