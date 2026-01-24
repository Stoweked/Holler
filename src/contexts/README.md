# Global Contexts

## 📌 Overview

This directory contains React Context Providers that manage **global** application state.
**Architectural Note:** We prefer _feature-local_ contexts (located in `src/features/<feature>/contexts`) over global contexts whenever possible to keep features decoupled. Only data that is truly "app-wide" belongs here.

## 📂 Key Contexts

### `ModalContext.tsx`

- **Purpose**: A centralized system for managing modal dialogs.
- **Why Global?**: Modals usually need to overlay the entire app (`z-index`), and triggering them can happen from deeply nested components that shouldn't need to know about the modal's internal state.

### `UserContext` / `SessionContext` (if applicable)

- **Purpose**: Holding the authenticated user's session.
- **Why Global?**: Almost every component needs to know _who_ is logged in.

## 🛠️ Usage

Wrap the application in these providers in `src/app/layout.tsx`.

```tsx
<ModalProvider>{children}</ModalProvider>
```
