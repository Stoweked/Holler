// /src/app/forgot-password/page.tsx
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
import { requestPasswordReset } from "../auth/forgot-password/actions";

export default function ForgotPasswordPage() {
  return (
    <Stack
      align="center"
      justify="center"
      mih="100vh"
      p="md"
      className="pageBackground"
    >
      <Paper withBorder shadow="lg" p="xl" radius="lg" maw={420} w="100%">
        <Stack gap="lg">
          <Stack gap={0} align="center">
            <Title order={2} ta="center">
              Forgot your password?
            </Title>
            <Text c="dimmed" size="sm" ta="center">
              Enter your email to get a reset link
            </Text>
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
