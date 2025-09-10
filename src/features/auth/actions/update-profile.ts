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

  const businessName = formData.get("business_name") as string;
  let phoneNumber = formData.get("phone_number") as string | null;

  // If the phone number is an empty string, set it to null
  if (phoneNumber === "") {
    phoneNumber = null;
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      business_name: businessName,
      phone_number: phoneNumber, // This will now be null if it was empty
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
