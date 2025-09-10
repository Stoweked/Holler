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
  refetchWaivers: () => void;
  drawerOpened: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const WaiversContext = createContext<WaiversContextType | undefined>(undefined);

export function WaiversProvider({ children }: { children: ReactNode }) {
  const [waivers, setWaivers] = useState<Waiver[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);
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
    } else {
      setWaivers(data || []);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchWaivers();
  }, [fetchWaivers]);

  const value = useMemo(
    () => ({
      waivers,
      loading,
      refetchWaivers: fetchWaivers,
      drawerOpened,
      openDrawer,
      closeDrawer,
    }),
    [waivers, loading, fetchWaivers, drawerOpened, openDrawer, closeDrawer]
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
