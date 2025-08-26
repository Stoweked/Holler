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
import { useState } from "react";
import { signup } from "../auth/signup/actions";

export default function SignUpPage() {
  // Manage form state with useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Manual validation function
  const validate = () => {
    const newErrors = { email: "", password: "", confirmPassword: "" };
    let isValid = true;

    if (!/^\S+@\S+$/.test(email)) {
      newErrors.email = "Invalid email";
      isValid = false;
    }

    if (password.length < 6) {
      newErrors.password = "Password must have at least 6 characters";
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
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
              Create an account
            </Title>
            <Text c="dimmed" size="sm" ta="center">
              Enter your details to get started
            </Text>
          </Stack>

          <form action={signup}>
            <Stack>
              <TextInput
                required
                size="lg"
                radius="md"
                label="Email"
                placeholder="Your email address"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
                error={errors.email}
              />
              <PasswordInput
                required
                size="lg"
                radius="md"
                label="Password"
                placeholder="Your password"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
                error={errors.password}
              />
              <PasswordInput
                required
                size="lg"
                radius="md"
                label="Confirm password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.currentTarget.value)
                }
                error={errors.confirmPassword}
              />
              <Button type="submit" fullWidth mt="md" size="lg">
                Sign up
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
