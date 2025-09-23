// src/features/marketing/landing/LandingPageButtons.tsx
"use client";

import { Button, Group } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useProfile } from "@/contexts/ProfileContext";
import Link from "next/link";

export default function LandingPageButtons() {
  const router = useRouter();
  const { user, loading } = useProfile();

  if (loading) {
    return null;
  }

  if (user) {
    return (
      <Button component={Link} href="/dashboard" size="lg" miw={120}>
        Dashboard
      </Button>
    );
  }

  return (
    <Group gap="lg">
      <Button size="lg" onClick={() => router.push("/signup")} miw={120}>
        Sign up
      </Button>

      <Button
        size="lg"
        variant="outline"
        onClick={() => router.push("/login")}
        miw={120}
      >
        Log in
      </Button>
    </Group>
  );
}
