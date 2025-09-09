"use client";

import {
  Avatar,
  Button,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Center,
  Loader,
  Badge,
} from "@mantine/core";
import { Location01Icon, TelephoneIcon } from "hugeicons-react";
import { getInitials } from "@/lib/hooks/textUtils";
import { useBusinessProfile } from "../hooks/useBusinessProfile";

interface BusinessProfileViewProps {
  onEdit: () => void;
}

export default function BusinessProfileView({
  onEdit,
}: BusinessProfileViewProps) {
  const { businessProfile, userRole, loading } = useBusinessProfile();

  if (loading) {
    return (
      <Center>
        <Loader size="md" />
      </Center>
    );
  }

  const initials = getInitials(businessProfile?.business_name);

  return (
    <Stack>
      <Group align="center" justify="space-between" wrap="nowrap">
        <Group>
          <Title order={5}>Business</Title>
          {userRole && (
            <Badge variant="default" style={{ textTransform: "capitalize" }}>
              {userRole.role}
            </Badge>
          )}
        </Group>
        <Button size="compact-sm" variant="subtle" onClick={onEdit}>
          Edit
        </Button>
      </Group>
      <Group>
        <Avatar
          src={businessProfile?.avatar_url}
          color="lime"
          size="lg"
          radius="xl"
        >
          {initials}
        </Avatar>
        <Stack gap={0}>
          <Title order={3}>{businessProfile?.business_name}</Title>
          <Group gap="xs">
            <Text size="sm">{businessProfile?.email}</Text>
          </Group>
        </Stack>
      </Group>
      <SimpleGrid cols={{ base: 1, xs: 2 }} spacing="lg">
        <Group gap="sm" wrap="nowrap">
          <TelephoneIcon size={20} color="gray" />
          <Stack gap={0}>
            <Text size="sm" c="dimmed">
              Phone
            </Text>
            <Text fw={500}>
              {businessProfile?.phone_number || "Not provided"}
            </Text>
          </Stack>
        </Group>
        <Group gap="sm" wrap="nowrap">
          <Location01Icon size={20} color="gray" />
          <Stack gap={0}>
            <Text size="sm" c="dimmed">
              Address
            </Text>
            <Text fw={500}>
              {businessProfile?.address1
                ? `${businessProfile.address1}, ${businessProfile.city}, ${businessProfile.state} ${businessProfile.zip}`
                : "Not provided"}
            </Text>
          </Stack>
        </Group>
      </SimpleGrid>
    </Stack>
  );
}
