// src/features/auth/components/ProfileInfoStep.tsx
import { Button, Stack, Text, TextInput, Title } from "@mantine/core";
import { SignupFormType } from "../../types/signup";
import { PatternFormat } from "react-number-format";
import { Profile } from "@/features/account/types/account";

interface ProfileInfoStepProps {
  form: SignupFormType;
  isAuthenticated: boolean;
  profile: Profile | null;
}

export function ProfileInfoStep({
  form,
  isAuthenticated,
  profile,
}: ProfileInfoStepProps) {
  const isOAuth = isAuthenticated && profile?.auth_provider === "google";

  return (
    <>
      <Stack gap={0}>
        <Title order={2}>
          {isAuthenticated ? "Complete your profile" : "Create your account"}
        </Title>
        <Text c="dimmed">Add your details to continue.</Text>
      </Stack>
      <TextInput
        required
        label="Full name"
        name="full_name"
        {...form.getInputProps("full_name")}
        size="lg"
        radius="md"
        disabled={isOAuth}
        description={
          isOAuth ? "Your name is linked to your Google account." : ""
        }
      />
      <TextInput
        required
        label="Username"
        name="username"
        {...form.getInputProps("username")}
        size="lg"
        radius="md"
      />
      <PatternFormat
        required
        customInput={TextInput}
        label="Phone number"
        name="phone_number"
        format="(###) ###-####"
        {...form.getInputProps("phone_number")}
        size="lg"
        radius="md"
      />
      <Button type="submit" fullWidth mt="md" size="lg">
        Continue
      </Button>
    </>
  );
}
