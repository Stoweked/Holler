// src/features/business/hooks/useBusinessProfile.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { useServices } from "@/lib/services/ServicesProvider";
import { useProfile } from "@/features/account/contexts/ProfileContext";
import { Business } from "../types/business";
import { notifications } from "@mantine/notifications";
import { BusinessRole } from "../types/businessRole";



export function useBusinessProfile() {
  const { getBusinessProfile } = useServices();
  const { user } = useProfile();
  const [businessProfile, setBusinessProfile] = useState<Business | null>(null);
  const [userRole, setUserRole] = useState<BusinessRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  const fetchBusinessProfile = useCallback(async () => {
    if (!user) {
      setLoading(false);
      setBusinessProfile(null);
      setUserRole(null);
      return;
    }

    if (initialLoad) {
      setLoading(true);
    }

    try {
      const result = await getBusinessProfile();
      setBusinessProfile(result?.business ?? null);
      setUserRole(result?.role ?? null);
    } catch (e) {
      console.error("Error fetching business profile:", e);
      notifications.show({
        title: "Error",
        message: "Failed to fetch business profile.",
        color: "red",
      });
      setBusinessProfile(null);
      setUserRole(null);
    } finally {
      setLoading(false);
      if (initialLoad) {
        setInitialLoad(false);
      }
    }
  }, [user, initialLoad, getBusinessProfile]);

  useEffect(() => {
    fetchBusinessProfile();
  }, [fetchBusinessProfile]);

  return { businessProfile, userRole, loading, fetchBusinessProfile };
}
