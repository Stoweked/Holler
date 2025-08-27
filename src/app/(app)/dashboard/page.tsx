"use client";

import AppLayout from "@/components/layout/AppLayout";
import PrimaryActionsCard from "@/components/primaryActions/PrimaryActionsCard";
import TransactionsTable from "@/components/transactions/TransactionsTable";
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
