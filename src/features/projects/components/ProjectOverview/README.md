# Connected project overview

ProjectOverviewDrawer composes project details, contacts, and transactions for
the preview. ProjectOverviewDetailsCard switches between ProjectDetailsView and
ProjectDetailsForm; ProjectOverviewContacts and ProjectOverviewTransactions render
the associated sections.

These components use preview application state/services and are not public
handoff exports. The default fixture adapter cannot save project edits. Use the
portable ProjectCard and ProjectsGrid for current React integration; see the
[project documentation](../../README.md).
