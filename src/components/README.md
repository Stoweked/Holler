# Shared components

This directory contains both reusable views and connected preview components.
Its contents are not automatically part of the React handoff: the curated exports
in `src/ui/index.ts` define the supported public API.

- `layout/`: preview AppLayout, TopNav, and SideNav; these use application state.
- `modals/`: preview dialogs, including feedback and policy content.
- `spotlight/`: preview command palette and application actions.
- `providers/`: retained host providers, including Cognito.
- `shared/`: common UI and helpers; exported views must remain props/callback based.

Portable shell/header/dashboard composition lives in `src/ui/`. Use the
[React integration guide](../../docs/react-integration.md) when moving designs.
