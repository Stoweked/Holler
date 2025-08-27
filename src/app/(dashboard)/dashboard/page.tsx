"use client";

import AppLayout from "@/components/layout/AppLayout";
import PrimaryActionsCard from "@/features/primaryActions/components/PrimaryActionsCard";
import TransactionsTable from "@/features/transactions/components/TransactionsTable";
import { useViewportSize } from "@mantine/hooks";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const { width } = useViewportSize();
  const isMobile = width < 768;

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <AppLayout>
      {mounted && isMobile && <PrimaryActionsCard />}
      <TransactionsTable />
    </AppLayout>
  );
}
