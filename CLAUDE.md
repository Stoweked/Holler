# holler_frontend

The Next.js web client for Holler — a platform for construction payments: business
management, projects, transactions, wallets, and lien waivers.

Project-level architecture and structural gates live in the `hollermeta` repo
(`TECHSTACK.md`, `techstack/holler-frontend.md`, `specs/`). When this file and TECHSTACK
disagree, TECHSTACK wins.

## Tech stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Language:** TypeScript 5, strict mode
- **UI:** React 19 + Mantine 8, CSS Modules, `hugeicons-react`
- **State:** React Context + custom hooks (no Redux/Zustand)
- **Auth:** AWS Cognito via `react-oidc-context` — **client-side**
- **Backend:** the `maple` HTTP API (`/api/v1`), via `src/lib/maple/`
- **Legacy:** Supabase still backs six features; being retired feature-by-feature

## This app is a client-rendered SPA

**Call `maple` from the browser, not from Server Components or Server Actions.**

Authentication is client-side by design: `react-oidc-context` holds the Cognito token in
browser storage, and server-side code cannot read it. Do not try to route data access
through `"use server"` — a Server Action cannot obtain the token, and passing it as an
argument is a workaround we deliberately rejected.

Server Components are fine for static, data-free chrome. Nothing that needs the user's
identity runs on the server.

## Talking to maple

All `maple` traffic goes through `src/lib/maple/` — read that directory's `README.md`
before touching it.

- `client.ts` is the **only** place a maple request is constructed. It attaches the
  Cognito bearer token. An ESLint rule refuses a `fetch` to maple from anywhere else.
- `schema.d.ts` is **generated** from maple's `openapi/api.yaml`. Never hand-edit it.
  Regenerate with `npm run generate:api` (needs a `maple` checkout alongside this repo).
- Every operation returns `Result<T>` — success carrying `data`, or a transport failure
  carrying none. Narrow on `ok` before reading `data`; strict mode enforces this.
- Adapters that reshape maple's types into the frontend's live beside the client. **Never
  fabricate a value maple did not send** — leave the field unset instead.

Components never call the client directly. Data access lives in the feature's `actions/`
or `hooks/`.

## Feature-based architecture (strictly enforced)

All domain logic lives in `src/features/<domain>/`. Never leak feature logic into global
scope. Standard internal structure:

```
actions/     data access and mutations
components/  React components for this feature
contexts/    feature-level React Context providers
hooks/       custom hooks for this feature
types/       TypeScript interfaces
utils/       helpers
index.ts     the feature's only public surface — cross-feature imports go through here
```

- **Pages stay thin.** `page.tsx` and `layout.tsx` compose feature components; they do not
  fetch.
- **`src/components/`** is for truly universal UI only (layout, nav, modals, providers).
- **`src/lib/`** is for generic utilities and client initialization.

## Coding standards

- **No `any`.** Define interfaces in the feature's `types/`.
- **CSS Modules** (`[Component].module.css`); no inline styles. Design tokens come from
  `src/styles/globals.css` and `src/styles/theme.ts`.
- **`"use client"` only when required** — state, effects, context, or event handlers.
- Keep components small and single-purpose.

## Commands

```sh
npm run dev              # Turbopack dev server on :3000
npm run build            # production build
npm run lint             # eslint
npm run typecheck        # tsc --noEmit
npm run generate:api     # regenerate maple types (needs ../maple)
npm run verify:api-types # fail if the generated types drift from maple's spec
```

`verify:api-types` needs a `maple` checkout, so it is a developer check — it is not
wired into CI and will error there.

### Environment

Copy `.env.example` to `.env.local`. `NEXT_PUBLIC_MAPLE_API_URL` and the Supabase keys are
required for a build to succeed.

## Tests

There are none yet. Vitest + React Testing Library (components) and Playwright (E2E for
the send-with-waiver and sign-to-release flows) are the decided target and are not
installed. **Do not claim something is tested, and do not write an acceptance criterion
that points at a test that does not exist.** Verification today is typecheck + lint +
build.

## Working here

1. **Identify the feature module first.** If a task spans several, decide where the source
   of truth belongs before writing code.
2. **Mirror existing patterns** — `src/features/FEATURE_README_TEMPLATE.md`, or an
   established feature like `wallet` or `transactions`.
3. **No destructive changes** to routing, `_legacy_auth/`, or `supabase/` unless asked.
4. **Do not migrate features off Supabase opportunistically.** That is its own SPEC and
   proceeds feature-by-feature as maple grows the endpoints each one needs.
