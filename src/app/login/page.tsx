"use client";

import { createClient } from "@/utils/supabase/client";
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
import { useForm } from "@mantine/form";

export default function LoginPage() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6 ? "Password must have at least 6 characters" : null,
    },
  });

  const handleLogin = async (values: { email: string; password: string }) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      console.error("Error logging in:", error.message);
    } else {
      // Handle successful login, e.g., redirect to a protected route
      console.log("User logged in:", data);
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
      <Paper withBorder shadow="md" p="xl" radius="lg" maw={420} w="100%">
        <Stack gap="lg">
          <Stack gap={0} align="center">
            <Title order={2} ta="center">
              Welcome back
            </Title>
            <Text c="dimmed" size="sm" ta="center">
              Enter your credentials to continue
            </Text>
          </Stack>

          <form onSubmit={form.onSubmit(handleLogin)}>
            <Stack>
              <TextInput
                size="lg"
                radius="md"
                required
                label="Email"
                placeholder="Your email address"
                {...form.getInputProps("email")}
              />
              <PasswordInput
                size="lg"
                radius="md"
                required
                label="Password"
                placeholder="Your password"
                {...form.getInputProps("password")}
              />
              <Anchor href="#" size="sm" ta="right">
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
