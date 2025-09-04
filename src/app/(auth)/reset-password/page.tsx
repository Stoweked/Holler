// src/app/(auth)/reset-password/page.tsx
"use client";

import { resetPassword } from "@/features/auth/actions/reset-password";
import {
  Anchor,
  Avatar,
  Button,
  Paper,
  PasswordInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Shield01Icon } from "hugeicons-react";
import { useState } from "react";

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: {
      password: (value) =>
        value.length < 6 ? "Password must have at least 6 characters" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("password", values.password);

    const result = await resetPassword(formData);

    if (result?.error) {
      setError(result.error);
    }
    setIsLoading(false);
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
            <Shield01Icon size={20} />
          </Avatar>
          <Stack gap={0}>
            <Title order={2}>Reset your password</Title>
            <Text c="dimmed">Enter a new password for your account.</Text>
          </Stack>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              <PasswordInput
                required
                label="New Password"
                name="password"
                {...form.getInputProps("password")}
                size="lg"
                radius="md"
              />
              <PasswordInput
                required
                label="Confirm New Password"
                name="confirmPassword"
                {...form.getInputProps("confirmPassword")}
                size="lg"
                radius="md"
              />
              {error && (
                <Text c="red" size="sm">
                  {error}
                </Text>
              )}
              <Button
                type="submit"
                fullWidth
                mt="md"
                size="lg"
                loading={isLoading}
              >
                Reset Password
              </Button>
            </Stack>
          </form>

          <Text c="dimmed" size="sm" ta="center">
            Remembered your password?{" "}
            <Anchor href="/login" size="sm">
              Log in
            </Anchor>
          </Text>
        </Stack>
      </Paper>
    </Stack>
  );
}
