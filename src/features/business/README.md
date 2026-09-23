# Business profile preview

BusinessSettings, BusinessProfileCard, BusinessProfileView, and BusinessProfileForm
remain connected preview components, excluded from the presentation-only handoff.

`useBusinessProfile` reads the current account context and calls the injected
`getBusinessProfile` service using React state/effects. Without a user it clears
the business state. `useBusinessProfileForm` handles editing through injected
services. The default fixture adapter does not persist changes.

The legacy username-check action lives in
`src/lib/adapters/supabase/actions/business/check-business-username.ts`.
Display types live in `types/business.ts` and `types/businessRole.ts`.

Before exporting business editors, supply values and request state through props
and report submissions through callbacks. The destination app will own AWS access
and account authorization. See [React integration](../../../docs/react-integration.md).
