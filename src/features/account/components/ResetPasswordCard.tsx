"use client";

import { Button, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function ResetPasswordCard() {
  const router = useRouter();
  return (
    <Paper withBorder radius="lg" shadow="xs" p="md">
      <Group justify="space-between">
        <Stack gap={0}>
          <Title order={5}>Reset password</Title>
          <Text c="dimmed" fz={14}>
            Reset the password for this account.
          </Text>
        </Stack>
        <Button
          variant="default"
          aria-label="Reset password"
          size="md"
          onClick={() => router.push("/reset-password")}
        >
          Reset password
        </Button>
      </Group>
    </Paper>
  );
}
