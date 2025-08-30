"use client";

import {
  Anchor,
  Avatar,
  Button,
  Divider,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { signup } from "../../../features/auth/actions/signup";
import { UserIcon } from "hugeicons-react";
import { useState } from "react";
import { OAuthButtons } from "@/features/auth/components";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);

  // Mantine form hook for state management and validation
  const form = useForm({
    initialValues: {
      full_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    // Validation rules for each field
    validate: {
      full_name: (value) =>
        value.trim().length < 2 ? "Full name is required" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6 ? "Password must have at least 6 characters" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  // Handle form submission
  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("full_name", values.full_name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    try {
      await signup(formData);
    } catch (error) {
      console.error("Login failed:", error);
      // In case of an error, stop the loading state
      setIsLoading(false);
      // notifications.show({
      //   title: "Sign up failed",
      //   message: "Please try again.",
      //   color: "red",
      //   icon: <AlertCircleIcon size={18} />,
      // });
    }
  };

  return (
    <Stack
      align="center"
      justify="center"
      mih="100vh"
      p="md"
      className="pageBackground"
    >
      <Paper withBorder shadow="lg" p="lg" radius="lg" maw={420} w="100%">
        <Stack gap="lg">
          <Avatar variant="default" size="md">
            <UserIcon size={20} />
          </Avatar>
          <Stack gap={0}>
            <Title order={2}>Create an account</Title>
            <Text c="dimmed">Enter your details to get started.</Text>
          </Stack>

          <OAuthButtons />

          <Divider
            label="Or sign up with email"
            labelPosition="center"
            my="xs"
          />

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              <TextInput
                required
                size="lg"
                radius="md"
                label="Full name"
                name="full_name"
                placeholder="Your full name"
                {...form.getInputProps("full_name")}
              />
              <TextInput
                required
                size="lg"
                radius="md"
                label="Email"
                name="email"
                placeholder="Your email address"
                {...form.getInputProps("email")}
              />
              <PasswordInput
                required
                size="lg"
                radius="md"
                label="Password"
                name="password"
                placeholder="Your password"
                {...form.getInputProps("password")}
              />
              <PasswordInput
                required
                size="lg"
                radius="md"
                label="Confirm password"
                placeholder="Confirm your password"
                {...form.getInputProps("confirmPassword")}
              />
              <Button
                type="submit"
                fullWidth
                mt="md"
                size="lg"
                loading={isLoading}
              >
                Sign up
              </Button>
            </Stack>
          </form>

          <Text c="dimmed" size="sm" ta="center">
            Already have an account?{" "}
            <Anchor href="/login" size="sm">
              Log in
            </Anchor>
          </Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
