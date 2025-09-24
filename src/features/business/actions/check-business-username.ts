// src/features/auth/actions/check-business-username.ts
"use server";

import { createServer } from "@/lib/supabase/server";

export async function checkBusinessUsernameExists(
  username: string
): Promise<boolean> {
  const supabase = await createServer();

  const { data, error } = await supabase.rpc("business_username_exists", {
    username_text: username,
  });

  if (error) {
    console.error("Error checking business username:", error.message);
    // Throw an error that the next action can catch
    throw new Error(
      "A server error occurred while checking the business username."
    );
  }

  return data;
}
