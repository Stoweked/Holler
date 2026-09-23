# Next preview host

This directory hosts the local design preview. It is excluded from the React UI
handoff. The destination app supplies its own entry point and routing.

- `(landing)/page.tsx`: `/`, the transactions dashboard. The folder name is historical.
- `(dashboard)/dashboard/page.tsx`: `/dashboard`, the same dashboard.
- `(dashboard)/layout.tsx`: connected AppLayout and preview query navigation.
- `layout.tsx`: root Mantine styling/providers, font loading, and RuntimeProviders.
- `RuntimeProviders.tsx`: read-only fixture services, demo profile, and Next navigation.
- `auth/layout.tsx` and `auth/callback/`: retained Cognito callback composition.

The default dashboard has no sign-in requirement and needs no backend credentials.
Login/signup source under `_legacy_auth/` is archived, not active app routes.
See [preview architecture](../../docs/ui-decoupling.md) and the
[React integration guide](../../docs/react-integration.md).
