// src/app/api/profile/update/route.ts
import { createServer } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const {
    formName,
    formEmail,
    formPhone,
    formDob,
    formGender,
    formAddress1,
    formAddress2,
    formCity,
    formState,
    formZip,
  } = body;

  const supabase = await createServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: { message: "Unauthorized" } },
      { status: 401 }
    );
  }

  const { data: authData } = await supabase.auth.getUser();
  let authUpdateData = null;
  let authUpdateError = null;

  if (authData?.user?.app_metadata?.provider !== "google") {
    const { data, error } = await supabase.auth.updateUser({
      data: { full_name: formName },
      email: formEmail,
    });
    authUpdateData = data;
    authUpdateError = error;
  }

  const { data: userProfile, error: profileUpdateError } = await supabase
    .from("profiles")
    .update({
      phone_number: formPhone || null,
      dob: formDob || null,
      gender: formGender || null,
      address1: formAddress1 || null,
      address2: formAddress2 || null,
      city: formCity || null,
      state: formState || null,
      zip: formZip || null,
    })
    .eq("id", user.id)
    .select()
    .single();

  if (authUpdateError || profileUpdateError) {
    return NextResponse.json(
      {
        data: authUpdateData,
        userProfile,
        error: authUpdateError || profileUpdateError,
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    data: authUpdateData,
    userProfile,
    error: null,
    profileUpdateError: null,
  });
}
