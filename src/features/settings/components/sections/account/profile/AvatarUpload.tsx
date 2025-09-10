// src/features/settings/components/sections/account/profile/AvatarUpload.tsx
"use client";

import { Group, Avatar, FileButton, Button, Text, Stack } from "@mantine/core";

export default function AvatarUpload({
  onFileSelect,
  avatarPreviewUrl,
  initials,
}: {
  onFileSelect: (file: File | null) => void;
  avatarPreviewUrl: string;
  initials: string;
}) {
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
