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
    Badge: {
      styles: {
        label: { textTransform: "capitalize", letterSpacing: "0" },
      },
    },
    ActionIcon: {
      defaultProps: {
        radius: "xl",
        size: "lg",
      },
    },
    Notification: {
      defaultProps: {
        radius: "lg",
        withBorder: true,
        color: "none",
      },
      styles: {
        root: {
          paddingLeft: "var(--mantine-spacing-sm)",
        },
        closeButton: {
          borderRadius: "var(--mantine-radius-xl)",
        },
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
