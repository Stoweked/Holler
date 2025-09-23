// src/features/auth/actions/update-profile.ts
"use server";

import { createServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { checkUsernameExists } from "./check-username";

export async function updateProfile(formData: FormData) {
  const supabase = await createServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to update a profile." };
  }

  const username = formData.get("username") as string;
  let phoneNumber = formData.get("phone_number") as string | null;

  if (phoneNumber === "") {
    phoneNumber = null;
  }

  // Final server-side validation before attempting the update
  if (username) {
    const usernameExists = await checkUsernameExists(username, user.id);
    if (usernameExists) {
      return { error: "Username is already taken" };
    }
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
    // Check for the specific unique constraint violation error
    if (error.code === "23505") {
      // "23505" is the PostgreSQL error code for unique_violation
      return { error: "Username is already taken" };
    }
    return { error: "Could not update profile. Please try again." };
  }

  redirect("/dashboard");
}
