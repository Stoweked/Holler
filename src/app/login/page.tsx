"use client";

import {
  Anchor,
  Avatar,
  Button,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { login } from "../auth/login/actions";
import { AlertCircleIcon, UserLove01Icon } from "hugeicons-react";
import { useState } from "react";
import { notifications } from "@mantine/notifications";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

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
      // notifications.show({
      //   title: "Login failed",
      //   message: "Please check your credentials and try again.",
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
            <UserLove01Icon size={20} />
          </Avatar>
          <Stack gap={0}>
            <Title order={2}>Welcome back</Title>
            <Text c="dimmed">Enter your credentials to continue.</Text>
          </Stack>

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
