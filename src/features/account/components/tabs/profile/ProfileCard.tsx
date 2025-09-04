// stoweked/holler/Holler-867d68b76023edf4df1133d26035daf64c43e812/src/features/account/components/tabs/account/AccountCard.tsx
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
  rem,
  Loader,
  Badge,
} from "@mantine/core";
import { hasLength, isEmail, useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import {
  Calendar02Icon,
  Location01Icon,
  TelephoneIcon,
  UserStar01Icon,
  UserIcon,
  PlusSignIcon,
  AtIcon,
  CheckmarkCircle02Icon,
  AlertCircleIcon,
} from "hugeicons-react";
import { usStates } from "@/lib/data/usStates";
import { useProfile } from "@/contexts/ProfileContext";
import { getInitials } from "@/lib/hooks/getInitials";
import { useFormattedDate } from "@/lib/hooks/useFormattedDate";

export default function AccountCard() {
  const { profile, fetchProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailPending, setEmailPending] = useState(false);

  const form = useForm({
    validateInputOnChange: true,
    validateInputOnBlur: true,
    initialValues: {
      formName: profile?.full_name || "",
      formEmail: profile?.email || "",
      formPhone: profile?.phone_number || "",
      formDob: profile?.dob ? dayjs(profile.dob).toDate() : null,
      formGender: profile?.gender || null,
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
        if (value && value.replace(/\D/g, "").length !== 11) {
          return "Invalid phone number";
        }
        return null;
      },
      formZip: (value) =>
        value && value.length !== 5 ? "Invalid zip code" : null,
    },
  });

  useEffect(() => {
    if (profile && !form.isDirty()) {
      form.setValues({
        formName: profile.full_name || "",
        formEmail: profile.email || "",
        formPhone: profile.phone_number || "",
        formDob: profile.dob ? dayjs(profile.dob).toDate() : null,
        formGender: profile.gender || null,
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

  const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const valid = form.validate();
    if (valid.hasErrors) {
      setLoading(false);
      return;
    }

    const dobString = form.values.formDob
      ? dayjs(form.values.formDob).format("YYYY-MM-DD")
      : null;

    const res: Response = await fetch("/api/profile/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formName: form.values.formName,
        formEmail: form.values.formEmail,
        formPhone: form.values.formPhone,
        formDob: dobString,
        formGender: form.values.formGender,
        formAddress1: form.values.formAddress1,
        formAddress2: form.values.formAddress2,
        formCity: form.values.formCity,
        formState: form.values.formState,
        formZip: form.values.formZip,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      form.resetDirty();
      setLoading(false);
      if (form.values.formEmail !== profile?.email) {
        setEmailPending(true);
        notifications.show({
          color: "orange",
          title: "Validate new email address",
          message:
            "Please check your new email in order to validate your account email change.",
          withCloseButton: true,
          autoClose: false,
        });
      }
      toggleEditingMode();
      fetchProfile();
      notifications.show({
        color: "green",
        title: "Profile updated",
        message: "Your profile has been updated.",
        icon: (
          <CheckmarkCircle02Icon style={{ width: rem(18), height: rem(18) }} />
        ),
        loading: false,
        withCloseButton: true,
        autoClose: 2000,
      });
    } else {
      setLoading(false);
      const errorMessage = "Your profile failed to update";
      notifications.show({
        color: "red",
        title: "Error",
        message: errorMessage,
        icon: <AlertCircleIcon style={{ width: rem(18), height: rem(18) }} />,
        withCloseButton: true,
        autoClose: 2000,
      });
      console.log(data.error.message);
    }
  };

  const cancelUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    form.reset();
    toggleEditingMode();
    setLoading(false);
  };

  const initials = getInitials(profile?.full_name);
  const formattedDob = useFormattedDate(profile?.dob);

  return (
    <>
      <Paper withBorder radius="lg" shadow="xs" p="md">
        {!isEditing ? (
          <Stack>
            <Group align="center" justify="space-between" wrap="nowrap">
              <Title order={5}>Your profile</Title>
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
                {initials}
              </Avatar>
              <Stack gap={0}>
                <Title order={3}>{profile?.full_name}</Title>
                <Group gap="xs">
                  <Text size="sm">{profile?.email}</Text>
                  {emailPending && (
                    <Badge variant="outline" color="yellow" size="xs">
                      Validation pending
                    </Badge>
                  )}
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
                    {profile?.phone_number || "Not provided"}
                  </Text>
                </Stack>
              </Group>
              <Group gap="sm" wrap="nowrap">
                <Calendar02Icon size={20} color="gray" />
                <Stack gap={0}>
                  <Text size="sm" c="dimmed">
                    Date of Birth
                  </Text>
                  <Text fw={500}>{formattedDob || "Not provided"}</Text>
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
          <Stack>
            <Group align="center" justify="space-between" wrap="nowrap">
              <Title order={5}>Your profile</Title>
              <Button size="compact-sm" variant="subtle" disabled>
                Editing
              </Button>
            </Group>
            <form onSubmit={updateProfile}>
              <Stack>
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
                    maxDate={dayjs(new Date()).add(0, "month").toDate()}
                    leftSection={
                      <Calendar02Icon
                        style={{ width: rem(16), height: rem(16) }}
                      />
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
