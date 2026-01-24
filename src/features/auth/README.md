# Authentication Feature

## 📌 Overview

The **Authentication** feature handles all aspects of user identity, including sign-up, login, session management, and password recovery. It integrates directly with Supabase Auth and provides the UI flows for onboarding new users.

## 📂 Internal Structure

All code for this feature is self-contained in `src/features/auth`.

```
src/features/auth/
├── actions/             # Server Actions (login, signup, logout)
├── components/          # Auth forms and UI elements
├── hooks/               # Logic for multi-step forms
├── types/               # Auth-specific type definitions
└── index.ts             # Public API (Barrel file)
```

## 🧩 Key Components

### `LoginForm.tsx`

The primary sign-in interface.

- **Responsibility**: Captures email/password and calls the login Server Action.
- **Props**: None.

### `MultiStepSignupForm.tsx`

The sophisticated onboarding wizard.

- **Responsibility**: Guiding users through account creation, profile setup, and initial preferences.

### `OAuthButtons.tsx`

Social login options.

- **Responsibility**: Renders buttons for Google/Github login flows.

## 🎣 Hooks & State Management

### `useMultiStepSignupForm.ts`

**Purpose**: Manages the complex state of the multi-step registration wizard.
**State**: Tracks current step index, form data validation, and accumulated user input.

## 🛠️ Server Actions

- **`login.ts`**: Validates credentials and creates a Supabase session.
- **`signup.ts`**: Creates a new user record in Supabase and handles initial data insertion.
- **`logout.ts`**: Invalidates the current session foundation.
- **`forgot-password.ts` / `reset-password.ts`**: Handles recovery flows.

## 🔗 Dependencies

- **Supabase**: The core backend provider for Auth.
- **Middleware**: `middleware.ts` relies on this feature's session handling to protect routes.
- **Account**: Once authenticated, user data is managed by the `account` feature.
