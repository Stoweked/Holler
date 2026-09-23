# Transactions

Transaction history designs have both presentation-only views and connected
preview wrappers. Import portable components through `src/ui/index.ts`.

## Public handoff

| Export | Source | Inputs and behavior |
| --- | --- | --- |
| `TransactionsTable` | `components/TransactionsTableView.tsx` | Rows, profile, loading/error state, retry/reset/selection callbacks, toolbar slot |
| `TransactionDetailsDrawer` | `components/TransactionDetailsDrawerView.tsx` | Controlled open/close, transaction/profile, optional fee/timeline and action callbacks |
| `TransactionItem` | `components/TransactionItem.tsx` | Transaction, optional profile, click handler |
| `TransactionFilters` | `components/filters/TransactionFilters.tsx` | Controlled values/callbacks and explicit contacts/projects option arrays |

The table displays supplied rows; the host handles filtering, sorting, pagination,
and fetching. Loading, error, empty, and filtered-empty states are supported.
The details view shows a dash for missing fees and disables print/download without
handlers. It does not supply a fake timeline. Display types are defined in
[transaction.ts](types/transaction.ts) and [transactionParty.ts](types/transactionParty.ts).

## Connected preview

`components/TransactionsTable.tsx` obtains services, filter state, and selection
state, then renders the pure table view. `hooks/useTransactionFilters.ts` connects
filters to preview URL state. The current transaction service filters local
fixtures in `src/lib/adapters/fixtures/get-transactions.ts`; it is not a server action.
`components/TransactionDetailsDrawer.tsx` adds preview contact interactions and
sample fee/timeline content around the pure drawer.

See the [integration guide](../../../docs/react-integration.md) for standalone
composition and validation. AWS data loading and action implementation belong to
the destination app.
