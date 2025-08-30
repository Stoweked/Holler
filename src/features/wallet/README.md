# Wallet Components

This directory contains components related to the user's wallet and its primary actions, such as depositing, sending, requesting, and transferring funds.

### Key Components

- **`PrimaryActionsCard.tsx`**: The main component that displays the user's balance and provides entry points for all wallet actions.
- **`TransactionDrawer.tsx`**: A unified, multi-step drawer that handles the entire transaction flow for all action types.
- **`ConfirmationStep.tsx`**: A reusable component for displaying a final confirmation of a transaction before submission.
- **`PaymentAmountStep.tsx`**: A step component for entering the transaction amount and other details.
