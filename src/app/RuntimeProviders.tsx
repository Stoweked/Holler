"use client";

import type { ReactNode } from "react";
import { ServicesProvider } from "@/lib/services/ServicesProvider";
import { createPreviewServices } from "@/lib/adapters/fixtures/createPreviewServices";
import { NextNavigationProvider } from "@/lib/adapters/next/NextNavigationProvider";
import { ProfileProvider, type ProfileContextType } from "@/features/account/contexts/ProfileContext";

// Explicit local design mode while the replacement backend is being built.
const services = createPreviewServices();
const previewAccount: ProfileContextType = {
  user: null,
  profile: {
    id: "preview-account",
    email: "demo@example.test",
    full_name: "Demo Account",
    username: "demo",
  },
  loading: false,
  fetchProfile: async () => {},
};

export function RuntimeProviders({ children }: { children: ReactNode }) {
  return (
    <ServicesProvider services={services}>
      <ProfileProvider value={previewAccount}>
        <NextNavigationProvider>{children}</NextNavigationProvider>
      </ProfileProvider>
    </ServicesProvider>
  );
}
