// src/features/account/actions/update-profile.ts
"use server";

import { createServer } from "@/lib/supabase/server";
import { Profile } from "../types/account";

type UpdateProfileParams = Omit<Profile, "id" | "auth_provider">;

export async function updateProfile(profileData: Partial<UpdateProfileParams>) {
  const supabase = await createServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const {
    full_name,
    email,
    phone_number,
    dob,
    gender,
    address1,
    address2,
    city,
    state,
    zip,
  } = profileData;

  // 1. Update auth.users table if the user is not a Google OAuth user
  if (user.app_metadata.provider !== "google") {
    const { error: authUpdateError } = await supabase.auth.updateUser({
      data: { full_name: full_name },
      email: email,
    });

    if (authUpdateError) {
      console.error("Auth update error:", authUpdateError.message);
      throw new Error(authUpdateError.message);
    }
  }

  // 2. Update the public.profiles table
  const { data: updatedProfile, error: profileUpdateError } = await supabase
    .from("profiles")
    .update({
      phone_number: phone_number || null,
      dob: dob || null,
      gender: gender || null,
      address1: address1 || null,
      address2: address2 || null,
      city: city || null,
      state: state || null,
      zip: zip || null,
    })
    .eq("id", user.id)
    .select()
    .single();

  if (profileUpdateError) {
    console.error("Profile update error:", profileUpdateError.message);
    throw new Error(profileUpdateError.message);
  }

  return updatedProfile;
}
