# Controlled transaction filters

`TransactionFilters.tsx` is exported through `src/ui/index.ts`. It receives all
filter values and callbacks, result count, search terms, and explicit `contacts`
and `projects` arrays. It keeps only visual state such as whether its mobile
drawer is open. It does not fetch options, filter rows, or update the URL.

Individual controls include amount, contact, project, date, status, type, search,
and sort. `TransactionFiltersDrawer.tsx` renders the compact layout with the same
controlled inputs. See [TransactionFiltersProps](TransactionFilters.tsx) for the
exact contract.

The connected preview's `useTransactionFilters` hook manages URL state outside
these controls. The destination app decides how filter changes affect its data.
