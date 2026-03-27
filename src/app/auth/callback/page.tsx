"use client";

import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useRouter } from "next/navigation";
import { Loader, Stack, Text } from "@mantine/core";

export default function AuthCallbackPage() {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If react-oidc-context successfully authenticates and parses the URL token,
    // it updates its internal state. We listen for that state change to redirect.
    if (auth.isAuthenticated) {
      router.push("/dashboard");
    } else if (auth.error) {
      console.error("Authentication Error:", auth.error);
      router.push("/"); // Or an error page
    }
    // If it's still loading or processing, we just render the spinner below.
  }, [auth.isAuthenticated, auth.error, router]);

  return (
    <Stack align="center" justify="center" mih="100vh">
      <Loader size="xl" />
      <Text c="dimmed">Finalizing authentication...</Text>
    </Stack>
  );
}
