"use client";

import type { ReactNode } from "react";
import { ServicesProvider } from "../lib/services/ServicesProvider";
import type { AppServices } from "../lib/services/contracts";
import { NavigationProvider, type Navigation } from "../lib/navigation/NavigationProvider";
import { ProfileProvider, type ProfileContextType } from "../features/account/contexts/ProfileContext";

export interface HollerProviderProps {
  services: AppServices;
  navigation: Navigation;
  account?: ProfileContextType;
  children: ReactNode;
}

/** Host-owned data, account state and navigation. Use inside a MantineProvider. */
export function HollerProvider({ services, navigation, account, children }: HollerProviderProps) {
  return (
    <ServicesProvider services={services}>
      <ProfileProvider value={account}>
        <NavigationProvider value={navigation}>{children}</NavigationProvider>
      </ProfileProvider>
    </ServicesProvider>
  );
}
