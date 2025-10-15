"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { TransactionParty } from "@/features/transactions/types/transactionParty";
import { TransactionActionType } from "@/features/wallet/types/wallet";
import { Transaction } from "@/features/transactions/types/transaction";
import { mockTransactions } from "@/mockData/mockTransactions";
import { useDisclosure } from "@mantine/hooks";

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

  // Add state and handlers for the details drawer
  isDetailsDrawerOpen: boolean;
  selectedTransaction: Transaction | null;
  openDetailsDrawer: (transactionId: string) => void;
  closeDetailsDrawer: () => void;
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

  // State for the details drawer
  const [
    isDetailsDrawerOpen,
    { open: openDetails, close: closeDetailsDrawer },
  ] = useDisclosure(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

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
    setTimeout(() => {
      setActionType(null);
      setPreselectedParty(null);
    }, 300);
  };

  const openDetailsDrawer = (transactionId: string) => {
    const transaction =
      mockTransactions.find((t) => t.id === transactionId) || null;
    setSelectedTransaction(transaction);
    closeActionDrawer(); // Close the success drawer first
    setTimeout(() => openDetails(), 300); // Open details with a delay
  };

  const value = {
    balance,
    isActionDrawerOpen,
    actionType,
    preselectedParty,
    openActionDrawer,
    closeActionDrawer,
    isDetailsDrawerOpen,
    selectedTransaction,
    openDetailsDrawer,
    closeDetailsDrawer,
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
