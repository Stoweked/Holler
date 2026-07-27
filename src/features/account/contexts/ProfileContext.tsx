// src/contexts/ProfileContext.tsx
"use client";

import { createContext, useContext, useMemo } from "react";
import { useAuth } from "react-oidc-context";
import type { IdTokenClaims, User } from "oidc-client-ts";
import { Profile } from "../types/account";

interface ProfileContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  fetchProfile: () => Promise<void>;
}

function toProfile(claims: IdTokenClaims | undefined): Profile | null {
  if (!claims?.sub) return null;

  return {
    id: claims.sub,
    email: claims.email ?? "",
    full_name: claims.name,
    first_name: claims.given_name,
    last_name: claims.family_name,
    username: claims.preferred_username,
    avatar_url: claims.picture,
    phone_number: claims.phone_number,
    auth_provider: "cognito",
  };
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  const value = useMemo<ProfileContextType>(
    () => ({
      user: auth.user ?? null,
      profile: auth.isAuthenticated ? toProfile(auth.user?.profile) : null,
      loading: auth.isLoading,
      fetchProfile: async () => {}, // No-op since we don't have a DB profile fetch yet.
    }),
    [auth.user, auth.isAuthenticated, auth.isLoading]
  );

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
