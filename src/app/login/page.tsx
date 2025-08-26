"use client";

import {
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { login } from "../auth/login/actions";

export default function LoginPage() {
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
              Welcome back
            </Title>
            <Text c="dimmed" size="sm" ta="center">
              Enter your credentials to continue
            </Text>
          </Stack>

          <form action={login}>
            <Stack>
              <TextInput
                size="lg"
                radius="md"
                required
                name="email"
                label="Email"
                placeholder="Your email address"
              />
              <PasswordInput
                size="lg"
                radius="md"
                required
                name="password"
                label="Password"
                placeholder="Your password"
              />
              <Anchor href="/forgot-password" size="sm" ta="right">
                Forgot password?
              </Anchor>
              <Button type="submit" fullWidth mt="md" size="lg">
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
