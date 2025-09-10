// src/components/layout/TopNav/ColorSchemeMenuItem.tsx
"use client";

import {
  Menu,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { Sun03Icon, Moon02Icon } from "hugeicons-react";

export function ColorSchemeMenuItem() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const isLight = computedColorScheme === "light";

  return (
    <Menu.Item
      leftSection={isLight ? <Moon02Icon size={16} /> : <Sun03Icon size={16} />}
      onClick={() => setColorScheme(isLight ? "dark" : "light")}
    >
      {isLight ? "Dark" : "Light"} mode
    </Menu.Item>
  );
}
