// src/features/account/components/profile/ProfileCard.tsx
"use client";

import { useState } from "react";
import { Paper } from "@mantine/core";
import ProfileView from "./ProfileView";
import ProfileForm, { ProfileFormValues } from "./ProfileForm";
import { useProfileForm } from "../../hooks/useProfileForm";
import { useProfile } from "@/features/account/contexts/ProfileContext";

export default function ProfileCard() {
  const { profile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);

  const {
    form,
    loading,
    emailPending,
    handleSubmit,
    handleAvatarUploadAction,
  } = useProfileForm();

  const handleSaveSuccess = async (values: ProfileFormValues) => {
    await handleSubmit(values);
    // This check ensures we only exit edit mode if the form is now valid
    if (Object.keys(form.errors).length === 0) {
      setIsEditing(false);
    }
  };

  return (
    <Paper withBorder radius="lg" shadow="xs" p="md">
      {isEditing ? (
        <ProfileForm
          form={form}
          loading={loading}
          handleSubmit={handleSaveSuccess}
          handleAvatarUploadAction={handleAvatarUploadAction}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <ProfileView
          profile={profile}
          emailPending={emailPending}
          onEdit={() => setIsEditing(true)}
        />
      )}
    </Paper>
  );
}
