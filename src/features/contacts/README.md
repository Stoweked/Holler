# Contacts Feature

## 📌 Overview

The **Contacts** feature manages the user's network of personal and business relationships. This "rolodex" is the foundation for sending and receiving payments (Holler transactions). It supports searching, favoriting, and viewing contact details.

## 📂 Internal Structure

All code for this feature is self-contained in `src/features/contacts`.

```
src/features/contacts/
├── actions/             # Server Actions (Fetch, Create, Edit)
├── components/          # Drawers, Lists, Cards
├── contexts/            # FavoritesContext (UI State)
├── types/               # Contact data interfaces
├── utils/               # Search/sorting helpers
└── index.ts             # Public API (Barrel file)
```

## 🧩 Key Components

### `ContactsDrawer.tsx`

The primary "Select a Person" interface.

- **Responsibility**: Slides in to allow granular searching/picking of a contact, often triggered during a transaction flow.

### `ContactList.tsx`

The scrollable list.

- **Responsibility**: Renders `ContactItem` rows. efficient re-rendering.

### `ContactDetailsCard.tsx`

Read-only view.

- **Responsibility**: Shows small summary of a contact (Avatar, Name, Holler Handle) inside other flows.

## 🎣 Hooks & State Management

### `FavoritesContext` (`contexts/FavoritesContext.tsx`)

**Scope**: Tracks which contacts are pinned to the top.
**State**: List of favorite contact IDs.

### `useContacts.ts` (if exists)

**Purpose**: Abstraction over the fetch/cache query for the contacts list.

## 🛠️ Server Actions

- **`get-contacts.ts`**: Fetches the user's address book from Supabase.

## 💾 Data Models (`types/contact.ts`)

```typescript
export interface Contact {
  id: string;
  user_id: string; // The Holler user ID if they are on the platform
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  avatar_url?: string;
}
```

## 🔗 Dependencies

- **Wallet**: The #1 consumer of this feature. Sending money requires picking a contact.
- **Transactions**: History shows names/avatars from the Contact record.
