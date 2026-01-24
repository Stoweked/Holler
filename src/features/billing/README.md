# Billing Feature

## 📌 Overview

The **Billing** feature handles the monetization aspects of the platform itself (subscriptions, service fees) rather than the peer-to-peer wallet transactions. It allows users to view their subscription status and download invoices.

## 📂 Internal Structure

All code for this feature is self-contained in `src/features/billing`.

```
src/features/billing/
├── components/          # Tables, Invoices
└── index.ts             # Public API
```

## 🧩 Key Components

### `BillingSettings.tsx`

The dashboard view.

- **Responsibility**: Container for payment methods and history.

### `BillingTable.tsx`

History of platform payments.

- **Responsibility**: Shows monthly subscription charges or per-transaction service fees.
- **Differs from Transactions**: This table is for what the user pays _us_ (Holler), not what they pay _others_.

## 🔗 Dependencies

- **Account**: Nested within the Account Settings area.
