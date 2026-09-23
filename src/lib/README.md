# Libraries and preview infrastructure

- `hooks/`, `data/`: shared helpers and static reference data.
- `services/`: operation contracts and service injection for connected preview code.
- `navigation/`: navigation context for connected preview code.
- `adapters/fixtures/`: read-only local services selected by RuntimeProviders.
- `adapters/next/`: Next navigation and retained server-action composition.
- `adapters/supabase/`: legacy queries/actions; not selected by the default preview.
- `supabase/`: client factories used by the retained backend adapter.

Only pure helpers needed by public UI exports belong in the handoff. Presentation
components accept props and callbacks; they do not import services, navigation,
implementation adapters, or backend SDKs. Connected preview wrappers may use the
service/navigation contracts. See [preview architecture](../../docs/ui-decoupling.md)
and [React integration](../../docs/react-integration.md).
