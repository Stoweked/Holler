"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

export interface AppRouter {
  push(href: string): void;
  replace(href: string): void;
}
export interface Navigation {
  router: AppRouter;
  pathname: string;
  search: string;
}
const NavigationContext = createContext<Navigation | null>(null);

export function NavigationProvider({ value, children }: { value: Navigation; children: ReactNode }) {
  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}
function useNavigation() {
  const navigation = useContext(NavigationContext);
  if (!navigation) throw new Error("NavigationProvider is required for navigation.");
  return navigation;
}
export function useRouter() { return useNavigation().router; }
export function usePathname() { return useNavigation().pathname; }
export function useSearchParams() {
  const { search } = useNavigation();
  return useMemo(() => new URLSearchParams(search), [search]);
}
