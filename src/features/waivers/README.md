# Waivers

This feature handles the creation, management, and editing of lien waivers. Users can create new waivers from scratch, use predefined templates, and attach them to relevant transactions.

### Key Components

- **`LienWaiversDrawer.tsx`**: The main drawer component that orchestrates the entire waiver creation and editing process.
- **`WaiverEditor.tsx`**: A rich text editor that allows users to create and modify the content of a lien waiver.
- **`WaiverInitialStep.tsx`**: The first step in the waiver creation flow, where users can choose to create a new waiver or select an existing template.
- **`WaiverTemplatesStep.tsx`**: A step that displays a list of available waiver templates for the user to choose from.

### Hooks & Contexts

- **`useWaiver.tsx`**: A hook that manages the state for the waiver creation and editing process within the `LienWaiversDrawer`.
- **`WaiversContext.tsx`**: Provides access to the list of waivers, as well as functions to open the waiver management drawer.

### How to Use

The waivers feature is typically accessed when creating or editing a transaction that requires a lien waiver. The `openWaiversDrawer` function from the `useWaivers` hook can be called to initiate the waiver creation or selection process.

### Related Features

- **Transactions**: Waivers can be attached to transactions to signify that payment for certain services has been completed.
- **Projects**: Lien waivers are often associated with specific projects to track payment and work completion.
