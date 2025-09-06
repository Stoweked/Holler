// src/app/(dashboard)/dashboard/page.tsx
"use client";

import PrimaryActionsCard from "@/features/wallet/components/PrimaryActionsCard";
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
    <>
      {mounted && isMobile && <PrimaryActionsCard />}
      <TransactionsTable />
    </>
  );
}
