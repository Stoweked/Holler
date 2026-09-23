# Preview architecture and legacy adapters

For the React/Mantine merge, use the [integration guide](react-integration.md).
The public handoff takes props and callbacks and requires only MantineProvider.
The service and navigation contracts below belong to the existing connected
preview; the destination app does not need to implement them.

## Current preview

The Next host renders the transactions dashboard at `/` and `/dashboard` without
sign-in. `src/app/RuntimeProviders.tsx` selects a stable `createPreviewServices()`
instance and supplies a demo profile with `user: null`. Local fixtures support
reads; service mutations explicitly report that the operation is unavailable.
This adapter is selected deliberately, never as an automatic production fallback.
Other prototype workflows can still simulate local state or success screens.

| Layer | Location | Responsibility |
| --- | --- | --- |
| Public UI | `src/ui/index.ts` | Presentation components, display types, theme |
| Connected composition | `src/ui/connected.ts`, `src/components/layout/AppLayout.tsx` | Existing contexts, navigation, drawers |
| Preview data contract | `src/lib/services/` | Typed operations and service injection |
| Preview navigation | `src/lib/navigation/` | Router actions, pathname, query string |
| Local data | `src/lib/adapters/fixtures/` | Read-only sample services and transaction filtering |
| Retained backend | `src/lib/adapters/supabase/`, `src/lib/supabase/` | Legacy queries, server actions, storage, client factories |
| Framework host | `src/app/`, `src/lib/adapters/next/` | Routes, runtime composition, metadata, fonts, telemetry |

Connected preview components use `useServices()` and navigation hooks rather than
importing Next or Supabase directly. New presentation exports must go further:
no application contexts, service/navigation providers, fixtures, or backend SDKs
in their dependency graph. `scripts/export-react.mjs` enforces that boundary.

## Retained authentication and backend code

Cognito is scoped to `src/app/auth/layout.tsx` for the legacy `/auth/callback`
route. It is not mounted around the dashboard. Its current configuration lives
in `src/components/providers/CognitoProvider.tsx`; the default preview and handoff
require no authentication environment variables. `_legacy_auth/` is archived
source, not a set of active login/signup routes.

The legacy Next/Supabase service composition is retained for reference and is not
selected by the default runtime. Cognito login does not establish the Supabase
session expected by those data operations. No auth bridge, hosted configuration,
database schema, or production data migration has been performed.

`ProfileProvider` accepts account state from the preview host; it does not fetch
or authenticate on its own. The default refresh callback is a no-op. AppLayout
composes feature providers through `HollerFeatureProviders`. These providers and
the connected dashboard are excluded from the presentation-only handoff.

## Continuing the separation

For components needed by the destination app, extract typed views with explicit
props/callbacks, retain connected wrappers for preview use, and add the views to
`src/ui/index.ts`. Keep fixture data in examples. Let the destination application
choose its AWS services, data layer, and router without adopting `AppServices`.

Next.js and Supabase dependencies remain in this repository to support retained
host/reference code. They are not copied into the generated handoff. Removing
those dependencies from the repository itself is a separate cleanup after the
remaining host and legacy code are retired.

## Validation

- `npm run test:react-handoff` generates, type-checks, and render-tests the isolated UI.
- `npm run check:ui` checks UI types and transitive framework/backend boundaries.
- `npm run typecheck` checks the complete current application.
- `npm run test:portability` checks connected providers, URL state, links, fixtures,
  and filtering while blocking Next/Supabase package loads.

These checks do not validate hosted reads/writes, real authentication, browser
appearance, or destination-app integration. A Next host build also requires its
platform-specific compiler; compiler installation issues are separate from the
standalone React export.
