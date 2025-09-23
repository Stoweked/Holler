// src/features/projects/actions/archive-project.ts
"use server";

import { createServer } from "@/lib/supabase/server";

export async function archiveProject(projectId: string) {
  const supabase = await createServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to archive a project." };
  }

  const { error } = await supabase
    .from("projects")
    .update({ archived: true })
    .eq("id", projectId);

  if (error) {
    console.error("Error archiving project:", error);
    return { error: "Could not archive project. Please try again." };
  }

  return { success: true };
}
