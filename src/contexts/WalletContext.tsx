// /src/contexts/WalletContext.tsx

import { createContext, useContext, useState } from "react";

interface WalletContextType {
  balance: number;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  // For now, we'll use a hardcoded value as requested.
  // This can be replaced with an API call in the future.
  const [balance] = useState(32640.0);

  const value = {
    balance,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
