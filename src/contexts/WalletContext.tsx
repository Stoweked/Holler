import { createContext, useContext, useState, ReactNode } from "react";
import { TransactionParty } from "@/features/transactions/types/transactionParty";
import { TransactionActionType } from "@/features/wallet/types/wallet";

interface WalletContextType {
  balance: number;
  isActionDrawerOpen: boolean;
  actionType: TransactionActionType | null;
  preselectedParty: TransactionParty | null;
  openActionDrawer: (
    type: TransactionActionType,
    party?: TransactionParty | null
  ) => void;
  closeActionDrawer: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [balance] = useState(32640.0);
  const [isActionDrawerOpen, setActionDrawerOpen] = useState(false);
  const [actionType, setActionType] = useState<TransactionActionType | null>(
    null
  );
  const [preselectedParty, setPreselectedParty] =
    useState<TransactionParty | null>(null);

  const openActionDrawer = (
    type: TransactionActionType,
    party: TransactionParty | null = null
  ) => {
    setActionType(type);
    setPreselectedParty(party);
    setActionDrawerOpen(true);
  };

  const closeActionDrawer = () => {
    setActionDrawerOpen(false);
    // Reset state after a short delay to allow for closing animation
    setTimeout(() => {
      setActionType(null);
      setPreselectedParty(null);
    }, 300);
  };

  const value = {
    balance,
    isActionDrawerOpen,
    actionType,
    preselectedParty,
    openActionDrawer,
    closeActionDrawer,
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
