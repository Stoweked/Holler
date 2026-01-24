# Libraries & Utilities

## 📌 Overview

The `lib` directory is for **framework-agnostic** utilities, external library configurations, and shared helpers that don't fit into a specific UI component or feature.

## 📂 Internal Structure

```
src/lib/
├── supabase/            # Supabase Client & Server Client factories
├── hooks/               # Generic (non-business) hooks (e.g., useMediaQuery)
├── data/                # Static constants, country codes, enums
└── utils.ts             # Small helper functions (date formatting, currency)
```

## 🧩 Key Submodules

### `supabase/`

Contains the setup for the singleton Supabase client.

- `client.ts`: Browser-side client.
- `server.ts`: Server-side client (for Actions/API routes).

### `hooks/`

Generic React hooks that are **not** tied to business logic.

- ✅ `useDebounce`, `useWindowResize`
- ❌ `useTransactions` (This belongs in `src/features/transactions/hooks`)

## 📏 Guidelines

- **Pure Functions**: Most code here should be pure functions (input -> output).
- **No JSX**: Avoid UI code in `lib`. Keep it for logic and data processing.
