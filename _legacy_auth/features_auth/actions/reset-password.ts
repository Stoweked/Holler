// src/features/auth/actions/reset-password.ts
"use server";

import { createServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function resetPassword(formData: FormData) {
  const password = formData.get("password") as string;
  const supabase = await createServer();

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { error: "Could not update password. Please try again." };
  }

  redirect(
    "/login?message=Your password has been reset successfully. Please log in."
  );
}
