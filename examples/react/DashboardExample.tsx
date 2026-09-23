import { useState } from "react";
import { Button, MantineProvider, Stack, TextInput } from "@mantine/core";
import { HollerDashboard, TransactionDetailsDrawer, hollerTheme, type Transaction } from "../../src/ui";
import "../../src/ui/styles.css";

// Example-only fixtures. The AWS-backed host will supply real rows instead.
const exampleTransactions: Transaction[] = [{
  id: "example-1", amount: 125, date: "2026-09-22T12:00:00Z", status: "Completed",
  type: "Sent", from: { type: "self", name: "You" },
  to: { type: "external", name: "Example Contractor" }, bankAccount: "Example account",
}];

export function DashboardExample() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Transaction | null>(null);
  const rows = exampleTransactions.filter((row) => row.to.type === "external" && row.to.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <MantineProvider theme={hollerTheme} defaultColorScheme="light">
      <HollerDashboard
        transactions={rows}
        loading={false}
        error={null}
        onTransactionClick={setSelected}
        hasActiveFilters={Boolean(search)}
        onResetFilters={() => setSearch("")}
        toolbar={<TextInput m="md" aria-label="Search transactions" placeholder="Search transactions" value={search} onChange={(event) => setSearch(event.currentTarget.value)} />}
        sidebar={<Stack p="md"><Button variant="light">Transactions</Button></Stack>}
      />
      <TransactionDetailsDrawer opened={selected !== null} close={() => setSelected(null)} transaction={selected} />
    </MantineProvider>
  );
}
