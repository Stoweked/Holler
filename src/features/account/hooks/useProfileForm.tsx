// src/features/account/hooks/useProfileForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useForm, isEmail, hasLength } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { rem } from "@mantine/core";
import { CheckmarkCircle02Icon, AlertCircleIcon } from "hugeicons-react";
import dayjs from "dayjs";
import { useProfile } from "@/contexts/ProfileContext";
import { createClient } from "@/lib/supabase/client";
import { checkUsernameExists } from "@/features/auth/actions/check-username";

export function useProfileForm({
  onSaveSuccess,
}: {
  onSaveSuccess: () => void;
}) {
  const { profile, fetchProfile } = useProfile();
  const [loading, setLoading] = useState(false);
  const [emailPending, setEmailPending] = useState(false);
  const supabase = createClient();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      formName: profile?.full_name || "",
      formEmail: profile?.email || "",
      formUsername: profile?.username || "",
      formPhone: profile?.phone_number || "",
      formDob: profile?.dob ? dayjs(profile.dob).toDate() : null,
      formGender: profile?.gender || null,
      formAddress1: profile?.address1 || "",
      formAddress2: profile?.address2 || "",
      formCity: profile?.city || "",
      formState: profile?.state || "",
      formZip: profile?.zip || "",
      avatar_url: profile?.avatar_url || "",
      newAvatarFile: null as File | null,
      avatarPreviewUrl: profile?.avatar_url || "",
    },
    validate: {
      formName: hasLength({ min: 2 }, "Name must have at least 2 letters"),
      formEmail: isEmail("Invalid email"),
      formUsername: (value) =>
        value && value.length < 3
          ? "Username must be at least 3 characters"
          : null,
      formPhone: (value: string) => {
        if (value && value.replace(/\D/g, "").length !== 11) {
          return "Invalid phone number";
        }
        return null;
      },
      formZip: (value) =>
        value && value.length !== 5 ? "Invalid zip code" : null,
    },
  });

  useEffect(() => {
    // This is the key change: Only set form values if the form is not dirty.
    // This prevents the context from overwriting the user's changes, including the avatar preview.
    if (profile && !form.isDirty()) {
      form.setValues({
        formName: profile.full_name || "",
        formEmail: profile.email || "",
        formUsername: profile.username || "",
        formPhone: profile.phone_number || "",
        formDob: profile.dob ? dayjs(profile.dob).toDate() : null,
        formGender: profile.gender || null,
        formAddress1: profile.address1 || "",
        formAddress2: profile.address2 || "",
        formCity: profile.city || "",
        formState: profile.state || "",
        formZip: profile.zip || "",
        avatar_url: profile.avatar_url || "",
        newAvatarFile: null,
        avatarPreviewUrl: profile.avatar_url || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);

    // Check if username is dirty and if it exists
    if (form.isDirty("formUsername") && values.formUsername) {
      const usernameExists = await checkUsernameExists(values.formUsername);
      if (usernameExists) {
        form.setFieldError("formUsername", "Username is already taken");
        setLoading(false);
        return;
      }
    }

    let finalAvatarUrl = values.avatar_url;

    if (values.newAvatarFile) {
      const formData = new FormData();
      formData.append("file", values.newAvatarFile);

      try {
        const response = await fetch("/api/profile/avatar", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const { error } = await response.json();
          throw new Error(error || "Failed to upload avatar");
        }

        const { publicUrl } = await response.json();
        finalAvatarUrl = publicUrl;
      } catch (error) {
        setLoading(false);
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        notifications.show({
          title: "Error",
          message: errorMessage,
          color: "red",
        });
        return;
      }
    }

    const dobString = values.formDob
      ? dayjs(values.formDob).format("YYYY-MM-DD")
      : null;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        full_name: values.formName,
        username: values.formUsername || null,
        phone_number: values.formPhone || null,
        dob: dobString,
        gender: values.formGender || null,
        address1: values.formAddress1 || null,
        address2: values.formAddress2 || null,
        city: values.formCity || null,
        state: values.formState || null,
        zip: values.formZip || null,
        avatar_url: finalAvatarUrl,
      })
      .eq("id", profile?.id);

    setLoading(false);

    if (!updateError) {
      if (values.formEmail !== profile?.email) {
        setEmailPending(true);
      }
      fetchProfile();
      onSaveSuccess();
      form.resetDirty();
      notifications.show({
        title: "Profile updated",
        message: "Your profile has been updated successfully.",
        icon: (
          <CheckmarkCircle02Icon style={{ width: rem(18), height: rem(18) }} />
        ),
      });
    } else {
      notifications.show({
        title: "Error",
        message: updateError.message || "Your profile failed to update.",
        icon: <AlertCircleIcon style={{ width: rem(18), height: rem(18) }} />,
      });
    }
  };

  const handleAvatarUploadAction = (file: File | null) => {
    if (
      form.values.avatarPreviewUrl &&
      form.values.avatarPreviewUrl.startsWith("blob:")
    ) {
      URL.revokeObjectURL(form.values.avatarPreviewUrl);
    }

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      form.setFieldValue("newAvatarFile", file);
      form.setFieldValue("avatarPreviewUrl", previewUrl);
    } else {
      form.setFieldValue("newAvatarFile", null);
      form.setFieldValue("avatarPreviewUrl", profile?.avatar_url || "");
    }
  };

  return {
    form,
    loading,
    emailPending,
    handleSubmit,
    handleAvatarUploadAction,
    profile,
  };
}
