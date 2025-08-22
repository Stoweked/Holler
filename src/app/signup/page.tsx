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

  // Handle form submission
  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (validate()) {
      // Replace with your actual sign-up logic
      console.log("Signing up with:", { email, password });
      // For example, you might call an API here:
      // createUser(email, password);
    }
  };

  return (
    <Stack
      align="center"
      justify="center"
      style={{ minHeight: "calc(100vh - 60px)" }} // Adjust 60px to match your header height
      p="md"
    >
      <Paper withBorder shadow="md" p={30} radius="md" w={420}>
        <Stack gap="lg">
          <Stack gap="xs" align="center">
            <Title order={2} ta="center">
              Create an account
            </Title>
            <Text c="dimmed" size="sm" ta="center">
              Enter your details to get started
            </Text>
          </Stack>

          <form onSubmit={handleSignUp}>
            <Stack>
              <TextInput
                required
                label="Email"
                placeholder="you@mantine.dev"
                value={email}
                onChange={(event) => setEmail(event.currentTarget.value)}
                error={errors.email}
              />
              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
                error={errors.password}
              />
              <PasswordInput
                required
                label="Confirm Password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.currentTarget.value)
                }
                error={errors.confirmPassword}
              />
              <Button type="submit" fullWidth mt="md">
                Sign Up
              </Button>
            </Stack>
          </form>

          <Text c="dimmed" size="sm" ta="center" mt="sm">
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
