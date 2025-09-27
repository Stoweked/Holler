# Contacts

This feature allows users to view and manage their personal and business contacts. It provides the foundation for sending and receiving payments within the application.

### Key Components

- **`ContactsDrawer.tsx`**: The main drawer component that displays a searchable list of all contacts.
- **`ContactList.tsx`**: Renders the alphabetized and searchable list of contacts within the drawer.
- **`ContactItem.tsx`**: A single contact entry in the list.
- **`ContactDetailsCard.tsx`**: A compact card used to display a selected contact's information, for example, in the transaction flow.
- **`ContactModal.tsx`**: A modal that displays a detailed view of a contact's profile.

### Hooks & Contexts

- **`useContacts.ts`**: A hook for fetching and managing the list of contacts.
- **`FavoritesContext.tsx`**: Provides state management for starring and unstarring favorite contacts, which appear at the top of the contact list.

### Actions

- **`get-contacts.ts`**: A Server Action that fetches all of the user's contacts from the database.

### How to Use

The contacts feature is primarily used within the `wallet` feature. When a user initiates a "Send" or "Request" action, the `ContactsDrawer` is opened, allowing them to select a recipient or sender.

### Related Features

- **Wallet**: The contacts list is essential for initiating transactions to other users.
- **Transactions**: Contacts are displayed as the sender or recipient in the transaction history details.
