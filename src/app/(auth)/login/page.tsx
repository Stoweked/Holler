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
import { login } from "../../../features/auth/actions/login";
import { UserLove01Icon } from "hugeicons-react";
import { useEffect, useState } from "react";
import { OAuthButtons } from "@/features/auth/components";
import { useSearchParams } from "next/navigation";
import { notifications } from "@mantine/notifications";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  useEffect(() => {
    if (message) {
      notifications.show({
        title: "Heads up!",
        message,
      });
    }
  }, [message]);

  // Mantine form hook for state management and validation
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    // Validation rules for each field
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.trim().length === 0 ? "Password is required" : null,
    },
  });

  // Handle form submission
  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    try {
      await login(formData);
    } catch (error) {
      console.error("Login failed:", error);
      // In case of an error, stop the loading state
      setIsLoading(false);
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
            <UserLove01Icon size={20} />
          </Avatar>
          <Stack gap={0}>
            <Title order={2}>Welcome back</Title>
            <Text c="dimmed">Enter your credentials to continue.</Text>
          </Stack>

          <OAuthButtons />

          <Divider
            label="Or log in with email"
            labelPosition="center"
            my="xs"
          />

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              <TextInput
                size="lg"
                radius="md"
                required
                name="email"
                label="Email"
                placeholder="Your email address"
                {...form.getInputProps("email")}
              />
              <PasswordInput
                size="lg"
                radius="md"
                required
                name="password"
                label="Password"
                placeholder="Your password"
                {...form.getInputProps("password")}
              />
              <Anchor href="/forgot-password" size="sm" ta="right">
                Forgot password?
              </Anchor>
              <Button
                type="submit"
                fullWidth
                mt="md"
                size="lg"
                loading={isLoading}
              >
                Log in
              </Button>
            </Stack>
          </form>

          <Text c="dimmed" size="sm" ta="center">
            Don&apos;t have an account?{" "}
            <Anchor href="/signup" size="sm">
              Sign up
            </Anchor>
          </Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
