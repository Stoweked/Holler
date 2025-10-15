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

  // **THE FIX:**
  // Instead of a complex upsert, we use a simple update.
  // We build the query to target the specific row based on the contact type.

  let query = supabase
    .from("user_contacts")
    .update({ is_favorite: !currentStatus })
    .eq("user_id", user.id);

  // Dynamically add the correct WHERE clause to find the exact contact record.
  if (contactType === ContactType.Person) {
    query = query.eq("contact_profile_id", contactId);
  } else {
    query = query.eq("contact_business_id", contactId);
  }

  const { error } = await query;

  if (error) {
    console.error("Error toggling favorite:", error);
    return { error: "Could not update favorite status." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
