"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, type ReactNode } from "react";
import { NavigationProvider } from "@/lib/navigation/NavigationProvider";

export function NextNavigationProvider({ children, search = "" }: {
  children: ReactNode;
  search?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const value = useMemo(() => ({ router, pathname, search }), [router, pathname, search]);
  return <NavigationProvider value={value}>{children}</NavigationProvider>;
}

/** Query-aware screens opt in, preserving static rendering for the landing page. */
export function NextQueryNavigationProvider({ children }: { children: ReactNode }) {
  const search = useSearchParams().toString();
  return <NextNavigationProvider search={search}>{children}</NextNavigationProvider>;
}
