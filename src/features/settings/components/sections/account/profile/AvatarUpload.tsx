// src/features/settings/components/tabs/account/profile/AvatarUpload.tsx
"use client";

import { Group, Avatar, FileButton, Button, Text, Stack } from "@mantine/core";
import { useProfile } from "@/contexts/ProfileContext";
import { getInitials } from "@/lib/hooks/getInitials";

export default function AvatarUpload({
  onFileSelect,
  avatarPreviewUrl,
}: {
  onFileSelect: (file: File | null) => void;
  avatarPreviewUrl: string;
}) {
  const { profile } = useProfile();
  const initials = getInitials(profile?.full_name);

  return (
    <Group>
      <Avatar src={avatarPreviewUrl} color="lime" size="lg" radius="xl">
        {initials}
      </Avatar>
      <Stack gap={8}>
        <FileButton onChange={onFileSelect} accept="image/png,image/jpeg">
          {(props) => (
            <Button {...props} size="compact-md" variant="light">
              Upload new picture
            </Button>
          )}
        </FileButton>
        <Text size="xs" c="dimmed">
          Upload a PNG or JPG
        </Text>
      </Stack>
    </Group>
  );
}
