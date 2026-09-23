# Billing preview

BillingSettings composes BillingTable inside the preview settings UI. BillingTable
renders `src/mockData/mockBilling.ts`; it does not fetch live subscriptions or
billing records. This feature is excluded from the presentation-only handoff.

If needed in the destination app, extract rows and invoice actions into typed
props/callbacks and let the host supply AWS-backed data. See
[React integration](../../../docs/react-integration.md).
