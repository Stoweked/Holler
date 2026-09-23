// src/features/projects/actions/create-project.ts
"use server";

import { createServer } from "@/lib/supabase/server";

export async function createProject(formData: FormData) {
  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const start_date = formData.get("start_date") as string | null;
  const end_date = formData.get("end_date") as string | null;
  const supabase = await createServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to create a project." };
  }

  const { data, error } = await supabase
    .from("projects")
    .insert([
      {
        name,
        address,
        start_date: start_date,
        end_date: end_date,
        user_id: user.id,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating project:", error);
    return { error: "Could not create project. Please try again." };
  }

  return { success: true, data };
}
