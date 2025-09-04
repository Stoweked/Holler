// src/app/(auth)/signup/page.tsx
import { Suspense } from "react";
import { Loader, Stack } from "@mantine/core";
import SignUpForm from "@/features/auth/components/SignupForm";

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <Stack align="center" justify="center" mih="100vh">
          <Loader size="xl" />
        </Stack>
      }
    >
      <SignUpForm />
    </Suspense>
  );
}
