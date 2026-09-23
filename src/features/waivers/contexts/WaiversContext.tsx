// src/contexts/WaiversContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useMemo,
} from "react";
import { useServices } from "@/lib/services/ServicesProvider";
import { Waiver } from "@/features/waivers/types/waiver";
import { useDisclosure } from "@mantine/hooks";

interface WaiversContextType {
  waivers: Waiver[];
  loading: boolean;
  refetchWaivers: () => Promise<Waiver[] | null>;
  drawerOpened: boolean;
  openDrawer: (source?: string) => void;
  closeDrawer: () => void;
  newlyCreatedWaiver: Waiver | null;
  setNewlyCreatedWaiver: (waiver: Waiver | null) => void;
  source?: string;
}

const WaiversContext = createContext<WaiversContextType | undefined>(undefined);

export function WaiversProvider({ children }: { children: ReactNode }) {
  const [waivers, setWaivers] = useState<Waiver[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpened, { open, close: closeDrawer }] = useDisclosure(false);
  const [newlyCreatedWaiver, setNewlyCreatedWaiver] = useState<Waiver | null>(
    null
  );
  const [source, setSource] = useState<string | undefined>();
  const { getWaivers } = useServices();

  const fetchWaivers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getWaivers();
      setWaivers(data);
      return data;
    } catch {
      setWaivers([]);
      return null;
    } finally {
      setLoading(false);
    }
  }, [getWaivers]);

  useEffect(() => {
    fetchWaivers();
  }, [fetchWaivers]);

  const openDrawer = useCallback(
    (sourceValue?: string) => {
      setSource(sourceValue);
      open();
    },
    [open]
  );

  const value = useMemo(
    () => ({
      waivers,
      loading,
      refetchWaivers: fetchWaivers,
      drawerOpened,
      openDrawer,
      closeDrawer,
      newlyCreatedWaiver,
      setNewlyCreatedWaiver,
      source,
    }),
    [
      waivers,
      loading,
      fetchWaivers,
      drawerOpened,
      openDrawer,
      closeDrawer,
      newlyCreatedWaiver,
      source,
    ]
  );

  return (
    <WaiversContext.Provider value={value}>{children}</WaiversContext.Provider>
  );
}

export function useWaivers() {
  const context = useContext(WaiversContext);
  if (context === undefined) {
    throw new Error("useWaivers must be used within a WaiversProvider");
  }
  return context;
}
