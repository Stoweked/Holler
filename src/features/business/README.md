# Business Feature

## 📌 Overview

The **Business** feature represents the corporate entity behind a user. In Holler, users can transact as individuals or on behalf of a business. This feature handles the business profile metadata (Logo, Tax ID, Address).

## 📂 Internal Structure

All code for this feature is self-contained in `src/features/business`.

```
src/features/business/
├── actions/             # Server Actions (username checks)
├── components/          # Profile Cards, Forms
├── hooks/               # Logic for profile management
└── index.ts             # Public API
```

## 🧩 Key Components

### `BusinessSettings.tsx`

The container page.

- **Responsibility**: Displays the read-only view or the edit form depending on state.

### `BusinessProfileForm.tsx`

The editor.

- **Responsibility**: Validating business specific fields like EIN or Company Name.

## 🎣 Hooks & State Management

### `useBusinessProfile.ts`

**Purpose**: Fetches the business details associated with the current user.
**State**: Uses SWR or React Query (implied) to keep business data fresh.

## 🛠️ Server Actions

- **`check-business-username.ts`**: Verifies uniqueness of the business handle (e.g. `@acme-construction`) before claiming it.

## 🔗 Dependencies

- **Account**: Business profiles are children of a User Account.
- **Transactions**: Invoices are generated using Business profile data.
