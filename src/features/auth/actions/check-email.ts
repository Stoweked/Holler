// src/features/auth/actions/check-email.ts
"use server";

import { createClient } from "@/lib/supabase/server";

export async function checkEmailExists(email: string): Promise<boolean> {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("user_exists", {
    email_address: email,
  });

  if (error) {
    console.error("Error checking email:", error.message);
    // Throw an error that the next action can catch
    throw new Error("A server error occurred while checking the email.");
  }

  return data;
}
