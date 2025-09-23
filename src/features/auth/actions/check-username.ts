// src/features/auth/actions/check-username.ts
"use server";

import { createServer } from "@/lib/supabase/server";

export async function checkUsernameExists(
  username: string,
  currentUserId?: string
): Promise<boolean> {
  const supabase = await createServer();

  let query = supabase
    .from("profiles")
    .select("id")
    .ilike("username", username); // Case-insensitive check

  // If a user ID is provided, exclude it from the search
  if (currentUserId) {
    query = query.neq("id", currentUserId);
  }

  // Finalize the query after all filters are applied
  const { data, error } = await query.limit(1).single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 means no rows were found, which is not an error here.
    throw new Error("A server error occurred while checking the username.");
  }

  return !!data;
}
