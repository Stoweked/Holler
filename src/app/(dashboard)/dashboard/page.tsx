// src/app/(dashboard)/dashboard/page.tsx
"use client";

import PrimaryActionsCard from "@/features/wallet/components/PrimaryActionsCard";
import TransactionsTable from "@/features/transactions/components/TransactionsTable";
import { useViewportSize } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useWallet } from "@/features/wallet/contexts/WalletContext";
import TransactionDrawer from "@/features/wallet/components/steps/TransactionDrawer";
import TransactionDetailsDrawer from "@/features/transactions/components/TransactionDetailsDrawer";
import FeaturedHeader from "@/components/layout/FeaturedHeader/FeaturedHeader";
import { Space, Stack } from "@mantine/core";

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

      <Stack gap={0}>
        <TransactionsTable />
        <FeaturedHeader />
        <Space h={100} />
      </Stack>

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
