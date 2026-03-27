// src/contexts/ProfileContext.tsx
"use client";

import { createContext, useContext } from "react";
import { useAuth } from "react-oidc-context";

// We keep these interfaces roughly the same to not break consumers,
// but map them to Cognito where possible.
interface UserProfile {
  username?: string;
  phone_number?: string;
  full_name?: string;
  avatar_url?: string;
  [key: string]: unknown;
}

interface ProfileContextType {
  user: unknown | null; 
  profile: UserProfile | null;
  loading: boolean;
  fetchProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  
  const value = {
    user: auth.user || null,
    profile: auth.isAuthenticated ? auth.user?.profile : null,
    loading: auth.isLoading,
    fetchProfile: async () => {}, // No-op since we don't have a DB profile fetch yet.
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
