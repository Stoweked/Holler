"use client";

import { useState } from "react";
import { Paper, Center, Loader, Group } from "@mantine/core";
import BusinessProfileForm from "./BusinessProfileForm";
import BusinessProfileView from "./BusinessProfileView";
import { useBusinessProfile } from "../hooks/useBusinessProfile";
import OptionButton from "@/components/shared/OptionButton/OptionButton";
import { PlusSignIcon, Search01Icon } from "hugeicons-react";

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
      <Group w="100%" wrap="nowrap">
        <OptionButton
          icon={<PlusSignIcon />}
          label="Create business profile"
          onClick={() => console.log("clicked")}
        />
        <OptionButton
          icon={<Search01Icon />}
          label="Search business profiles"
          onClick={() => console.log("clicked")}
        />
      </Group>
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
