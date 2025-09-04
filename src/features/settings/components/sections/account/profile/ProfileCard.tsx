// src/features/settings/components/tabs/account/profile/ProfileCard.tsx

"use client";

import { useState } from "react";
import { Paper } from "@mantine/core";
import { useProfile } from "@/contexts/ProfileContext";
import ProfileView from "./ProfileView";
import ProfileForm from "./ProfileForm";

export default function AccountCard() {
  const { profile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [emailPending, setEmailPending] = useState(false);

  const handleSaveSuccess = () => {
    // Check if email was changed to update pending status
    // This logic can be refined in the useProfileForm hook
    setIsEditing(false);
  };

  return (
    <Paper withBorder radius="lg" shadow="xs" p="md">
      {isEditing ? (
        <ProfileForm
          onCancel={() => setIsEditing(false)}
          onSaveSuccess={handleSaveSuccess}
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
