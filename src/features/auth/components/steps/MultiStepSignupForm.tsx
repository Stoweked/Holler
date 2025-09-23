// src/features/auth/components/steps/MultiStepSignupForm.tsx

"use client";

import {
  Paper,
  Stack,
  Loader,
  Center,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { ArrowLeft02Icon } from "hugeicons-react";
import { useMultiStepSignupForm } from "../../hooks/useMultiStepSignupForm";
import { ProfileInfoStep } from "./ProfileInfoStep";
import { PasswordStep } from "./PasswordStep";
import { useState } from "react";

export default function MultiStepSignUpForm() {
  const {
    step,
    setStep,
    isAuthenticated,
    loading,
    form,
    handleBack,
    handleFinalSubmit,
    profile,
  } = useMultiStepSignupForm();
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  if (loading && !form.isDirty()) {
    return (
      <Center mih="100vh">
        <Loader size="xl" />
      </Center>
    );
  }

  return (
    <Stack
      align="center"
      justify="center"
      mih="100vh"
      p="md"
      className="pageBackground"
    >
      <Paper
        withBorder
        shadow="lg"
        p="lg"
        pb="xl"
        radius="lg"
        maw={420}
        w="100%"
      >
        <form
          onSubmit={form.onSubmit(async (values) => {
            if (step === "profileInfo") {
              if (form.errors.username || isCheckingUsername) return; // Prevent submission if username is invalid or checking
              if (isAuthenticated) {
                await handleFinalSubmit(values);
              } else {
                setStep("password");
              }
            } else {
              await handleFinalSubmit(values);
            }
          })}
        >
          <Stack gap="lg">
            <Tooltip label="Back" position="right">
              <ActionIcon
                onClick={handleBack}
                variant="default"
                c="gray"
                aria-label="Go back"
                type="button"
              >
                <ArrowLeft02Icon size={24} />
              </ActionIcon>
            </Tooltip>

            {step === "profileInfo" && (
              <ProfileInfoStep
                form={form}
                isAuthenticated={isAuthenticated}
                profile={profile}
                loading={loading}
                isCheckingUsername={isCheckingUsername}
                setIsCheckingUsername={setIsCheckingUsername}
              />
            )}

            {step === "password" && !isAuthenticated && (
              <PasswordStep form={form} loading={loading} />
            )}
          </Stack>
        </form>
      </Paper>
    </Stack>
  );
}
