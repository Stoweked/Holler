"use client";

import { useState } from "react";
import { Paper, Center, Loader, SimpleGrid } from "@mantine/core";
import BusinessProfileForm from "./BusinessProfileForm";
import BusinessProfileView from "./BusinessProfileView";
import { useBusinessProfile } from "../hooks/useBusinessProfile";
import { PlusSignIcon, Search01Icon } from "hugeicons-react";
import OptionButton from "@/components/shared/OptionButton/OptionButton";

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
      <SimpleGrid cols={{ base: 1, xs: 2 }}>
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
      </SimpleGrid>
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
