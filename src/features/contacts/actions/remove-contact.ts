// src/features/contacts/actions/remove-contact.ts
"use server";

import { createServer } from "@/lib/supabase/server";
import { ContactType } from "../types/contact";
import { revalidatePath } from "next/cache";

export async function removeContact(
  contactId: string,
  contactType: ContactType
) {
  const supabase = await createServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to remove contacts." };
  }

  let query = supabase.from("user_contacts").delete().eq("user_id", user.id);

  // Add the correct filter based on contact type
  if (contactType === ContactType.Person) {
    query = query.eq("contact_profile_id", contactId);
  } else {
    query = query.eq("contact_business_id", contactId);
  }

  const { error } = await query;

  if (error) {
    console.error("Error removing contact:", error);
    return { error: "Could not remove contact." };
  }

  // Revalidate the path to potentially update server-side caches if needed
  revalidatePath("/dashboard"); // Or whichever path displays contacts
  return { success: true };
}
