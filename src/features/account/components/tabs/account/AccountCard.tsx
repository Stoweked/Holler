"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { PatternFormat } from "react-number-format";
import {
  Avatar,
  Button,
  Grid,
  Group,
  NativeSelect,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import {
  Calendar02Icon,
  Location01Icon,
  TelephoneIcon,
  UserStar01Icon,
} from "hugeicons-react";
import { usStates } from "@/lib/data/usStates";
import { useProfile } from "@/contexts/ProfileContext";

export default function AccountCard() {
  const { profile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      fullName: profile?.full_name || "",
      businessName: profile?.business_name || "",
      phone: profile?.phone_number || "",
      dob: profile?.dob ? dayjs(profile.dob).toDate() : null,
      gender: profile?.gender || "",
      address1: profile?.address1 || "",
      address2: profile?.address2 || "",
      city: profile?.city || "",
      state: profile?.state || "",
      zip: profile?.zip || "",
    },
    validate: {
      fullName: hasLength({ min: 2 }, "Name must have at least 2 letters"),
      phone: (value) =>
        value && value.replace(/\D/g, "").length !== 10
          ? "Invalid phone number"
          : null,
      zip: (value) => (value && value.length !== 5 ? "Invalid zip code" : null),
    },
  });

  // Sync form with profile changes
  useEffect(() => {
    if (profile) {
      form.setValues({
        fullName: profile.full_name || "",
        businessName: profile.business_name || "",
        phone: profile.phone_number || "",
        dob: profile.dob ? dayjs(profile.dob).toDate() : null,
        gender: profile.gender || "",
        address1: profile.address1 || "",
        address2: profile.address2 || "",
        city: profile.city || "",
        state: profile.state || "",
        zip: profile.zip || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const getInitials = (name: string | undefined) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  return (
    <Paper withBorder radius="lg" shadow="xs" p="md">
      {!isEditing ? (
        <Stack>
          <Group justify="space-between">
            <Title order={5}>Profile</Title>
            <Button
              size="compact-sm"
              variant="subtle"
              onClick={() => setIsEditing(true)}
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
              <TelephoneIcon size={20} color="gray" />
              <Stack gap={0}>
                <Text size="sm" c="dimmed">
                  Phone
                </Text>
                <Text fw={500}>{profile?.phone_number || "Not provided"}</Text>
              </Stack>
            </Group>
            <Group gap="sm" wrap="nowrap">
              <Calendar02Icon size={20} color="gray" />
              <Stack gap={0}>
                <Text size="sm" c="dimmed">
                  Date of Birth
                </Text>
                <Text fw={500}>
                  {profile?.dob
                    ? dayjs(profile.dob).format("MMMM D, YYYY")
                    : "Not provided"}
                </Text>
              </Stack>
            </Group>
            <Group gap="sm" wrap="nowrap">
              <UserStar01Icon size={20} color="gray" />
              <Stack gap={0}>
                <Text size="sm" c="dimmed">
                  Gender
                </Text>
                <Text fw={500}>{profile?.gender || "Not provided"}</Text>
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
        <>
          <Stack>
            <Group justify="space-between">
              <Title order={5}>Edit Profile</Title>
            </Group>
            <SimpleGrid cols={{ base: 1, xs: 2 }}>
              <TextInput
                required
                label="Full Name"
                size="md"
                {...form.getInputProps("fullName")}
              />
              <TextInput
                label="Business Name"
                size="md"
                {...form.getInputProps("businessName")}
              />
            </SimpleGrid>
            <SimpleGrid cols={{ base: 1, xs: 2 }}>
              <PatternFormat
                customInput={TextInput}
                label="Phone number"
                format="+1 (###) ###-####"
                mask="_"
                size="md"
                {...form.getInputProps("phone")}
              />
              <DateInput
                label="Date of Birth"
                size="md"
                placeholder="MM/DD/YYYY"
                valueFormat="MM/DD/YYYY"
                {...form.getInputProps("dob")}
              />
            </SimpleGrid>
            <SimpleGrid cols={{ base: 1, xs: 2 }}>
              <Select
                label="Gender"
                size="md"
                placeholder="Select gender"
                data={["Male", "Female", "Nonbinary", "Prefer not to say"]}
                {...form.getInputProps("gender")}
              />
            </SimpleGrid>
            <TextInput
              label="Address"
              size="md"
              {...form.getInputProps("address1")}
            />
            <TextInput
              label="Apartment, suite, etc."
              size="md"
              {...form.getInputProps("address2")}
            />
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <TextInput
                  label="City"
                  size="md"
                  {...form.getInputProps("city")}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 6, sm: 3 }}>
                <NativeSelect
                  label="State"
                  size="md"
                  data={["", ...usStates]}
                  {...form.getInputProps("state")}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 6, sm: 3 }}>
                <TextInput
                  label="Zip Code"
                  size="md"
                  {...form.getInputProps("zip")}
                />
              </Grid.Col>
            </Grid>
            <Group justify="flex-end" mt="md">
              <Button
                variant="default"
                onClick={() => setIsEditing(false)}
                size="lg"
              >
                Cancel
              </Button>
              <Button type="submit" size="lg" loading={loading}>
                Save changes
              </Button>
            </Group>
          </Stack>
        </>
      )}
    </Paper>
  );
}
