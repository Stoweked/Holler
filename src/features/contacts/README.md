# Contacts

`ContactDetailsCard` and the types in [types/contact.ts](types/contact.ts) are
exported through `src/ui/index.ts`. The card receives display data; no contact
provider or backend is required for the portable view.

ContactsDrawer, ContactList, ContactModal, and contact-selection flows remain
connected preview code. `contexts/ContactsContext.tsx` uses injected services for
loading and operations such as favorites. The default adapter supplies local
contacts and reports writes as unavailable.

Legacy operations live in `src/lib/adapters/supabase/actions/contacts/`, not in
this feature's component tree. The destination app maps its AWS records to the
exported display model and owns contact loading/persistence. See
[React integration](../../../docs/react-integration.md).
