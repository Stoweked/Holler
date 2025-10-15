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

  // Step 1: Check if the contact relationship already exists.
  let query = supabase
    .from("user_contacts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id);

  if (contactType === ContactType.Person) {
    query = query.eq("contact_profile_id", contactId);
  } else {
    query = query.eq("contact_business_id", contactId);
  }

  const { count, error: checkError } = await query;

  if (checkError) {
    console.error("Error checking for existing contact:", checkError);
    return { error: "Could not add contact." };
  }

  // If the count is greater than 0, the contact already exists. We can just exit.
  if (count !== null && count > 0) {
    console.log("Contact relationship already exists. No action needed.");
    return { success: true };
  }

  // Step 2: If the contact does not exist, insert it.
  const recordToInsert = {
    user_id: user.id,
    contact_profile_id: contactType === ContactType.Person ? contactId : null,
    contact_business_id:
      contactType === ContactType.Business ? contactId : null,
  };

  const { error: insertError } = await supabase
    .from("user_contacts")
    .insert(recordToInsert);

  if (insertError) {
    console.error("Error inserting new contact:", insertError);
    return { error: "Could not add contact to your list." };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
