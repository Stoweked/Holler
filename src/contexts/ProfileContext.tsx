"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { createClient } from "@/lib/supabase/client";
import { User, RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { Profile } from "@/features/account/types/account";

interface ProfileContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  fetchProfile: () => void; // Keep for manual fetches
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createClient());
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // This function is now only for the initial load and auth changes
  const fetchProfile = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUser(user);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
      } else if (data) {
        setProfile(data);
      }
    } else {
      setUser(null);
      setProfile(null);
      router.push("/");
    }
    setLoading(false);
  }, [supabase, router]);

  useEffect(() => {
    // Initial fetch and auth state handling remain the same
    fetchProfile();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        fetchProfile();
      } else if (event === "SIGNED_OUT") {
        router.push("/");
      }
    });

    // We still need a separate effect for the realtime subscription
    const profileChannel = supabase
      .channel(`public:profiles:id=eq.${user?.id}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE", // We only care about updates
          schema: "public",
          table: "profiles",
          filter: `id=eq.${user?.id}`,
        },
        // ✅ INSTEAD of re-fetching, use the payload to update the state directly!
        (payload: RealtimePostgresChangesPayload<Profile>) => {
          console.log("Realtime update received:", payload);
          setProfile(payload.new as Profile);
        }
      )
      .subscribe();

    return () => {
      subscription?.unsubscribe();
      supabase.removeChannel(profileChannel);
    };
    // The dependency array needs to be correct to avoid stale closures
  }, [user, supabase, router, fetchProfile]);

  const value = {
    user,
    profile,
    loading,
    fetchProfile,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
