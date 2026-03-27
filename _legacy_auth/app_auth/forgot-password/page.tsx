// src/app/(auth)/forgot-password/page.tsx
"use client";

import {
  Anchor,
  Button,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { requestPasswordReset } from "../../../features/auth/actions/forgot-password";
import { InformationCircleIcon } from "hugeicons-react";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    const result = await requestPasswordReset(formData);
    setLoading(false);

    if (result?.error) {
      notifications.show({
        title: "Error",
        message: result.error,
        color: "red",
      });
    } else {
      notifications.show({
        title: "Check your email",
        message: "A password reset link has been sent to your email address.",
        icon: <InformationCircleIcon size={20} />,
      });
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
          <Stack gap={0}>
            <Title order={2}>Forgot your password?</Title>
            <Text c="dimmed">Enter your email to get a reset link.</Text>
          </Stack>

          <form action={handleSubmit}>
            <Stack>
              <TextInput
                size="lg"
                radius="md"
                required
                name="email"
                label="Email"
                placeholder="Your email address"
              />
              <Button
                type="submit"
                fullWidth
                mt="md"
                size="lg"
                loading={loading}
              >
                Send reset link
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
