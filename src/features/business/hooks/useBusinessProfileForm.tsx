"use client";

import { useState, useEffect } from "react";
import { useForm, isEmail, hasLength } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { rem } from "@mantine/core";
import { CheckmarkCircle02Icon, AlertCircleIcon } from "hugeicons-react";
import { createClient } from "@/lib/supabase/client";
import { useBusinessProfile } from "./useBusinessProfile";

export function useBusinessProfileForm({
  onSaveSuccess,
}: {
  onSaveSuccess: () => void;
}) {
  const { businessProfile, userRole, fetchBusinessProfile } =
    useBusinessProfile();
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      formName: businessProfile?.business_name || "",
      formEmail: businessProfile?.email || "",
      formPhone: businessProfile?.phone_number || "",
      formAddress1: businessProfile?.address1 || "",
      formAddress2: businessProfile?.address2 || "",
      formCity: businessProfile?.city || "",
      formState: businessProfile?.state || "",
      formZip: businessProfile?.zip || "",
      avatar_url: businessProfile?.avatar_url || "",
      newAvatarFile: null as File | null,
      avatarPreviewUrl: businessProfile?.avatar_url || "",
    },
    validate: {
      formName: hasLength(
        { min: 2 },
        "Business name must have at least 2 letters"
      ),
      formEmail: isEmail("Invalid email"),
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
    if (businessProfile && !form.isDirty()) {
      form.setValues({
        formName: businessProfile.business_name || "",
        formEmail: businessProfile.email || "",
        formPhone: businessProfile.phone_number || "",
        formAddress1: businessProfile.address1 || "",
        formAddress2: businessProfile.address2 || "",
        formCity: businessProfile.city || "",
        formState: businessProfile.state || "",
        formZip: businessProfile.zip || "",
        avatar_url: businessProfile.avatar_url || "",
        newAvatarFile: null,
        avatarPreviewUrl: businessProfile.avatar_url || "",
      });
    }
  }, [businessProfile]);

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
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

    const { error: updateError } = await supabase
      .from("businesses")
      .update({
        business_name: values.formName,
        email: values.formEmail,
        phone_number: values.formPhone || null,
        address1: values.formAddress1 || null,
        address2: values.formAddress2 || null,
        city: values.formCity || null,
        state: values.formState || null,
        zip: values.formZip || null,
        avatar_url: finalAvatarUrl,
      })
      .eq("id", businessProfile?.id);

    setLoading(false);

    if (!updateError) {
      fetchBusinessProfile();
      onSaveSuccess();
      form.resetDirty();
      notifications.show({
        title: "Business profile updated",
        message: "Your business profile has been updated successfully.",
        icon: (
          <CheckmarkCircle02Icon style={{ width: rem(18), height: rem(18) }} />
        ),
      });
    } else {
      notifications.show({
        title: "Error",
        message:
          updateError.message || "Your business profile failed to update.",
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
      form.setFieldValue("avatarPreviewUrl", businessProfile?.avatar_url || "");
    }
  };

  return {
    form,
    loading,
    handleSubmit,
    handleAvatarUploadAction,
    userRole: userRole?.role,
  };
}
