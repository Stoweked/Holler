// src/features/projects/actions/update-project.ts
"use server";

import { createServer } from "@/lib/supabase/server";

export async function updateProject(formData: FormData, projectId: string) {
  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const start_date = formData.get("start_date") as string | null;
  const end_date = formData.get("end_date") as string | null;
  const supabase = await createServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to update a project." };
  }

  const { data, error } = await supabase
    .from("projects")
    .update({
      name,
      address,
      start_date,
      end_date,
      updated_at: new Date().toISOString(),
    })
    .eq("id", projectId)
    .select()
    .single();

  if (error) {
    console.error("Error updating project:", error);
    return { error: "Could not update project. Please try again." };
  }

  return { success: true, data };
}
