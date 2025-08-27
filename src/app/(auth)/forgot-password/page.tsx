// /src/app/forgot-password/page.tsx
"use client";

import {
  Anchor,
  Avatar,
  Button,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { requestPasswordReset } from "./actions";
import { Shield01Icon } from "hugeicons-react";

export default function ForgotPasswordPage() {
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
            <Title order={2}>Forgot your password?</Title>
            <Text c="dimmed">Enter your email to get a reset link.</Text>
          </Stack>

          <form action={requestPasswordReset}>
            <Stack>
              <TextInput
                size="lg"
                radius="md"
                required
                name="email"
                label="Email"
                placeholder="Your email address"
              />
              <Button type="submit" fullWidth mt="md" size="lg">
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
