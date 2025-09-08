"use client";

import { useState } from "react";
import { Paper, Center, Loader } from "@mantine/core";
import BusinessProfileForm from "./BusinessProfileForm";
import BusinessProfileView from "./BusinessProfileView";
import { useBusinessProfile } from "../hooks/useBusinessProfile";

export default function BusinessProfileCard() {
  const { businessProfile, loading } = useBusinessProfile();
  const [isEditing, setIsEditing] = useState(false);

  if (loading) {
    return (
      <Paper withBorder radius="lg" shadow="xs" p="md">
        <Center>
          <Loader size="md" />
        </Center>
      </Paper>
    );
  }

  if (!businessProfile) {
    return (
      <Paper withBorder radius="lg" shadow="xs" p="md">
        <Center>
          <p>No business profile found</p>
        </Center>
      </Paper>
    );
  }

  return (
    <Paper withBorder radius="lg" shadow="xs" p="md">
      {isEditing ? (
        <BusinessProfileForm
          onCancel={() => setIsEditing(false)}
          onSaveSuccess={() => setIsEditing(false)}
        />
      ) : (
        <BusinessProfileView onEdit={() => setIsEditing(true)} />
      )}
    </Paper>
  );
}
