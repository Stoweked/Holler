# Wallet Feature

## 📌 Overview

The **Wallet** feature is the financial core of the application. It handles user balances and facilitates money movement (deposits, transfers, sending, requesting). It uses a wizard-like flow (`TransactionDrawer`) to guide users through complex multi-step payments.

## 📂 Internal Structure

All code for this feature is self-contained in `src/features/wallet`.

```
src/features/wallet/
├── components/          # GUI components (Drawers, Steps, Cards)
│   └── icons/           # Feature-specific SVG icons
├── contexts/            # WalletContext (Global state for this feature)
├── hooks/               # Logic hooks (Step management, Submission)
├── types/               # TypeScript definitions
└── index.ts             # Public API (Barrel file)
```

## 🧩 Key Components

### `PrimaryActionsCard.tsx`

The main "Dashboard" widget.

- **Responsibility**: Shows current balance and buttons for [Deposit, Send, Request, Transfer].
- **Props**: None (consumes `WalletContext`)

### `TransactionDrawer.tsx`

The modal/drawer that orchestrates the payment flow.

- **Responsibility**: Renders the correct step component based on the current state.
- **Key Logic**: Switches usage of `PaymentAmountStep`, `ConfirmationStep`, etc.

### `PaymentAmountStep.tsx`

Input screen for money values.

- **Features**: Currency masking, balance validation (cannot send more than you have).

## 🎣 Hooks & State Management

### `WalletContext` (`contexts/WalletContext.tsx`)

**Scope**: Wraps the Feature/Dashboard.
**State**:

- `balance`: Current user balance.
- `isDrawerOpen`: Visibility of the transaction drawer.
- `actionType`: Current mode (`deposit` | `send` | `request` | `transfer`).

### `useTransactionState` (`hooks/useTransactionState.ts`)

**Purpose**: Manages the wizard state machine.
**State**:

- `currentStep`: `selectContact` -> `enterAmount` -> `confirm` -> `success`
- `transactionData`: Partial data built up over the steps.

## 💾 Data Models (`types/wallet.ts`)

```typescript
export type TransactionActionType = "deposit" | "send" | "request" | "transfer";

export type TransactionStep =
  | "selectContact"
  | "inviteContact"
  | "enterAmount"
  | "confirm"
  | "selectBank"
  | "success";
```

## 🔗 Dependencies

- **Auth**: Needs an authenticated user ID to fetch balances.
- **Contacts**: "Send" and "Request" flows require selecting a contact from `features/contacts`.
- **Banks**: "Deposit" and "Transfer" flows require bank accounts from `features/banks`.
