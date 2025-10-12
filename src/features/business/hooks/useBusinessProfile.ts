// src/features/business/hooks/useBusinessProfile.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useProfile } from "@/features/account/contexts/ProfileContext";
import { Business } from "../types/business";
import { notifications } from "@mantine/notifications";
import { BusinessRole } from "../types/businessRole";

const supabase = createClient();

export function useBusinessProfile() {
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
      // Find the business_id and role associated with the current user
      const { data: adminData, error: adminError } = await supabase
        .from("business_admins")
        .select("business_id, role")
        .eq("user_id", user.id)
        .limit(1)
        .single();

      if (adminError || !adminData) {
        setBusinessProfile(null);
        setUserRole(null);
        setLoading(false);
        if (initialLoad) setInitialLoad(false);
        return;
      }

      // Fetch the full business profile using the found business_id
      const { data: businessData, error: businessError } = await supabase
        .from("businesses")
        .select("*")
        .eq("id", adminData.business_id)
        .single();

      if (businessError) {
        throw businessError;
      }

      setBusinessProfile(businessData);
      setUserRole(adminData as unknown as BusinessRole);
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
  }, [user, initialLoad]);

  useEffect(() => {
    fetchBusinessProfile();
  }, [fetchBusinessProfile]);

  return { businessProfile, userRole, loading, fetchBusinessProfile };
}
