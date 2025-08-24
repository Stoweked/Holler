// src/app/layout.tsx

import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { theme } from "../theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Holler",
  description:
    "Get paid faster on the job. Holler provides secure mobile payments designed for construction trades.",
  metadataBase: new URL("https://holler-build.vercel.app/"),
  openGraph: {
    title: "Holler",
    description:
      "Get paid faster on the job. Holler provides secure mobile payments designed for construction trades.",
    url: "https://holler-build.vercel.app/",
    siteName: "Holler",
    images: [
      {
        url: "/images/og-cover.png",
        width: 1200,
        height: 630,
        alt: "Get paid faster on the job. Holler provides secure mobile payments designed for construction trades.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <Notifications position="bottom-center" />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
