// src/features/marketing/landing/LandingPageButtons.tsx
"use client";

import { Button, Group } from "@mantine/core";
import Link from "next/link";
import { useAuth } from "react-oidc-context";

export default function LandingPageButtons() {
  const auth = useAuth();

  // Only show the Dashboard button if loading is complete AND the user exists.
  if (!auth.isLoading && auth.isAuthenticated) {
    return (
      <Button component={Link} href="/dashboard" size="lg" miw={120}>
        Dashboard
      </Button>
    );
  }

  // In all other cases (including the loading state), show the unified login button.
  return (
    <Group gap="lg">
      <Button size="lg" onClick={() => auth.signinRedirect()} miw={160}>
        Get Started
      </Button>
    </Group>
  );
}
