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

  const handleLogin = (values: { email: string; password: string }) => {
    // Replace with your actual login logic
    console.log("Logging in with:", values);
    // For example, you might call an API here:
    // loginUser(values.email, values.password);
  };

  return (
    <Stack
      align="center"
      justify="center"
      style={{ minHeight: "calc(100vh - 60px)" }} // Adjust 60px to match your header height
      p="md"
    >
      <Paper withBorder shadow="md" p={30} radius="lg" w={420}>
        <Stack gap="lg">
          <Stack gap="xs" align="center">
            <Title order={2} ta="center">
              Welcome back!
            </Title>
            <Text c="dimmed" size="sm" ta="center">
              Enter your credentials to continue
            </Text>
          </Stack>

          <form onSubmit={form.onSubmit(handleLogin)}>
            <Stack>
              <TextInput
                required
                label="Email"
                placeholder="you@mantine.dev"
                {...form.getInputProps("email")}
              />
              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                {...form.getInputProps("password")}
              />
              <Anchor href="#" size="sm" ta="right">
                Forgot password?
              </Anchor>
              <Button type="submit" fullWidth mt="md">
                Log In
              </Button>
            </Stack>
          </form>

          <Text c="dimmed" size="sm" ta="center" mt="sm">
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
