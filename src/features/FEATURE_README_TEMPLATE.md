# [Feature name]

[Describe the visual purpose and current implementation scope.]

## Public handoff

[List only components/types exported by src/ui/index.ts, or state that this feature
is preview-only. Identify the corresponding source files, especially aliases.]

## Props and interactions

[Describe required display data, loading/error/empty states, callbacks, and local
visual state. Link to source interfaces rather than duplicating them. State which
operations require host handlers.]

## Connected preview

[Identify wrappers, contexts, hooks, fixture use, and unavailable/simulated behavior.
If relevant, point to retained implementations in src/lib/adapters. Do not place
server actions or backend dependencies in the presentation layer.]

## Host responsibilities and validation

[Describe data mapping, routing, auth, and persistence that the destination app owns.
Document relevant checks and any remaining browser/integration validation. Update
docs/react-integration.md when the public API changes.]
