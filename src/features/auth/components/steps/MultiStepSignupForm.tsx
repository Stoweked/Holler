// stoweked/holler/Holler-main/src/features/auth/components/MultiStepSignupForm.tsx
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

export default function MultiStepSignUpForm() {
  const {
    step,
    setStep,
    isAuthenticated,
    loading,
    form,
    handleBack,
    handleFinalSubmit,
  } = useMultiStepSignupForm();

  if (loading) {
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
      <Paper withBorder shadow="lg" p="lg" radius="lg" maw={420} w="100%">
        <form
          onSubmit={form.onSubmit((values) => {
            if (step === "profileInfo") {
              setStep("password");
            } else {
              handleFinalSubmit(values);
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
              <ProfileInfoStep form={form} isAuthenticated={isAuthenticated} />
            )}

            {step === "password" && (
              <PasswordStep form={form} loading={loading} />
            )}
          </Stack>
        </form>
      </Paper>
    </Stack>
  );
}
