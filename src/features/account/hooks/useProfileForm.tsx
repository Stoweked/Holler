// src/features/account/hooks/useProfileForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useForm, isEmail, hasLength } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { rem } from "@mantine/core";
import { CheckmarkCircle02Icon, AlertCircleIcon } from "hugeicons-react";
import dayjs from "dayjs";
import { useProfile } from "@/contexts/ProfileContext";
import { checkUsernameExists } from "@/features/auth/actions/check-username";
import { uploadAvatar } from "../actions/upload-avatar";
import { updateProfile } from "../actions/update-profile";

export function useProfileForm() {
  const { profile, fetchProfile } = useProfile();
  const [loading, setLoading] = useState(false);
  const [emailPending, setEmailPending] = useState(false);

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
    try {
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
        const { publicUrl } = await uploadAvatar(formData);
        finalAvatarUrl = publicUrl;
      }

      const dobString = values.formDob
        ? dayjs(values.formDob).format("YYYY-MM-DD")
        : null;

      await updateProfile({
        full_name: values.formName,
        email: values.formEmail,
        username: values.formUsername || undefined,
        phone_number: values.formPhone || undefined,
        dob: dobString || undefined,
        gender: values.formGender || undefined,
        address1: values.formAddress1 || undefined,
        address2: values.formAddress2 || undefined,
        city: values.formCity || undefined,
        state: values.formState || undefined,
        zip: values.formZip || undefined,
        avatar_url: finalAvatarUrl,
      });

      if (values.formEmail !== profile?.email) {
        setEmailPending(true);
      }

      await fetchProfile();
      form.resetDirty();

      notifications.show({
        title: "Profile updated",
        message: "Your profile has been updated successfully.",
        icon: (
          <CheckmarkCircle02Icon style={{ width: rem(18), height: rem(18) }} />
        ),
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
        icon: <AlertCircleIcon style={{ width: rem(18), height: rem(18) }} />,
      });
    } finally {
      setLoading(false);
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
