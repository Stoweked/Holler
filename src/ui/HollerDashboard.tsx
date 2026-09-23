import type { ReactNode } from "react";
import { useDisclosure } from "@mantine/hooks";
import { HollerLayout } from "./HollerLayout";
import { HollerHeader } from "./HollerHeader";
import { TransactionsTableView, type TransactionsTableViewProps } from "../features/transactions/components/TransactionsTableView";

export interface HollerDashboardProps extends TransactionsTableViewProps {
  sidebar?: ReactNode;
  headerActions?: ReactNode;
  search?: ReactNode;
}

/** A Mantine layout with controlled transaction data; no application providers required. */
export function HollerDashboard({ sidebar, headerActions, search, ...tableProps }: HollerDashboardProps) {
  const [navigationOpened, { toggle }] = useDisclosure(false);
  return (
    <HollerLayout
      header={<HollerHeader navigationOpened={navigationOpened} onToggleNavigation={sidebar ? toggle : undefined} search={search} actions={headerActions} />}
      sidebar={sidebar}
      navigationOpened={navigationOpened}
    >
      <TransactionsTableView {...tableProps} />
    </HollerLayout>
  );
}
