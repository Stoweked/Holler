// src/app/(auth)/signup/multi-step/page.tsx
import { Suspense } from "react";
import { Loader, Center } from "@mantine/core";
import MultiStepSignUpForm from "@/features/auth/components/MultiStepSignupForm";

export default function MultiStepSignUpPage() {
  return (
    <Suspense
      fallback={
        <Center mih="100vh">
          <Loader size="xl" />
        </Center>
      }
    >
      <MultiStepSignUpForm />
    </Suspense>
  );
}
