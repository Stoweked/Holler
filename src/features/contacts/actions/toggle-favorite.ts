// src/features/contacts/actions/toggle-favorite.ts
"use server";

import { createServer } from "@/lib/supabase/server";
import { ContactType } from "../types/contact";
import { revalidatePath } from "next/cache";

export async function toggleFavorite(
  contactId: string,
  contactType: ContactType,
  currentStatus: boolean
) {
  const supabase = await createServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in." };
  }

  // Prepare the record for upsert. Since we are only favoriting existing
  // profiles or businesses, external_contact_id will be null.
  const record = {
    user_id: user.id,
    contact_profile_id: contactType === ContactType.Person ? contactId : null,
    contact_business_id:
      contactType === ContactType.Business ? contactId : null,
    external_contact_id: null,
    is_favorite: !currentStatus,
  };

  const { error } = await supabase.from("user_contacts").upsert(record, {
    // FIX: Match the 4-column unique constraint in the database
    onConflict:
      "user_id, contact_profile_id, contact_business_id, external_contact_id",
  });

  if (error) {
    console.error("Error toggling favorite:", error);
    return { error: "Could not update favorite status." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
