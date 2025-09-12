// src/features/auth/actions/update-profile.ts
"use server";

import { createServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function updateProfile(formData: FormData) {
  const supabase = await createServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const username = formData.get("username") as string;
  let phoneNumber = formData.get("phone_number") as string | null;

  // If the phone number is an empty string, set it to null
  if (phoneNumber === "") {
    phoneNumber = null;
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      phone_number: phoneNumber,
      username: username,
    })
    .eq("id", user.id);

  if (error) {
    console.error("Error updating profile:", error);
    return redirect(
      `/signup/multi-step?error=${encodeURIComponent(error.message)}`
    );
  }

  return redirect("/dashboard");
}
