import { Suspense } from "react";
import { Loader, Stack } from "@mantine/core";
import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <Stack align="center" justify="center" mih="100vh">
          <Loader size="xl" />
        </Stack>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
