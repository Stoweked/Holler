"use client";

import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  Tooltip,
} from "@mantine/core";
import { Sun03Icon, Moon02Icon } from "hugeicons-react";
import { useState, useEffect } from "react";

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  // 1. Add a 'mounted' state
  const [mounted, setMounted] = useState(false);

  // 2. Set mounted to true after the initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  // 3. Use the mounted state to determine the color scheme for the initial render
  const scheme = mounted ? computedColorScheme : "light";

  return (
    <Tooltip
      position="left"
      label={`Switch to ${scheme === "light" ? "dark" : "light"} mode`}
    >
      <ActionIcon
        onClick={() => setColorScheme(scheme === "light" ? "dark" : "light")}
        variant="default"
        size={38}
        radius="xl"
        aria-label="Toggle color scheme"
      >
        {scheme === "light" ? (
          <Moon02Icon size={20} />
        ) : (
          <Sun03Icon size={20} />
        )}
      </ActionIcon>
    </Tooltip>
  );
}
