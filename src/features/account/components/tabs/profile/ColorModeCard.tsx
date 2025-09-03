"use client";

import { useState } from "react";
import {
  Center,
  Group,
  Paper,
  rem,
  SegmentedControl,
  Stack,
  Text,
  Title,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { Sun03Icon, Moon02Icon } from "hugeicons-react";

export default function ColorModeCard() {
  //Color modes
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("dark", {
    getInitialValueInEffect: true,
  });
  const [mode, setMode] = useState(computedColorScheme);

  const handleModeChange = (value: string) => {
    if (value === "light" || value === "dark") {
      setMode(value);
      setColorScheme(value);
    }
  };

  return (
    <Paper withBorder radius="lg" shadow="xs" p="md">
      <Group justify="space-between">
        <Stack gap={0}>
          <Title order={5}>Appearance</Title>
          <Text c="dimmed" fz={14}>
            Update the appearance of the app to light or dark mode.
          </Text>
        </Stack>
        <SegmentedControl
          value={mode}
          size="lg"
          onChange={handleModeChange}
          radius="xl"
          data={[
            {
              value: "light",
              label: (
                <Center>
                  <Sun03Icon style={{ width: rem(20), height: rem(20) }} />
                </Center>
              ),
            },
            {
              value: "dark",
              label: (
                <Center>
                  <Moon02Icon style={{ width: rem(20), height: rem(20) }} />
                </Center>
              ),
            },
          ]}
        />
      </Group>
    </Paper>
  );
}
