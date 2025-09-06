// src/features/settings/components/sections/business/BusinessProfileCard.tsx
"use client";

import { useState } from "react";
import { Paper } from "@mantine/core";
import { useProfile } from "@/contexts/ProfileContext";
import BusinessProfileForm from "./BusinessProfileForm";
import BusinessProfileView from "./BusinessProfileView";

export default function BusinessProfileCard() {
  const { profile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Paper withBorder radius="lg" shadow="xs" p="md">
      {isEditing ? (
        <BusinessProfileForm
          onCancel={() => setIsEditing(false)}
          onSaveSuccess={() => setIsEditing(false)}
        />
      ) : (
        <BusinessProfileView
          profile={profile}
          onEdit={() => setIsEditing(true)}
        />
      )}
    </Paper>
  );
}
