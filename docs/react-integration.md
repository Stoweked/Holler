# Mantine UI handoff for the AWS-backed React app

The deliverable is presentation-only React 19 + Mantine 8 source. Components accept
data through props and report user actions through callbacks. The destination app
owns AWS access, authentication, authorization, routing, caching, and persistence.
No AWS client or new backend abstraction needs to be added to the UI package now.

## Responsibilities

| Reusable UI | Destination React app, when AWS is connected |
| --- | --- |
| Mantine components, responsive layouts, theme, CSS Modules, assets | API clients, credentials/session handling, routing |
| Typed display models and callback props | Mapping API responses into display models |
| Loading, error, empty and populated states | Loading requests, retries, caching, pagination |
| Local visual state, such as an open filter drawer | Query state, row selection, mutations and their outcomes |

Data flows from the AWS-backed app into component props. User actions flow back
through callbacks to that app. Components must not fetch on mount, authenticate,
read backend environment variables, import backend SDKs, or dispatch application
actions through global browser events.

## Copy the UI into the destination app

Run `npm run export:react` in the original repository. It generates
`build/react-ui/` with source, styles, assets, a dependency manifest, and a typed
example. Copy its `src/` to `src/holler/` in the destination app and preserve the
folder structure. Internal imports are relative, so there is no `@/` alias to merge.
Copy the generated `public/` contents into the host's public asset directory,
preserving `/images/...` URLs. Reconcile filenames with any existing host assets.

This is TSX source for the destination bundler, not a compiled JavaScript package.
The host needs CSS Modules and the included Mantine PostCSS configuration; merge
that configuration rather than overwriting existing plugins. Install/reconcile
the generated manifest's peer dependencies: React, React DOM, Mantine core/hooks/
dates, Day.js, and Hugeicons. Use the host's existing React/Mantine installation.

Import `./holler/ui/styles.css` once and use `hollerTheme` or merge it into the
host's theme. The styles include shared Mantine input overrides; review those for
conflicts with existing host styles. Font loading remains a host choice. No auth,
service, routing, or feature-context providers are required—only `MantineProvider`.

## Minimal integration

```tsx
import { MantineProvider } from '@mantine/core';
import { HollerDashboard, hollerTheme, type Transaction } from './holler/ui';
import './holler/ui/styles.css';

type Props = {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  retry: () => void;
  openTransaction: (transaction: Transaction) => void;
};

export function TransactionsPage(props: Props) {
  return (
    <MantineProvider theme={hollerTheme}>
      <HollerDashboard
        transactions={props.transactions}
        loading={props.loading}
        error={props.error}
        onRetry={props.retry}
        onTransactionClick={props.openTransaction}
      />
    </MantineProvider>
  );
}
```

If the app already has a `MantineProvider`, use it instead of adding another.
`examples/react/DashboardExample.tsx` is a working typed composition with fixture
rows, local search, a sidebar, and the controlled transaction details drawer.
Fixtures live only in the example; components never substitute fake data.

## Supported components and layouts

- `HollerLayout`: header/sidebar/content slots and controlled mobile-nav state.
- `HollerHeader`: brand, search and action slots; navigation-toggle callback.
- `HollerDashboard`: composed layout and controlled transaction list, plus sidebar,
  search and header-action slots. Only mobile navigation state is internal.
- `TransactionsTable`: rows, optional profile display data, loading/error states,
  retry/reset callbacks, selection callback, and a toolbar slot.
- `TransactionFilters`: controlled filter values/callbacks plus explicit contact
  and project option arrays. It does not fetch options or update the URL.
- `TransactionItem`: row data, optional profile display data, click callback.
- `TransactionDetailsDrawer`: controlled open/close, transaction/profile data,
  optional fee/timeline content and contact/print/download/report callbacks.
  Missing fees show a dash, and print/download actions are disabled without handlers.
- `ProjectsGrid`, `ProjectCard`, `BankItem`, `BankDetailsCard`, `BankProfileModal`,
  `ContactDetailsCard`, and `OptionButton`: typed data and interaction props. Project
  status/progress come from supplied data, with no sample balances built in. Bank
  disconnection requires an explicit callback and accepts an in-progress state.

Use the lower-level layout or table when the destination app already has its own
navigation. The full dashboard uses a page-sized Mantine AppShell. Import individual
source modules if the host needs finer-grained component integration.

## Plug AWS data in later

1. Keep fixture data in the host's development examples until its data layer exists.
2. Fetch through the destination app's chosen AWS integration outside this package.
3. Map responses into the exported display types. Existing names such as
   `avatar_url` are plain view-model fields, not a requirement on the AWS schema.
4. Pass data and request state into the UI. Pass selection/mutation handlers as
   callbacks. Render success only after the host confirms the operation succeeded.
5. Keep filtering/pagination semantics in the host. `TransactionsTable` displays
   exactly the rows supplied; `TransactionFilters` only reports control changes.
6. Test the host integration with real authorization and API behavior separately
   from visual component testing.

No choice of AWS service, SDK, authentication scheme, or router is imposed by the
components. The original connected workflows remain available in the repository
for reference through `src/ui/connected.ts`, but are excluded from this handoff.
Account/business editing and wallet execution workflows have not been converted
into presentation-only exports. Their existing preview implementation remains in
place; add them to the public UI surface only after removing application dependencies.

## Validation

`npm run test:react-handoff` regenerates the handoff, type-checks the generated code,
and renders exported rows/layouts and loading/error/empty states using React and
Mantine alone. The exporter rejects app contexts, service/navigation providers,
backend implementations, fixtures, and backend/auth SDK imports from the exported
graph. Tests also block the original repo's source and aliases.

`npm run check:ui`, `npm run typecheck`, and `npm run test:portability` validate the
existing preview too. Server-rendered test markup does not validate browser CSS,
responsive behavior, or callbacks fired by real clicks; perform those checks in
the destination app before merging. No destination app or AWS backend was supplied,
so no external integration or deployment has been performed.
