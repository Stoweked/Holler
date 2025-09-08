// src/features/auth/components/steps/PasswordStep.tsx

import { Button, PasswordInput, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";
import { PasswordStrengthMeter } from "./PasswordStrengthMeter";
import { SignupFormType } from "../../types/signup";

interface PasswordStepProps {
  form: SignupFormType;
  loading: boolean;
}

export function PasswordStep({ form, loading }: PasswordStepProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <>
      <Stack gap={0}>
        <Title order={2}>Set your password</Title>
        <Text c="dimmed">
          Choose a secure password to protect your account.
        </Text>
      </Stack>
      <PasswordStrengthMeter value={form.values.password}>
        <PasswordInput
          required
          label="Password"
          name="password"
          {...form.getInputProps("password")}
          size="lg"
          radius="md"
          visible={passwordVisible}
          onVisibilityChange={setPasswordVisible}
        />
      </PasswordStrengthMeter>
      <PasswordInput
        required
        label="Confirm Password"
        name="confirmPassword"
        {...form.getInputProps("confirmPassword")}
        size="lg"
        radius="md"
        visible={passwordVisible}
        onVisibilityChange={setPasswordVisible}
      />
      <Button type="submit" fullWidth mt="md" size="lg" loading={loading}>
        Complete sign up
      </Button>
    </>
  );
}
