// src/features/settings/components/sections/business/BusinessProfileForm.tsx
"use client";

import {
  Button,
  Grid,
  Group,
  NativeSelect,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { PatternFormat } from "react-number-format";
import { usStates } from "@/lib/data/usStates";
import { useProfileForm } from "@/features/settings/hooks/useProfileForm";
import AvatarUpload from "@/features/settings/components/sections/account/profile/AvatarUpload";

interface ProfileFormProps {
  onCancel: () => void;
  onSaveSuccess: () => void;
}

export default function BusinessProfileForm({
  onCancel,
  onSaveSuccess,
}: ProfileFormProps) {
  const { form, loading, handleSubmit, handleAvatarUploadAction } =
    useProfileForm({
      onSaveSuccess,
    });

  return (
    <Stack>
      <Group align="center" justify="space-between" wrap="nowrap">
        <Title order={5}>Business Profile</Title>
        <Button size="compact-sm" variant="subtle" disabled>
          Editing
        </Button>
      </Group>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <AvatarUpload
            onFileSelect={handleAvatarUploadAction}
            avatarPreviewUrl={form.values.avatarPreviewUrl}
          />

          <SimpleGrid
            cols={{ base: 1, xs: 2 }}
            spacing={{ base: "md" }}
            verticalSpacing={{ base: "md" }}
          >
            <TextInput
              required
              label="Business name"
              size="lg"
              radius="md"
              placeholder="Enter your business name"
              {...form.getInputProps("formName")}
              autoComplete="organization"
            />
            <TextInput
              required
              label="Email"
              size="lg"
              radius="md"
              placeholder="Enter your email address"
              type="email"
              {...form.getInputProps("formEmail")}
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
