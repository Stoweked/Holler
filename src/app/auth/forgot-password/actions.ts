// app/forgot-password/actions.ts
"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function requestPasswordReset(formData: FormData) {
  const email = formData.get("email") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
  });

  if (error) {
    return redirect(
      "/forgot-password?message=Could not request password reset"
    );
  }

  return redirect(
    "/forgot-password?message=Password reset link sent to your email"
  );
}
