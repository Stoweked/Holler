# Account Feature

## 📌 Overview

The **Account** feature is the user's personal command center. It handles profile management (avatar, name), global app settings (dark mode), and security settings (password reset).

## 📂 Internal Structure

All code for this feature is self-contained in `src/features/account`.

```
src/features/account/
├── actions/             # Server Actions (Mutations)
├── components/          # Profile forms, Setting cards
│   └── profile/         # Profile-specific UI sub-components
├── contexts/            # (Optional) Profile state
├── hooks/               # Form logic
├── types/               # Profile interfaces
└── index.ts             # Public API (Barrel file)
```

## 🧩 Key Components

### `Account.tsx`

The main page layout.

- **Responsibility**: Aggregates all settings cards into a single responsive view.

### `profile/ProfileForm.tsx` & `ProfileCard.tsx`

The identity management UI.

- **Responsibility**: Allows users to view and edit their public persona.

### `ColorModeCard.tsx`

Theme switcher.

- **Responsibility**: Toggles between Light/Dark mode (persisted in local storage or cookie).

## 🎣 Hooks & State Management

### `useProfileForm.tsx`

**Purpose**: Encapsulates form validation (likely Zod) and initial data loading for the profile editor.

## 🛠️ Server Actions

- **`update-profile.ts`**: Updates the `profiles` table in Supabase.
- **`upload-avatar.ts`**: Handles image upload to Supabase Storage and updates the profile record URL.

## 💾 Data Models (`types/profile.ts`)

```typescript
export interface UserProfile {
  id: string; // References auth.users.id
  username: string;
  full_name?: string;
  avatar_url?: string;
  updated_at?: string;
}
```

## 🔗 Dependencies

- **Auth**: This feature is entirely dependent on a valid session.
- **Business**: Business settings are often linked adjacent to personal account settings.
