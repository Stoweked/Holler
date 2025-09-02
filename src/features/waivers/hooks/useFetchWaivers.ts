"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Waiver } from "@/features/waivers/types/waiver";

export function useFetchWaivers() {
  const [waivers, setWaivers] = useState<Waiver[]>([]);
  const [loading, setLoading] = useState(true);
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
      setWaivers(data);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchWaivers();
  }, [fetchWaivers]);

  return { waivers, loading, refetchWaivers: fetchWaivers };
}
