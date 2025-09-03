"use client";

import { useEffect, useState } from "react";
import { PatternFormat } from "react-number-format";
import {
  Avatar,
  Button,
  Grid,
  Group,
  NativeSelect,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
  ThemeIcon,
} from "@mantine/core";
import { hasLength, isEmail, useForm } from "@mantine/form";
import { Location01Icon, UserIcon, Call02Icon } from "hugeicons-react";
import { usStates } from "@/lib/data/usStates";
import { useProfile } from "@/contexts/ProfileContext";
import { getInitials } from "@/lib/hooks/getInitials";

export default function AccountCard() {
  const { profile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      formName: profile?.full_name || "",
      formEmail: profile?.email || "",
      formPhone: profile?.phone_number || "",
      formAddress1: profile?.address1 || "",
      formAddress2: profile?.address2 || "",
      formCity: profile?.city || "",
      formState: profile?.state || "",
      formZip: profile?.zip || "",
    },
    validate: {
      formName: hasLength({ min: 2 }, "Name must have at least 2 letters"),
      formEmail: isEmail("Invalid email"),
      formPhone: (value: string) => {
        if (value && value.replace(/\D/g, "").length !== 10) {
          return "Invalid phone number";
        }
        return null;
      },
      formZip: (value) =>
        value && value.length !== 5 ? "Invalid zip code" : null,
    },
  });

  useEffect(() => {
    if (profile) {
      form.setValues({
        formName: profile.full_name || "",
        formEmail: profile.email || "",
        formPhone: profile.phone_number || "",
        formAddress1: profile.address1 || "",
        formAddress2: profile.address2 || "",
        formCity: profile.city || "",
        formState: profile.state || "",
        formZip: profile.zip || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const toggleEditingMode = () => {
    setIsEditing(!isEditing);
  };

  const cancelUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    form.reset();
    toggleEditingMode();
    setLoading(false);
  };

  return (
    <>
      <Paper withBorder radius="lg" shadow="xs" p="md">
        {!isEditing ? (
          /* Initial state */
          <Stack>
            <Group align="center" justify="space-between" wrap="nowrap">
              <Group wrap="nowrap" gap="xs">
                <ThemeIcon size="sm" color="gray" variant="default" radius="xl">
                  <UserIcon style={{ width: "70%", height: "70%" }} />
                </ThemeIcon>
                <Title order={5} lh={1.2} style={{ letterSpacing: "-0.5px" }}>
                  Profile
                </Title>
              </Group>

              <Button
                size="compact-sm"
                variant="subtle"
                onClick={toggleEditingMode}
              >
                Edit
              </Button>
            </Group>

            <Group>
              <Avatar
                src={profile?.avatar_url}
                color="lime"
                size="lg"
                radius="xl"
              >
                {getInitials(profile?.full_name)}
              </Avatar>
              <Stack gap={0}>
                <Title order={3}>{profile?.full_name}</Title>
                <Text c="dimmed">{profile?.email}</Text>
              </Stack>
            </Group>
            <SimpleGrid cols={{ base: 1, xs: 2 }} spacing="lg">
              <Group gap="sm" wrap="nowrap">
                <Call02Icon size={20} color="gray" />
                <Stack gap={0}>
                  <Text size="sm" c="dimmed">
                    Phone
                  </Text>
                  <Text fw={500}>
                    {profile?.phone_number || "Not provided"}
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
                    {profile?.address1
                      ? `${profile.address1}, ${profile.city}, ${profile.state} ${profile.zip}`
                      : "Not provided"}
                  </Text>
                </Stack>
              </Group>
            </SimpleGrid>
          </Stack>
        ) : (
          /* Editing state */
          <Stack>
            <Group align="center" justify="space-between" wrap="nowrap">
              <Group wrap="nowrap" gap="xs">
                <ThemeIcon size="sm" color="gray" variant="default" radius="xl">
                  <UserIcon style={{ width: "70%", height: "70%" }} />
                </ThemeIcon>
                <Title order={5}>Profile</Title>
              </Group>
              <Button size="compact-sm" variant="subtle" disabled>
                Editing
              </Button>
            </Group>

            <form>
              <Stack>
                <SimpleGrid
                  cols={{ base: 1, xs: 2 }}
                  spacing={{ base: "md" }}
                  verticalSpacing={{ base: "md" }}
                >
                  <TextInput
                    required
                    label="Full name"
                    size="md"
                    placeholder="Enter your full name"
                    {...form.getInputProps("formName")}
                    autoComplete="name"
                  />

                  <TextInput
                    required
                    label="Email"
                    size="md"
                    placeholder="Enter your email address"
                    type="email"
                    {...form.getInputProps("formEmail")}
                    autoComplete="email"
                  />
                </SimpleGrid>

                {/* Phone */}
                <PatternFormat
                  customInput={TextInput}
                  label="Phone number"
                  format="+1 (###) ###-####"
                  mask="_"
                  size="md"
                  {...form.getInputProps("formPhone")}
                />

                {/* Address */}
                <TextInput
                  label="Address"
                  size="md"
                  placeholder="Address"
                  {...form.getInputProps("formAddress1")}
                  autoComplete="street-address"
                />

                <TextInput
                  size="md"
                  placeholder="Apartment, suite, etc. (optional)"
                  {...form.getInputProps("formAddress2")}
                />

                <Grid grow gutter={{ base: "sm" }}>
                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <TextInput
                      size="md"
                      placeholder="City"
                      {...form.getInputProps("formCity")}
                      autoComplete="address-level2"
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 6, md: 4 }}>
                    <NativeSelect
                      size="md"
                      {...form.getInputProps("formState")}
                      autoComplete="address-level1"
                      data={["", ...usStates]}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 6, md: 4 }}>
                    <TextInput
                      size="md"
                      placeholder="Zip code"
                      {...form.getInputProps("formZip")}
                      autoComplete="postal-code"
                    />
                  </Grid.Col>
                </Grid>
              </Stack>

              <Group gap="xs" justify="flex-end" pt="md">
                <Button variant="subtle" onClick={cancelUpdate}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  loading={loading}
                  disabled={!form.isDirty()}
                >
                  Save
                </Button>
              </Group>
            </form>
          </Stack>
        )}
      </Paper>
    </>
  );
}
