# Banks Feature

## 📌 Overview

The **Banks** feature manages the connection between the user's Holler account and their real-world bank accounts. It serves as the bridge for funding the wallet (Deposits) and cashing out (Withdrawals).

## 📂 Internal Structure

All code for this feature is self-contained in `src/features/banks`.

```
src/features/banks/
├── components/          # Drawers, Lists, Cards
├── types/               # Bank account interfaces
└── index.ts             # Public API (Barrel file)
```

## 🧩 Key Components

### `ConnectBankDrawer.tsx`

The primary integration flow.

- **Responsibility**: detailed form or Plaid integration (future?) to securely link a new bank account.

### `ConnectedBanksDrawer.tsx`

Management view.

- **Responsibility**: Shows list of linked accounts and allows removing/unlinking.

### `BankList.tsx`

Reusable list component.

- **Responsibility**: Displays `BankItem` components for selection screens (e.g., "Select funding source").

## 🎣 Hooks & State Management

State for banks is currently derived primarily from server state (fetched data) or passed down from the Wallet context when selecting a source.

## 💾 Data Models (`types/bank.ts`)

```typescript
export interface BankAccount {
  id: string;
  user_id: string;
  bank_name: string;
  account_last4: string;
  account_type: "checking" | "savings";
  is_primary: boolean;
}
```

## 🔗 Dependencies

- **Wallet**: Cannot perform deposits/withdrawals without a linked bank.
- **Account**: Users manage these links from their high-level account settings.
