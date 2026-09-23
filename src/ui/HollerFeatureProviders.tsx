"use client";

import type { ReactNode } from "react";
import { ModalsProvider } from "@mantine/modals";
import { WalletProvider } from "../features/wallet/contexts/WalletContext";
import { WaiversProvider } from "../features/waivers/contexts/WaiversContext";
import { ProjectsProvider } from "../features/projects/contexts/ProjectsContext";
import { ContactsProvider } from "../features/contacts/contexts/ContactsContext";
import { AppModalsProvider } from "../contexts/AppModalsContext";

/** Feature state for embedding connected components without the dashboard shell. */
export function HollerFeatureProviders({ children }: { children: ReactNode }) {
  return (
    <WalletProvider>
      <WaiversProvider>
        <ProjectsProvider>
          <ContactsProvider>
            <ModalsProvider>
              <AppModalsProvider>{children}</AppModalsProvider>
            </ModalsProvider>
          </ContactsProvider>
        </ProjectsProvider>
      </WaiversProvider>
    </WalletProvider>
  );
}
