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
  // FIX: Initialize the Supabase client only once using useState
  const [supabase] = useState(() => createClient());
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileAndSession = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
        } else if (data) {
          setProfile(data);
        }
        setLoading(false);
      } else {
        // If no user is found on initial check, redirect to the landing page
        setLoading(false);
        router.push("/");
      }
    };

    fetchProfileAndSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        router.push("/");
      } else if (session) {
        // Prevent unnecessary re-renders if user is already set
        if (JSON.stringify(session.user) !== JSON.stringify(user)) {
          setUser(session.user);
        }
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase, router, user]);

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
