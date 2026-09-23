# Legacy Supabase client factories

`client.ts` and `server.ts` create the browser and server clients used by the
retained adapter in `src/lib/adapters/supabase/`. The default dashboard uses local
fixture services instead. These clients are excluded from the React UI handoff.

Do not import them into presentation components. No Supabase configuration or
account is needed to preview or export the designs. See
[preview architecture](../../../docs/ui-decoupling.md) for the legacy auth boundary.
