# Projects

This feature allows users to create, manage, and organize their projects. Projects serve as a way to categorize transactions and other related items, providing a clear overview of work and finances.

### Key Components

- **`ProjectsDrawer.tsx`**: The primary drawer component used for creating a new project or editing an existing one.

### Hooks & Contexts

- **`useProjectsDrawer.ts`**: A hook that manages the state and logic for the project creation and editing flow within the `ProjectsDrawer`.
- **`ProjectsContext.tsx`**: Provides a list of all projects to its children and includes functions to open the project management drawer.

### Actions

- **`create-project.ts`**: A Server Action to create a new project.
- **`update-project.ts`**: A Server Action to update the details of an existing project.
- **`archive-project.ts`**: A Server Action to archive a project, removing it from active lists.

### How to Use

The projects feature can be accessed from the main application dashboard or navigation. When creating a transaction, users can optionally associate it with a project to better organize their finances.

### Related Features

- **Transactions**: Transactions can be assigned to a specific project, allowing for project-based cost tracking.
- **Waivers**: Lien waivers are often related to work completed for a specific project.
