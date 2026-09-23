# Connected preview layout

`AppLayout.tsx` composes the portable HollerLayout with TopNav, SideNav, Spotlight,
feature providers, and lazy drawers. It does not require login or redirect to signup.
TopNav and SideNav remain connected to preview application state.

For the destination React app, use HollerLayout, HollerHeader, or HollerDashboard
from `src/ui/index.ts` and supply navigation/actions through slots and callbacks.
See [React integration](../../../docs/react-integration.md).
