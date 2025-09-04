// src/features/auth/components/SignUpForm.tsx
"use client";

import {
  Anchor,
  Avatar,
  Button,
  Divider,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { signup } from "@/features/auth/actions/signup";
import { UserIcon } from "hugeicons-react";
import { useState } from "react";
import { OAuthButtons } from "@/features/auth/components";
import { notifications } from "@mantine/notifications";

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("email", values.email);
    const result = await signup(formData);

    if (result?.error) {
      // Check for the specific "account exists" error message
      if (result.error.includes("already exists")) {
        notifications.show({
          title: "Account exists",
          message: (
            <>
              {result.error}{" "}
              <Anchor href="/login" size="sm">
                Log in
              </Anchor>
            </>
          ),
        });
      } else {
        // Show a generic error for anything else
        notifications.show({
          title: "Sign-up Failed",
          message: "An unexpected error occurred. Please try again.",
          color: "red",
        });
      }
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
            <UserIcon size={20} />
          </Avatar>
          <Stack gap={0}>
            <Title order={2}>Create an account</Title>
            <Text c="dimmed">Enter your email to get started.</Text>
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
                label="Email"
                name="email"
                placeholder="Your email address"
                {...form.getInputProps("email")}
              />
              <Button
                type="submit"
                fullWidth
                mt="md"
                size="lg"
                loading={isLoading}
              >
                Continue
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
