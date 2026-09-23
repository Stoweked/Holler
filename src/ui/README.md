# Public React/Mantine UI

`index.ts` is the presentation-only public API. Components receive display data
and request state through props and report user actions through callbacks. Use
`styles.css` with MantineProvider and `hollerTheme` (or merge the theme into the
host's). No service, auth, routing, or feature providers are required.

Follow the [integration guide](../../docs/react-integration.md) and
[typed example](../../examples/react/DashboardExample.tsx). Run
`npm run export:react` to generate the source handoff; run
`npm run test:react-handoff` to verify it in isolation.

`connected.ts`, `HollerProvider`, `HollerFeatureProviders`,
`HollerConnectedDashboard`, and `preview.ts` support the existing preview. They
are excluded from the generated package and are not integration prerequisites.

Add new exports only after removing application contexts, fetches, backend SDKs,
fixtures, and routing assumptions from their transitive dependencies. Keep
prototype wrappers outside the public API.
