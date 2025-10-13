"use server";

import { createServer } from "@/lib/supabase/server";
import { ContactType } from "../types/contact";

export async function updateContactProjects(
  contactId: string,
  contactType: ContactType,
  projectIds: string[]
) {
  const supabase = await createServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to update contacts." };
  }

  const targetTable =
    contactType === ContactType.Person
      ? "project_profiles"
      : "project_businesses";
  const targetContactIdColumn =
    contactType === ContactType.Person ? "profile_id" : "business_id";

  // 1. Delete existing associations for this contact
  const { error: deleteError } = await supabase
    .from(targetTable)
    .delete()
    .eq(targetContactIdColumn, contactId);

  if (deleteError) {
    console.error(`Error deleting from ${targetTable}:`, deleteError);
    return { error: `Could not update project associations.` };
  }

  // 2. Insert new associations if there are any
  if (projectIds.length > 0) {
    const recordsToInsert = projectIds.map((projectId) => ({
      project_id: projectId,
      [targetContactIdColumn]: contactId,
    }));

    const { error: insertError } = await supabase
      .from(targetTable)
      .insert(recordsToInsert);

    if (insertError) {
      console.error(`Error inserting into ${targetTable}:`, insertError);
      return { error: `Could not update project associations.` };
    }
  }

  return { success: true };
}
