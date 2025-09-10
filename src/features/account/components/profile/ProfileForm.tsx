// src/features/settings/components/tabs/account/profile/ProfileForm.tsx
"use client";

import {
  Button,
  Grid,
  Group,
  NativeSelect,
  Select,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
  rem,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { PatternFormat } from "react-number-format";
import { Calendar02Icon } from "hugeicons-react";
import { usStates } from "@/lib/data/usStates";
import { useProfileForm } from "@/features/account/hooks/useProfileForm";
import { getInitials } from "@/lib/hooks/textUtils";
import AvatarUpload from "@/features/settings/components/AvatarUpload";

interface ProfileFormProps {
  onCancel: () => void;
  onSaveSuccess: () => void;
}

export default function ProfileForm({
  onCancel,
  onSaveSuccess,
}: ProfileFormProps) {
  const { form, loading, handleSubmit, profile, handleAvatarUploadAction } =
    useProfileForm({
      onSaveSuccess,
    });

  return (
    <Stack>
      <Group align="center" justify="space-between" wrap="nowrap">
        <Title order={5}>Profile</Title>
        <Button size="compact-sm" variant="subtle" disabled>
          Editing
        </Button>
      </Group>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <AvatarUpload
            onFileSelect={handleAvatarUploadAction}
            avatarPreviewUrl={form.values.avatarPreviewUrl}
            initials={getInitials(profile?.full_name)}
          />

          <SimpleGrid
            cols={{ base: 1, xs: 2 }}
            spacing={{ base: "md" }}
            verticalSpacing={{ base: "md" }}
          >
            <TextInput
              required
              label="Full name"
              size="lg"
              radius="md"
              placeholder="Enter your full name"
              {...form.getInputProps("formName")}
              disabled={profile?.auth_provider === "google"}
              description={
                profile?.auth_provider === "google"
                  ? "Your name is linked to your Google account."
                  : ""
              }
              autoComplete="name"
            />
            <TextInput
              required
              label="Email"
              size="lg"
              radius="md"
              placeholder="Enter your email address"
              type="email"
              {...form.getInputProps("formEmail")}
              disabled={profile?.auth_provider === "google"}
              description={
                profile?.auth_provider === "google"
                  ? "Your email is linked to your Google account."
                  : ""
              }
              autoComplete="email"
            />
          </SimpleGrid>
          <SimpleGrid
            cols={{ base: 1, xs: 2 }}
            spacing={{ base: "md" }}
            verticalSpacing={{ base: "md" }}
          >
            <PatternFormat
              customInput={TextInput}
              label="Phone number"
              format="+1 (###) ###-####"
              mask="_"
              size="lg"
              radius="md"
              {...form.getInputProps("formPhone")}
            />
            <DateInput
              label="Date of birth"
              {...form.getInputProps("formDob")}
              placeholder="MM/DD/YYYY"
              size="lg"
              radius="md"
              valueFormat="MM/DD/YYYY"
              maxDate={new Date()}
              leftSection={
                <Calendar02Icon style={{ width: rem(16), height: rem(16) }} />
              }
              leftSectionPointerEvents="none"
            />
            <Select
              label="Gender"
              size="lg"
              radius="md"
              placeholder="Gender"
              data={["Male", "Female", "Nonbinary", "Prefer not to say"]}
              {...form.getInputProps("formGender")}
              allowDeselect
            />
          </SimpleGrid>
          <TextInput
            label="Address"
            size="lg"
            radius="md"
            placeholder="Address"
            {...form.getInputProps("formAddress1")}
            autoComplete="street-address"
          />
          <TextInput
            size="lg"
            radius="md"
            placeholder="Apartment, suite, etc. (optional)"
            {...form.getInputProps("formAddress2")}
          />
          <Grid grow gutter={{ base: "sm" }}>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <TextInput
                size="lg"
                radius="md"
                placeholder="City"
                {...form.getInputProps("formCity")}
                autoComplete="address-level2"
              />
            </Grid.Col>
            <Grid.Col span={{ base: 6, md: 4 }}>
              <NativeSelect
                size="lg"
                radius="md"
                {...form.getInputProps("formState")}
                autoComplete="address-level1"
                data={["", ...usStates]}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 6, md: 4 }}>
              <TextInput
                size="lg"
                radius="md"
                placeholder="Zip code"
                {...form.getInputProps("formZip")}
                autoComplete="postal-code"
              />
            </Grid.Col>
          </Grid>
        </Stack>
        <Group gap="xs" justify="flex-end" pt="md">
          <Button variant="subtle" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
            disabled={!form.isDirty() && !form.values.newAvatarFile}
          >
            Save
          </Button>
        </Group>
      </form>
    </Stack>
  );
}
