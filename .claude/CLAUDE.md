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
      authApi.js                    # OTP send/verify endpoints
      transactionsApi.js            # Transactions + show interest endpoints
      buildCustomFetchBaseQuery.js  # Attaches auth token to every request
public/                  # Static assets
```

**Auth:** OTP-based (not password). `EmailInputAndButton` sends an OTP (`useSendOtpMutation`); `LoginAuthPanel` verifies it (`useVerifyOtpMutation`). The session token arrives in the **`x-auth-token` response header** and is persisted to `localStorage` via `setUserSession`. `AuthGuard.jsx` protects client routes; `buildCustomFetchBaseQuery.js` injects the token as `Authorization: Bearer <token>` and redirects to `/login` on a `401`.

**API base URL:** `https://api-dev.oisterglobal.com`

**State management:** Redux Toolkit + RTK Query. Store is provided via `StoreProvider.jsx` in the root layout.

---

## Code Style

- JSX only
- Tailwind CSS for all styling — no inline styles, no CSS modules
- IMPORTANT: Keep components small and single-purpose
- IMPORTANT: All components should follow the same structure, like first all imports line, then module-level constants/static data, then helper functions and sub-components, and the default-exported main component last (with the `"use client"` directive at the very top only when needed)
- Shared/reusable components go in `app/components/`; page-specific components go in a `components/` folder co-located with the page
- Use RTK Query hooks (`useGetTransactionsQuery`, `useGetTransactionQuery`, `useShowInterestMutation`, `useSendOtpMutation`, `useVerifyOtpMutation`) for all data fetching — no raw `fetch` in components (the lone exception is `CompanyNews` calling the internal `/api/news` route)
- API fields are often HTML strings — render them via the `app/lib/htmlConversion.js` helpers (`trimHTML`, `htmlListToArray`, `htmlListToHtmlArray`), not ad-hoc string parsing
- Auth helpers must go through `app/lib/auth.js` — never access `localStorage` directly in components

---

## Preferred Libraries & Tools

| Purpose | Library |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| State / Data fetching | Redux Toolkit + RTK Query |
| Toasts | react-hot-toast |

**Do not introduce:** installing any other libraries without discussion.

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

**Environment:** `NEWSAPI_KEY` (in `.env.local`) is required by `app/api/news/route.js` for the Company News section; without it the section shows a graceful "unavailable" message.

---

## Critical Rules

- Never access `localStorage` directly in components — use `app/lib/auth.js` helpers (`getUserToken`, `getUserData`, `setUserSession`, `clearUserSession`, `subscribeAuth`)
- Add new remote image hosts to `next.config` `remotePatterns`, or `next/image` will refuse to render them
- Never hardcode API URLs — always use the `baseApi` base URL
- Do not modify `buildCustomFetchBaseQuery.js` without understanding token injection logic
- The `(auth)` and `(protected)` route groups are Next.js route groups — parentheses are intentional and must not be removed

---

## Development Roadmap

| Feature | Route | Status |
|---|---|---|
| Login (OTP) | `/login` | Done |
| Transaction listing | `/` | Done |
| Transaction details | `/[id]` | Done |
| Show Interest modal | `/[id]` | Done |