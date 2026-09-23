# Holler UI

Reusable React 19 and Mantine 8 components and layouts for the Holler dashboard.
The destination React app will supply AWS data and application behavior later.
This repository still uses Next.js as a local preview host; Next.js, Supabase,
and authentication providers are excluded from the presentation-only handoff.

## Preview the designs

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000). Both `/` and `/dashboard` show the
transactions dashboard with local sample data, without sign-in or backend
credentials. The preview's service adapter is read-only. Other prototype flows
may display simulated state; they are not live payment or banking integrations.

## Merge components into a React app

```bash
npm run export:react
```

This generates `build/react-ui/` with TSX source, relative imports, styles,
assets, a dependency manifest, and an example. Components accept data through
props and report actions through callbacks. Only `MantineProvider` is required.
The destination app owns AWS access, authentication, routing, and persistence.

Start with the [React integration guide](docs/react-integration.md) and
[typed example](examples/react/DashboardExample.tsx). The curated
[public API](src/ui/index.ts) includes layouts, transaction views and filters,
project cards/grid, bank views, and a contact details card. Account/business
editors and wallet execution workflows remain preview code and are not exported.

## Source map

| Location | Purpose |
| --- | --- |
| `src/ui/index.ts` | Presentation-only public exports |
| `src/ui/connected.ts` | Legacy connected preview API; excluded from the handoff |
| `src/features/` | Feature views, types, and connected preview workflows |
| `src/components/` | Shared components and preview navigation/modals |
| `src/styles/` | Mantine theme, shared styles, and preview CSS |
| `src/app/` | Next routes and preview runtime composition |
| `src/lib/adapters/` | Local fixtures and retained Next/Supabase implementations |
| `public/` | Static assets served at the URL root |
| `examples/react/` | Standalone React/Mantine composition |
| `_legacy_auth/` | Archived authentication source; not active routes |

See [preview architecture](docs/ui-decoupling.md) when maintaining the existing
host. Its service/navigation providers are not requirements for the React handoff.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next preview |
| `npm run build` / `npm run start` | Build / serve the Next host |
| `npm run export:react` | Generate and type-check the React handoff |
| `npm run test:react-handoff` | Regenerate and render-test the isolated handoff |
| `npm run typecheck` | Type-check the application |
| `npm run check:ui` | Check UI types and framework/backend boundaries |
| `npm run test:portability` | Test connected preview contracts and fixtures |
| `npm run lint` | Run ESLint |

## Contributing UI

Keep rendering, responsive layout, and local visual state in components. Supply
records, request state, and action handlers through typed props. Keep backend
SDKs, authentication, routing, and fixtures outside the exported dependency graph.
Prefer Mantine props and CSS Modules. Add supported exports to `src/ui/index.ts`
and update the integration guide when the public surface changes. Feature barrel
files are internal convenience exports, not the portable package API.

Use the [feature documentation template](src/features/FEATURE_README_TEMPLATE.md)
for new feature docs. Link to source types rather than duplicating interfaces that
can drift. Verify browser appearance and interactions in the destination app;
render tests alone do not establish visual parity or AWS integration.
