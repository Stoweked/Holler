import { Suspense, type ReactNode } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { NextQueryNavigationProvider } from "@/lib/adapters/next/NextNavigationProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <NextQueryNavigationProvider>
        <AppLayout>
          {children}
          <SpeedInsights />
          <Analytics />
        </AppLayout>
      </NextQueryNavigationProvider>
    </Suspense>
  );
}
