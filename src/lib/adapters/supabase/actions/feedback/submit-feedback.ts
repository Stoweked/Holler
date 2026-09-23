// src/features/feedback/actions/submit-feedback.ts
"use server";

import { createServer } from "@/lib/supabase/server";

interface SubmitFeedbackParams {
  formEmail: string;
  formRating: number;
  formMessage: string;
  formType: "feature" | "bug";
  canContact: boolean;
}

export async function submitFeedback({
  formEmail,
  formRating,
  formMessage,
  formType,
  canContact,
}: SubmitFeedbackParams) {
  const supabase = await createServer();

  const { data, error } = await supabase
    .from("feedback")
    .insert([
      {
        email: formEmail,
        rating: formRating,
        message: formMessage,
        type: formType,
        can_contact: canContact,
      },
    ])
    .select();

  if (error) {
    console.error("Error inserting feedback:", error);
    throw new Error(error.message || "Failed to submit feedback.");
  }

  return { data };
}
