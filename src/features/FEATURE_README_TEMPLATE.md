# [Feature Name] Feature

## 📌 Overview

[One or two sentences describing what business problem this feature solves.]

## 📂 Internal Structure

All code for this feature is self-contained in `src/features/[feature-name]`.

```
src/features/[feature-name]/
├── components/          # Feature-specific UI components
├── hooks/               # Logic and state handling hooks
├── types/               # TypeScript definitions
├── actions/             # (Optional) Server Actions
└── index.ts             # Public API (Barrel file)
```

## 🧩 Key Components

### `[ComponentName].tsx`

[Brief description of what this component does]

- **Responsibility**: [e.g., Rendering the main list, handling the form]
- **Props**: [Key props, if relevant]

### `[ComponentName].tsx`

...

## 🎣 Hooks & State Management

### `[HookName].ts`

**Purpose**: [What logic does this encapsulate?]
**State**: [What state does it manage?]

## 🛠️ Server Actions (If applicable)

- **`[actionName].ts`**: [Description of the server-side logic, inputs/outputs]

## 💾 Data Models

```typescript
// Important types or interfaces
export interface [InterfaceName] {
  ...
}
```

## 🔗 Dependencies

- **[Other Feature]**: [Why is it needed?]
- **[External Lib]**: [e.g., use of @mantine/form]
