"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Profile } from "../types/account";

export interface ProfileContextType {
  user: { id: string } | null;
  profile: Profile | null;
  loading: boolean;
  fetchProfile: () => Promise<void>;
  signOut?: () => void;
}

const anonymousProfile: ProfileContextType = {
  user: null,
  profile: null,
  loading: false,
  fetchProfile: async () => {},
};
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

/** The host supplies account state; rendering the UI does not require authentication. */
export function ProfileProvider({ children, value = anonymousProfile }: {
  children: ReactNode;
  value?: ProfileContextType;
}) {
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
