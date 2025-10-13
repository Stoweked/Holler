// src/features/contacts/actions/invite-contact.ts
"use server";

import { createServer } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface InviteContactParams {
  name: string;
  email?: string;
  phone?: string;
}

export async function inviteContact(params: InviteContactParams) {
  const { name, email, phone } = params;
  const supabase = await createServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to invite contacts." };
  }

  // 1. Create the external contact record
  const { data: externalContact, error: externalError } = await supabase
    .from("external_contacts")
    .insert({
      inviter_id: user.id,
      name,
      email: email || null,
      phone: phone || null,
    })
    .select()
    .single();

  if (externalError) {
    console.error("Error creating external contact:", externalError);
    return { error: "Could not create invitation." };
  }

  // 2. Link this external contact to the current user's contact list
  const { error: userContactError } = await supabase
    .from("user_contacts")
    .insert({
      user_id: user.id,
      external_contact_id: externalContact.id,
    });

  if (userContactError) {
    console.error("Error linking external contact:", userContactError);
    return { error: "Could not add invited contact to your list." };
  }

  // TODO: Trigger an email or SMS with the invitation link/token
  // await sendInvitationEmail(email, externalContact.invite_token);

  revalidatePath("/dashboard");
  return { success: true, data: externalContact };
}
