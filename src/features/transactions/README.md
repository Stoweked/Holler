# Transactions

This feature is responsible for displaying the user's entire transaction history. It provides robust filtering and sorting capabilities, allowing users to easily find specific transactions.

### Key Components

- **`TransactionsTable.tsx`**: The primary component that renders the list of transactions in a sortable, filterable table.
- **`TransactionItem.tsx`**: A single row in the `TransactionsTable`, representing one transaction.
- **`TransactionDetailsDrawer.tsx`**: A drawer that slides in to display the complete details of a selected transaction, including its timeline and any associated documents.
- **`filters/`**: A sub-directory containing all UI components used for filtering the transaction list, such as by date, amount, contact, status, and type.

### Hooks & Services

- **`useTransactionFilters.ts`**: A hook that manages the state of all active filters and provides the logic for applying them to the transaction list.
- **`get-transactions.ts`**: A service function (Server Action) responsible for fetching the transaction data from the backend based on the applied filters.

### How to Use

This feature serves as the main transaction history page within the application. It is a top-level feature that users navigate to from the primary side navigation.

### Related Features

- **Wallet**: The wallet is the primary source of transaction creation. All payments made or received through the wallet are recorded here.
- **Projects**: Transactions can be associated with specific projects, allowing for project-based financial tracking.
- **Contacts**: Every transaction involves at least one contact (sender or recipient).
