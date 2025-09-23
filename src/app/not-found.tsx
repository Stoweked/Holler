// src/app/not-found.tsx
import { Button, Stack, Text, Title, Image, Badge } from "@mantine/core";
import Link from "next/link";

export default function NotFound() {
  return (
    <Stack
      align="center"
      justify="center"
      mih="100vh"
      p="md"
      className="pageBackground"
    >
      <Stack align="center" gap="xl">
        <Image
          src="/images/holler-logo-green.svg"
          alt="Holler Logo"
          w={160}
          h="auto"
        />
        <Stack align="center" gap="xs">
          <Badge variant="light" color="red" size="xl">
            404
          </Badge>
          <Title order={1} ta="center" size={48} lh={1.1} c="white">
            Page not found
          </Title>
          <Text c="dimmed" ta="center" maw={420}>
            The page you are looking for does not exist
          </Text>
        </Stack>
        <Button component={Link} href="/dashboard" size="lg" miw={120}>
          Go to dashboard
        </Button>
      </Stack>
    </Stack>
  );
}
