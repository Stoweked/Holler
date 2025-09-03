"use client";

import {
  Button,
  Group,
  Stack,
  TextInput,
  Title,
  Text,
  Avatar,
  SegmentedControl,
  Center,
  rem,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Profile } from "@/features/profile/types/profile";
import { useMantineColorScheme, useComputedColorScheme } from "@mantine/core";
import { logout } from "@/features/auth/actions/logout";
import { Moon01Icon, Sun01Icon } from "hugeicons-react";

interface AccountSettingsProps {
  profile: Profile;
  closeDrawer: () => void;
}

export function AccountSettings({
  profile,
  closeDrawer,
}: AccountSettingsProps) {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const form = useForm({
    initialValues: {
      fullName: profile?.full_name || "",
      businessName: profile?.business_name || "",
    },
    validate: {
      fullName: (value) =>
        value.trim().length < 2 ? "Full name is required" : null,
    },
  });

  const getInitials = (name: string | undefined) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <Stack gap="xl">
      <Group>
        <Avatar color="lime" size={80} radius="50%">
          <Title order={1}>{getInitials(profile.full_name)}</Title>
        </Avatar>
        <Stack gap={0}>
          <Title order={3}>{profile.full_name}</Title>
          <Text c="dimmed">{profile.email}</Text>
        </Stack>
      </Group>

      <Stack gap="lg">
        <TextInput
          required
          label="Full Name"
          size="lg"
          radius="md"
          {...form.getInputProps("fullName")}
        />
        <TextInput
          label="Business Name"
          size="lg"
          radius="md"
          {...form.getInputProps("businessName")}
        />
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={closeDrawer} size="lg">
            Cancel
          </Button>
          <Button type="submit" size="lg" disabled={!form.isDirty()}>
            Save Changes
          </Button>
        </Group>
      </Stack>

      <Divider />
      <Stack gap="xl">
        <Stack gap="sm">
          <Title order={3}>Appearance</Title>
          <Text c="dimmed" size="sm">
            Customize the look and feel of your workspace.
          </Text>
        </Stack>
        <SegmentedControl
          value={computedColorScheme}
          onChange={(value) =>
            setColorScheme(value as "light" | "dark" | "auto")
          }
          data={[
            {
              value: "light",
              label: (
                <Center>
                  <Sun01Icon style={{ width: rem(16), height: rem(16) }} />
                  <span>Light</span>
                </Center>
              ),
            },
            {
              value: "dark",
              label: (
                <Center>
                  <Moon01Icon style={{ width: rem(16), height: rem(16) }} />
                  <span>Dark</span>
                </Center>
              ),
            },
          ]}
          fullWidth
          size="lg"
        />
      </Stack>
      <Divider />
      <Stack gap="xl">
        <Stack gap="sm">
          <Title order={3}>Security</Title>
          <Text c="dimmed" size="sm">
            Manage your account security settings.
          </Text>
        </Stack>

        <Stack>
          <Group justify="space-between">
            <Stack gap={0}>
              <Text fw={500}>Reset Password</Text>
              <Text c="dimmed" size="sm">
                Receive a link to reset your password via email.
              </Text>
            </Stack>
            <Button variant="default">Send Link</Button>
          </Group>

          <Group justify="space-between">
            <Stack gap={0}>
              <Text fw={500}>Log Out</Text>
              <Text c="dimmed" size="sm">
                End your current session on this device.
              </Text>
            </Stack>
            <Button variant="light" color="red" onClick={() => logout()}>
              Log Out
            </Button>
          </Group>
        </Stack>
      </Stack>
    </Stack>
  );
}
