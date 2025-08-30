"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { Profile } from "@/features/auth/types/profile";
import { useRouter } from "next/navigation";

interface ProfileContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createClient());
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async (user: User) => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        setProfile(null); // Clear profile on error
      } else if (data) {
        setProfile(data);
      }
    };

    // First, check for an active session on initial load
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        await fetchProfile(session.user);
      } else {
        router.push("/");
      }
      setLoading(false);
    };

    checkSession();

    // Then, listen for authentication state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setLoading(true);
      if (session) {
        setUser(session.user);
        await fetchProfile(session.user);
      } else {
        setUser(null);
        setProfile(null);
        router.push("/");
      }
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase, router]);

  const value = {
    user,
    profile,
    loading,
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
