import type { ReactNode } from "react";
import { AppShell, ScrollArea } from "@mantine/core";

export interface HollerLayoutProps {
  header: ReactNode;
  sidebar?: ReactNode;
  navigationOpened?: boolean;
  children: ReactNode;
}

/** Presentation only. The host supplies header/sidebar content and mobile state. */
export function HollerLayout({ header, sidebar, navigationOpened = false, children }: HollerLayoutProps) {
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={sidebar ? { width: 380, breakpoint: "sm", collapsed: { mobile: !navigationOpened } } : undefined}
      padding={0}
    >
      <AppShell.Header>{header}</AppShell.Header>
      {sidebar && <AppShell.Navbar><ScrollArea type="never">{sidebar}</ScrollArea></AppShell.Navbar>}
      <AppShell.Main pt={60} className="appShell">{children}</AppShell.Main>
    </AppShell>
  );
}
