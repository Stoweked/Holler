"use client";

import { Suspense, useEffect, useState, type ReactNode } from "react";

/** Preserve client-only rendering for browser-dependent lazy drawers. */
export function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? <Suspense fallback={null}>{children}</Suspense> : null;
}
