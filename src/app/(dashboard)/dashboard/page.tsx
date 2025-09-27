// src/app/(dashboard)/dashboard/page.tsx
"use client";

import PrimaryActionsCard from "@/features/wallet/components/PrimaryActionsCard";
import TransactionsTable from "@/features/transactions/components/TransactionsTable";
import { useViewportSize } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useWallet } from "@/contexts/WalletContext";
import TransactionDrawer from "@/features/wallet/components/actions/TransactionDrawer";
import TransactionDetailsDrawer from "@/features/transactions/components/TransactionDetailsDrawer";

export const dynamic = "force-dynamic";

export default function Dashboard() {
  const { width } = useViewportSize();
  const isMobile = width < 768;

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    isActionDrawerOpen,
    closeActionDrawer,
    actionType,
    preselectedParty,
    isDetailsDrawerOpen,
    closeDetailsDrawer,
    selectedTransaction,
  } = useWallet();

  return (
    <>
      {mounted && isMobile && <PrimaryActionsCard />}
      <TransactionsTable />

      <TransactionDrawer
        opened={isActionDrawerOpen}
        close={closeActionDrawer}
        actionType={actionType}
        preselectedParty={preselectedParty}
      />

      <TransactionDetailsDrawer
        opened={isDetailsDrawerOpen}
        close={closeDetailsDrawer}
        transaction={selectedTransaction}
      />
    </>
  );
}
