// src/features/contacts/actions/add-contact.ts
"use server";

import { createServer } from "@/lib/supabase/server";
import { ContactType } from "../types/contact";
import { revalidatePath } from "next/cache";

export async function addContact(contactId: string, contactType: ContactType) {
  const supabase = await createServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to add contacts." };
  }

  // Prepare the record to insert. Only one of the contact foreign keys will be set.
  const recordToInsert = {
    user_id: user.id,
    contact_profile_id: contactType === ContactType.Person ? contactId : null,
    contact_business_id:
      contactType === ContactType.Business ? contactId : null,
  };

  // Use upsert with ignoreDuplicates to prevent errors if the contact already exists.
  // This makes the operation idempotent.
  const { error } = await supabase
    .from("user_contacts")
    .upsert(recordToInsert, { ignoreDuplicates: true });

  if (error) {
    console.error("Error adding contact:", error);
    return { error: "Could not add contact to your list." };
  }

  revalidatePath("/dashboard"); // This tells Next.js to refetch data on the client
  return { success: true };
}
