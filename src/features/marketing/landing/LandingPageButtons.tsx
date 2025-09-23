"use client";

import { Button, Group } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function LandingPageButtons() {
  const router = useRouter();

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
