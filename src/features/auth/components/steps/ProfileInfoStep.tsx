// src/features/auth/components/steps/ProfileInfoStep.tsx
import { Button, Stack, Text, TextInput, Title, Loader } from "@mantine/core";
import { SignupFormType } from "../../types/signup";
import { PatternFormat } from "react-number-format";
import { Profile } from "@/features/account/types/account";
import { Dispatch, SetStateAction } from "react";
import { checkUsernameExists } from "../../actions/check-username";

interface ProfileInfoStepProps {
  form: SignupFormType;
  isAuthenticated: boolean;
  profile: Profile | null;
  loading: boolean;
  isCheckingUsername: boolean;
  setIsCheckingUsername: Dispatch<SetStateAction<boolean>>;
}

export function ProfileInfoStep({
  form,
  isAuthenticated,
  profile,
  loading,
  isCheckingUsername,
  setIsCheckingUsername,
}: ProfileInfoStepProps) {
  const isOAuth = isAuthenticated && profile?.auth_provider === "google";

  const handleUsernameBlur = async () => {
    const username = form.values.username;

    // Clear previous async error before re-validating
    if (form.errors.username === "Username is already taken") {
      form.clearFieldError("username");
    }

    // Don't check if the user is authenticated and the username hasn't changed
    if (isAuthenticated && username === profile?.username) {
      return;
    }

    // First, validate the format synchronously
    const formatValidation = /^[a-zA-Z0-9._]{3,20}$/.test(username);
    if (!formatValidation) {
      form.setFieldError(
        "username",
        "Username must be 3-20 characters and can only contain letters, numbers, underscores, and periods."
      );
      return; // Stop if format is invalid
    }

    // If format is valid, check for existence
    setIsCheckingUsername(true);
    const usernameExists = await checkUsernameExists(username, profile?.id);
    if (usernameExists) {
      form.setFieldError("username", "Username is already taken");
    }
    setIsCheckingUsername(false);
  };

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
        radius="lg"
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
        radius="lg"
        onBlur={handleUsernameBlur}
        rightSection={isCheckingUsername ? <Loader size="xs" /> : null}
      />
      <PatternFormat
        required
        customInput={TextInput}
        label="Phone number"
        name="phone_number"
        format="(###) ###-####"
        {...form.getInputProps("phone_number")}
        size="lg"
        radius="lg"
      />
      <Button
        type="submit"
        fullWidth
        mt="md"
        size="lg"
        loading={loading}
        disabled={!!form.errors.username || isCheckingUsername}
      >
        Continue
      </Button>
    </>
  );
}
