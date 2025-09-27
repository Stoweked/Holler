# Banks

This feature manages the connection and display of user bank accounts. It allows users to link their external bank accounts to the application, which serve as the primary funding and withdrawal sources for their wallet.

### Key Components

- **`ConnectBankDrawer.tsx`**: A drawer that guides the user through the process of securely connecting a new bank account.
- **`ConnectedBanksDrawer.tsx`**: A drawer component that displays a list of all bank accounts the user has already connected.
- **`BankList.tsx`**: A component that renders a list of individual `BankItem` components.
- **`BankItem.tsx`**: A list item component for displaying a single bank account with its key details.
- **`BankDetailsCard.tsx`**: A card component used to display the details of a specific bank account, often shown during a transaction or selection process.

### How to Use

Users can connect a bank account from their account settings or directly from the wallet feature when they need to add funds or make a transfer. Once connected, their bank accounts will appear as options for funding sources or destinations in the transaction flow.

### Related Features

- **Wallet**: Bank accounts are the primary method for depositing funds into and transferring funds out of the user's wallet.
- **Account**: The management of connected bank accounts is part of the user's main account settings.
