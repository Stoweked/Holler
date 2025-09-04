"use client";

import { Button, Group, Paper, Stack, Text, Title } from "@mantine/core";

export default function DeleteAccountCard() {
  return (
    <Paper withBorder radius="lg" shadow="xs" p="md">
      <Group justify="space-between">
        <Stack gap={0}>
          <Title order={5}>Delete account</Title>
          <Text c="dimmed" fz={14}>
            Permanently delete your account and data.
          </Text>
        </Stack>
        <Button
          color="red"
          variant="outline"
          aria-label="Delete account"
          size="md"
        >
          Delete account
        </Button>
      </Group>
    </Paper>
  );
}
