// src/theme.ts
"use client";

import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "lime",
  components: {
    Button: {
      defaultProps: {
        size: "md",
        radius: "xl",
      },
    },
    ActionIcon: {
      defaultProps: {
        radius: "xl",
        size: "lg",
      },
    },
    Drawer: {
      styles: {
        close: {
          borderRadius: "var(--mantine-radius-xl)",
          width: 32,
          height: 32,
        },
      },
    },
    Modal: {
      defaultProps: {
        radius: "lg",
      },
      styles: {
        close: {
          borderRadius: "var(--mantine-radius-xl)",
          width: 32,
          height: 32,
        },
      },
    },
  },
});
