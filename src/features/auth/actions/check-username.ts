// src/features/auth/actions/check-username.ts
"use server";

import { createServer } from "@/lib/supabase/server";

export async function checkUsernameExists(username: string): Promise<boolean> {
  const supabase = await createServer();

  const { data, error } = await supabase.rpc("username_exists", {
    username_text: username,
  });

  if (error) {
    console.error("Error checking username:", error.message);
    // Throw an error that the next action can catch
    throw new Error("A server error occurred while checking the username.");
  }

  return data;
}
