"use client";

import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  Tooltip,
} from "@mantine/core";
import { Sun03Icon, Moon02Icon } from "hugeicons-react";

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <Tooltip
      position="left"
      label={`Switch to ${
        computedColorScheme === "light" ? "dark" : "light"
      } mode`}
    >
      <ActionIcon
        onClick={() =>
          setColorScheme(computedColorScheme === "light" ? "dark" : "light")
        }
        variant="subtle"
        size="lg"
        radius="xl"
        aria-label="Toggle color scheme"
      >
        {computedColorScheme === "light" ? (
          <Moon02Icon size={20} />
        ) : (
          <Sun03Icon size={20} />
        )}
      </ActionIcon>
    </Tooltip>
  );
}
