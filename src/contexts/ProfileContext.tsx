// src/contexts/ProfileContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { Profile } from "@/features/profile/types/profile";
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
        if (JSON.stringify(session.user) !== JSON.stringify(user)) {
          setUser(session.user);
        }
      }
    });

    // ** NEW: Subscribe to profile changes **
    const profileChannel = supabase
      .channel("public:profiles")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "profiles",
          filter: `id=eq.${user?.id}`,
        },
        (payload) => {
          console.log("Profile change received!", payload);
          setProfile(payload.new as Profile);
        }
      )
      .subscribe();

    return () => {
      subscription?.unsubscribe();
      // ** NEW: Unsubscribe from the channel when the component unmounts **
      supabase.removeChannel(profileChannel);
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
