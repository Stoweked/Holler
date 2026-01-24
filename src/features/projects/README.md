# Projects Feature

## 📌 Overview

The **Projects** feature allows users to organize their financial activities around specific jobs or construction sites. Projects act as containers for transactions and lien waivers, enabling job-costing and better financial organization.

## 📂 Internal Structure

All code for this feature is self-contained in `src/features/projects`.

```
src/features/projects/
├── actions/             # Server Actions (CRUD operations)
├── components/          # Drawers, Lists, Forms
├── contexts/            # ProjectsContext (Global state)
├── hooks/               # Logic for drawer management
├── types/               # Project data interfaces
└── index.ts             # Public API (Barrel file)
```

## 🧩 Key Components

### `ProjectsDrawer.tsx`

The creation/editing form.

- **Responsibility**: Provides the UI for creating a new project (name, address, client) or editing an existing one.

### `ProjectList.tsx` (or similar)

The main view.

- **Responsibility**: scannable list or grid of active projects.

## 🎣 Hooks & State Management

### `ProjectsContext` (`contexts/ProjectsContext.tsx`)

**Scope**: Wraps parts of the app that need access to the project list.
**State**:

- `projects`: Array of fetched project objects.
- `isDrawerOpen`: Visibility of the creation/edit drawer.

### `useProjectsDrawer.ts`

**Purpose**: Easy access to open/close the project drawer and set the "editing" state (i.e., which project is being modified).

## 🛠️ Server Actions

- **`create-project.ts`**: Inserts a new project record.
- **`update-project.ts`**: Modifies project details.
- **`archive-project.ts`**: Soft-deletes or hides a project from the active view.

## 💾 Data Models (`types/projects.ts`)

```typescript
export interface Project {
  id: string;
  name: string;
  client_name?: string;
  address?: string;
  status: "active" | "archived" | "completed";
  created_at: string;
}
```

## 🔗 Dependencies

- **Transactions**: Transactions are often tagged with a `project_id`.
- **Waivers**: Lien waivers are almost always generated in the context of a Project.
