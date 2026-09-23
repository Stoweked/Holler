# Projects

`ProjectCard` and `ProjectsGrid` are exported through `src/ui/index.ts` for use
with MantineProvider and data/callback props.

- `components/ProjectCard.tsx`: receives a project and click handler, optional
  selection mode, and optional progress segments. Status comes from project data;
  progress is shown only when supplied. No sample balances are built in.
- `components/ProjectsGridView.tsx`: exported as `ProjectsGrid`; receives projects,
  optional loading state, and a project-selection callback. Handles an empty list.
- [types/project.ts](types/project.ts): source of the exported display model.

`components/ProjectsGrid.tsx`, ProjectsDrawer, ProjectOverview, ProjectsContext,
and `useProjectsDrawer` remain connected preview code. Data operations use
`useServices()`; the default adapter supplies local projects and rejects writes.
Legacy create/update/archive actions live in `src/lib/adapters/supabase/actions/projects/`.

The destination app owns loading, editing, and persistence. Full project editing
workflows are not part of the current public handoff. See
[React integration](../../../docs/react-integration.md).
