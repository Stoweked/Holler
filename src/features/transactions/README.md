# Transactions Feature

## 📌 Overview

The **Transactions** feature is the historical record keeper of the application. It provides a robust, filterable, and sortable view of all financial activities (deposits, transfers, payments). It allows users to drill down into specific transaction details.

## 📂 Internal Structure

All code for this feature is self-contained in `src/features/transactions`.

```
src/features/transactions/
├── actions/             # Server Actions (data fetching)
├── components/          # Tables, Drawers, Filters
│   └── filters/         # Filter-specific UI sub-components
├── hooks/               # State logic for filtering
├── types/               # Transaction data interfaces
└── index.ts             # Public API (Barrel file)
```

## 🧩 Key Components

### `TransactionsTable.tsx`

The main data grid.

- **Responsibility**: Renders the list of transactions. Handles sorting UI.
- **Props**: Receives the raw list of transactions.

### `TransactionDetailsDrawer.tsx`

The "inspector" view.

- **Responsibility**: Slides in to show granular details (timeline, metadata, documents) for a single transaction.

### `filters/TransactionFilters.tsx`

The control panel for the table.

- **Responsibility**: Housing date pickers, status dropdowns, and search inputs.

## 🎣 Hooks & State Management

### `useTransactionFilters.ts`

**Purpose**: Manages the complex state of active filters.
**State**: serialized URL search params <-> local state synchronization.

## 🛠️ Server Actions

- **`get-transactions.ts`**: The primary data fetcher. It constructs a Supabase query based on the passed filter criteria (date range, status, amount, etc.).

## 💾 Data Models (`types/transaction.ts`)

```typescript
export interface Transaction {
  id: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  type: "deposit" | "withdrawal" | "transfer";
  created_at: string;
  // ... relationships (sender, receiver)
}
```

## 🔗 Dependencies

- **Wallet**: Transactions are created by wallet actions.
- **Projects**: Transactions can be linked to projects.
- **Contacts**: Transactions involve other users/contacts.
