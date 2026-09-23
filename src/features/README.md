# Feature source

Features group related views, types, and connected preview workflows. A feature's
`index.ts` is an internal barrel; `src/ui/index.ts` defines the supported portable API.
See the [integration guide](../../docs/react-integration.md) for the complete export list.

| Area | Current role |
| --- | --- |
| `transactions` | Exported table, row, details drawer, filters; connected preview wrappers |
| `projects` | Exported project card/grid; connected management drawers/forms |
| `banks` | Exported bank views; prototype bank selection/linking screens |
| `contacts` | Exported details card; connected contact management |
| `dashboard` | Connected preview screen used by Next routes |
| `account`, `business`, `settings` | Preview profile/settings workflows |
| `wallet`, `waivers` | Preview payment and waiver workflows |
| `billing`, `integrations`, `notifications` | Prototype settings/history screens |
| `marketing` | Retained marketing design; not the default route |

New handoff components receive data and loading/error state through props, and
report actions through callbacks. Keep data loading, auth, navigation, persistence,
and fixtures outside their dependency graph. Retain connected wrappers separately
when needed by the preview. Account/business editors and wallet execution have
not been converted into presentation-only exports.

Use [the README template](FEATURE_README_TEMPLATE.md) when documenting a feature.
Link to actual source types instead of maintaining duplicate example interfaces.
