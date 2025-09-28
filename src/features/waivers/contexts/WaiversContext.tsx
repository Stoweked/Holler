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
import { createClient } from "@/lib/supabase/client";
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
  const supabase = createClient();

  const fetchWaivers = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("lien_waivers")
      .select("*")
      .eq("archived", false)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching waivers:", error);
      setWaivers([]);
      setLoading(false);
      return null;
    } else {
      setWaivers(data || []);
      setLoading(false);
      return data;
    }
  }, [supabase]);

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
