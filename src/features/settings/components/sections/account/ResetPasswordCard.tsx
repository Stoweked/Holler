"use client";

import { Button, Group, Paper, Stack, Text, Title } from "@mantine/core";

export default function ResetPasswordCard() {
  return (
    <Paper withBorder radius="lg" shadow="xs" p="md">
      <Group justify="space-between">
        <Stack gap={0}>
          <Title order={5}>Reset password</Title>
          <Text c="dimmed" fz={14}>
            Reset the password for this account.
          </Text>
        </Stack>
        <Button variant="default" aria-label="Reset password" size="md">
          Reset password
        </Button>
      </Group>
    </Paper>
  );
}
