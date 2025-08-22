"use client";

import {
  Menu,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { Sun03Icon, Moon02Icon } from "hugeicons-react";
import { useState, useEffect } from "react";

export function ColorSchemeMenuItem() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine the current scheme, defaulting to 'light' on the server
  const scheme = mounted ? computedColorScheme : "light";
  const isLight = scheme === "light";

  return (
    <Menu.Item
      leftSection={isLight ? <Moon02Icon size={16} /> : <Sun03Icon size={16} />}
      onClick={() => setColorScheme(isLight ? "dark" : "light")}
    >
      {isLight ? "Dark" : "Light"} mode
    </Menu.Item>
  );
}
