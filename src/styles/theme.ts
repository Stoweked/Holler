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
      styles: {
        root: {
          flexShrink: 0,
        },
      },
    },
    Badge: {
      classNames: {
        label: "sentence-case-badge-label",
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
        radius: "md",
        withBorder: true,
      },
      styles: {
        closeButton: {
          borderRadius: "var(--mantine-radius-xl)",
        },
      },
    },
    Drawer: {
      defaultProps: {
        trapFocus: false,
      },
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
        trapFocus: false,
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
