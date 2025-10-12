# Wallet

This feature provides the core functionality for managing a user's wallet, including displaying their balance and handling primary payment actions like depositing, sending, requesting, and transferring funds.

### Key Components

- **`PrimaryActionsCard.tsx`**: Displays the user's current balance and provides the main entry points for all wallet actions (Deposit, Send, Request, Transfer).
- **`TransactionDrawer.tsx`**: A unified, multi-step drawer that handles the entire transaction flow for all action types, from selecting a contact to confirming the transaction.
- **`ConfirmationStep.tsx`**: A reusable component for displaying a final confirmation of a transaction before submission.
- **`PaymentAmountStep.tsx`**: A step within the `TransactionDrawer` for entering the transaction amount and other details like notes or lien waivers.
- **`AccountToggle.tsx`**: A component that allows users to switch between different accounts.

### Hooks & Contexts

- **`useTransactionState.ts`**: Manages the state of a transaction as a user moves through the steps in the `TransactionDrawer`.
- **`useTransactionConfirmation.ts`**: Handles the final submission of a transaction.
- **`WalletContext.tsx`**: Provides the user's balance and functions for opening and closing the transaction drawer to all components wrapped within it.

### How to Use

The wallet feature is integrated into the main application layout and is accessible from the main dashboard. To initiate a transaction, you can call the `openActionDrawer` function from the `useWallet` hook, which will open the `TransactionDrawer` and guide the user through the appropriate steps.

### Related Features

- **Transactions**: The wallet feature creates transactions, which are then displayed in the transaction history.
- **Banks**: The wallet feature uses the user's connected bank accounts to make and receive payments.
- **Contacts**: The wallet feature allows users to send and request money from their contacts.
