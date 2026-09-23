"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { AppServices } from "./contracts";

const ServicesContext = createContext<AppServices | null>(null);

/** Supply a stable adapter instance from the application entry point. */
export function ServicesProvider({ services, children }: { services: AppServices; children: ReactNode }) {
  return <ServicesContext.Provider value={services}>{children}</ServicesContext.Provider>;
}

export function useServices(): AppServices {
  const services = useContext(ServicesContext);
  if (!services) throw new Error("useServices must be used within a ServicesProvider");
  return services;
}
