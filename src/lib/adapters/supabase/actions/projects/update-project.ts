// src/features/projects/actions/update-project.ts
"use server";

import { createServer } from "@/lib/supabase/server";

interface UpdateProjectData {
  name: string;
  address: string;
  start_date: string | null;
  end_date: string | null;
}

export async function updateProject(
  projectData: UpdateProjectData,
  projectId: string
) {
  const { name, address, start_date, end_date } = projectData;
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
