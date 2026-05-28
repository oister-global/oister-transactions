# OISTER TRANSACTIONS

A Next.js 16 frontend for a secure B2B transaction discovery platform where Relationship Managers browse curated investment opportunities and express interest.

Full product spec: [`.claude/specs/prd.md`](./specs/prd.md)
Transaction details deep-dive: [`.claude/specs/transaction-details.md`](./specs/transaction-details.md)

---

## Architecture

```
app/
  (auth)/login/          # Public login route
    components/          # Login-specific components (EmailInputAndButton, LoginAuthPanel)
    page.jsx
  (protected)/           # Auth-guarded routes
    page.jsx             # Transaction listing page
    [id]/page.jsx        # Transaction details page
    layout.jsx           # Shared protected layout
  api/news/route.js      # Next.js API route (news proxy)
  components/            # Shared UI components
  lib/                   # Utility functions (auth, helpers)
  store/                 # Redux state
    store.js
    StoreProvider.jsx
    services/
      baseApi.js                    # RTK Query base with custom fetch
      authApi.js                    # Login endpoint
      transactionsApi.js            # Transactions + show interest endpoints
      buildCustomFetchBaseQuery.js  # Attaches auth token to every request
public/                  # Static assets
```

**Auth:** Token stored in `localStorage` via `app/lib/auth.js`. `AuthGuard.jsx` protects client routes. Token is injected into API calls by `buildCustomFetchBaseQuery.js`.

**API base URL:** `https://api-dev.oisterglobal.com`

**State management:** Redux Toolkit + RTK Query. Store is provided via `StoreProvider.jsx` in the root layout.

---

## Code Style

- JSX only
- Tailwind CSS for all styling — no inline styles, no CSS modules
- Keep components small and single-purpose
- Shared/reusable components go in `app/components/`; page-specific components go in a `components/` folder co-located with the page
- Use RTK Query hooks (`useGetTransactionsQuery`, `useShowInterestMutation`, etc.) for all data fetching — no raw `fetch` in components
- Auth helpers must go through `app/lib/auth.js` — never access `localStorage` directly in components

---

## Preferred Libraries & Tools

| Purpose | Library |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| State / Data fetching | Redux Toolkit + RTK Query |
| Animations | Framer Motion |
| Toasts | react-hot-toast |

**Do not introduce:** axios, SWR, React Query, CSS-in-JS, additional UI component libraries (ShadCN, MUI, etc.) without discussion.

---

## Commands

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

---

## Critical Rules

- Never access `localStorage` directly in components — use `app/lib/auth.js` helpers (`getUserToken`, `setUserSession`, `clearUserSession`)
- Never hardcode API URLs — always use the `baseApi` base URL
- Do not modify `buildCustomFetchBaseQuery.js` without understanding token injection logic
- The `(auth)` and `(protected)` route groups are Next.js route groups — parentheses are intentional and must not be removed
- `app/api/` routes are Next.js server-side API routes — keep them thin (proxy only, no business logic)

---

## Development Roadmap

| Feature | Route | Status |
|---|---|---|
| Login | `/login` | Done |
| Transaction listing | `/` | Done |
| Transaction details | `/[id]` | Done |
| Show Interest modal | `/[id]` | Done |