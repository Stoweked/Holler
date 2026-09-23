# Account preview

Account settings and profile editing remain connected preview workflows, excluded
from the presentation-only handoff. The `Profile` display type from
[types/account.ts](types/account.ts) is exported for views that display the current person.

- `components/Account.tsx` composes settings cards.
- `components/profile/` contains ProfileCard, ProfileView, and ProfileForm.
- `hooks/useProfileForm.tsx` uses Mantine form validation and injected services for
  profile updates and avatar uploads. The read-only preview cannot persist them.
- `contexts/ProfileContext.tsx` accepts account state from the host; it does not
  authenticate or fetch automatically. RuntimeProviders supplies a demo profile
  with `user: null`. Sign-out is optional; the menu omits it without a handler.

Legacy profile actions live in `src/lib/adapters/supabase/actions/account/`.
Do not copy those adapters or require authentication to render exported views.
Extract form values, submission callbacks, and request state before adding profile
editors to the public API. See [React integration](../../../docs/react-integration.md).
