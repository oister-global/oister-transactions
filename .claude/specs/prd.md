# OISTER TRANSACTIONS — Project Spec

## Product Overview

OISTER TRANSACTIONS is a secure B2B transaction discovery platform for Relationship Managers (RMs) to explore curated investment opportunities and express interest in specific transactions.

**Design inspiration:** Tracxn, Forge Global, EquityZen — institutional investment aesthetic, data-first, enterprise-grade UX.

---

## Target Users

- **Primary:** Relationship Managers (RMs)

---

## Tech Stack

- **Frontend:** React.js / Next.js, Tailwind CSS
- **Auth:** JWT

> ℹ️ **As-built:** Next.js 16 (App Router), Tailwind CSS v4, Redux Toolkit + RTK Query for state/data fetching, react-hot-toast for toasts, Framer Motion for micro-interactions. Auth is **OTP-based** (not email+password) with a JWT session token. See [As-Built Implementation](#as-built-implementation-current-state).

---

## Pages & User Journey

### 1. Login Page
- Email + Password form
- JWT/session-based auth
- Success → redirect to Transaction Listing
- Failure → inline error message
- All protected routes redirect unauthenticated users to login

> ℹ️ **As-built:** Login is a **two-step OTP flow**, not email+password. Step 1: enter email → OTP is sent (response returns the masked phone the OTP also went to). Step 2: enter the 4-digit OTP → on success a JWT arrives in the `x-auth-token` response header and is persisted to `localStorage`. Branding: split-screen "ACE WITH SECONDARIES" panel. Feedback is via toasts, not inline errors. See [As-Built Implementation](#as-built-implementation-current-state).

### 2. Transaction Listing Page
- Card-based layout, CMS/API-driven
- Each card: Transaction Name, Company Logo/Image, Industry/Sector, Minimum Ticket Size, Short Description, Key Highlights, Status Badge, "View Details" CTA
- Loading, empty, and error states

### 3. Transaction Details Page
- Dynamically rendered from CMS
- Sections (hide gracefully if CMS data missing):
  - **A. Hero** — Transaction name, company logo, sector, status badge, min ticket size, investment thesis, "Show Interest" CTA
  - **B. About the Company** — Overview, mission, business model, market positioning, history
  - **C. Investment Overview** — Round type, valuation, raise size, min investment, use of funds, structure
  - **D. Key Financial Metrics** — Revenue, ARR/MRR, growth %, EBITDA, gross margin, burn rate, runway (KPI cards / tables / charts)
  - **E. Market Opportunity** — TAM/SAM/SOM, industry trends, competitive positioning
  - **F. Founders & Leadership** — Profiles, bios, LinkedIn links, previous companies
  - **G. Transaction Highlights** — Key strengths, competitive advantages, growth catalysts
  - **H. Risk Factors** — Business/market/regulatory risks, disclaimers
  - **I. Documents & Data Room** — PDFs (pitch deck, memos, financials, cap table, DD docs, term sheets) with preview/download/open
  - **J. Videos & Media** — Founder videos, product demos, webinar recordings
  - **K. FAQs** — Accordion UI
  - **L. Contact / RM Support** — Support contact, RM assistance, CTA
  - **M. Related Transactions** — Similar/recommended opportunities

### 4. Show Interest Modal
- Triggered by "Show Interest" CTA
- Confirms submission, calls backend API
- Prevents duplicate submissions (disable CTA after submit)
- Success confirmation shown in modal

---

## API Contracts

> ℹ️ The contracts below are the **original design**. The shipped contracts (base URL `https://api-dev.oisterglobal.com`, `/manager/*` routes, OTP auth, `PUT` interest) are documented under [As-Built API Contracts](#as-built-api-contracts).

### Login
```
POST /auth/login
Body: { email, password }
Success: { token, user: { id, name, role } }
Failure: { message: "Invalid credentials" }
```

### Fetch Transactions
```
GET /transactions
Response: { transactions: [...] }
```

### Fetch Transaction Details
```
GET /transactions/:id
Response: { id, title, overview, documents, videos, metrics, ... }
```

### Show Interest
```
POST /transactions/:id/interest
Body: { transactionId, userId }
Success: { success: true, message: "Interest submitted successfully" }
```

---

## UI Guidelines

- White background with subtle gray section breaks
- Premium/institutional typography
- Components: KPI cards, sticky side nav, responsive tables, accordion FAQs, document preview cards, filter chips, status badges
- Interactions: smooth transitions, skeleton loaders, hover states, sticky CTA on details page
- Responsive: laptop, tablet, large desktop

---

## Non-Functional Requirements

- Login API < 2s, Listing page < 2s, Details page < 3s
- Lazy loading for media and large assets
- Secure document access (JWT-protected APIs)
- Role-based authorization (current: RM; future: Admin, Super Admin, Compliance Reviewer)
- CMS-driven modular content blocks

---

## Error Handling

| Scenario | Handling |
|---|---|
| Invalid login credentials | Inline error |
| Empty form fields | Disable submit or show validation |
| No transactions | Empty state UI |
| API failure | Retry state |
| Transaction not found | 404 page |
| Missing CMS section | Hide section gracefully |
| Broken PDF/video | Show unavailable message |
| Duplicate interest submission | Disable CTA |
| Expired session | Redirect to login |

---

## As-Built Implementation (Current State)

This section documents what actually shipped, where it diverges from the original vision above. For the transaction details page specifically, see [`transaction-details.md`](./transaction-details.md).

### Authentication (OTP, not password)

A two-step OTP flow replaces the email+password design:

1. **Send OTP** — `EmailInputAndButton` collects the email and calls `useSendOtpMutation`. The response includes the (masked) `phone` the OTP was also delivered to, which is shown on the OTP screen.
2. **Verify OTP** — `LoginAuthPanel` collects the 4-digit OTP (`OTPInput`) and calls `useVerifyOtpMutation`. On success the JWT is read from the **`x-auth-token` response header** (via `transformResponse`) and, together with the user object, persisted through `setUserSession`.

- **Token storage:** `localStorage` keys `user-token` and `user-data`, accessed only via `app/lib/auth.js` (`getUserToken`, `getUserData`, `setUserSession`, `clearUserSession`, `subscribeAuth`). Components never touch `localStorage` directly.
- **Auth state propagation:** `auth.js` dispatches a custom `oister:auth-change` window event on session changes; components subscribe via `subscribeAuth` + `useSyncExternalStore` (e.g. the listing page reads the RM name this way) so the UI reacts to login/logout without a reload.
- **Route protection:** `AuthGuard` (wraps the whole app in the root layout) treats `localStorage` as the source of truth — it redirects unauthenticated users on protected routes to `/login`, and authenticated users away from `/login` to `/`.
- **Token injection:** `buildCustomFetchBaseQuery` attaches `Authorization: Bearer <token>` to every request and, on a `401`, clears the session and redirects to `/login`.

### Routing

App Router with two route groups:

- `(auth)/login` — public login route.
- `(protected)/` — guarded routes: `/` (listing) and `/[id]` (details), sharing `(protected)/layout.jsx`.

The root layout (`app/layout.jsx`) provides the Redux store (`StoreProvider`), a fixed `Header`, `Footer`, `ScrollToTop`, the `AuthGuard`, and a global react-hot-toast `Toaster` (top-center). Font: Work Sans.

### As-Built API Contracts

**Base URL:** `https://api-dev.oisterglobal.com` (never hardcode elsewhere — set once in `baseApi.js`). All data fetching uses RTK Query hooks; no raw `fetch` in components except the internal `/api/news` route.

```
POST /manager/v1/otp/send          Body: { email }          → { data: { phone, ... } }
POST /manager/v1/otp/verify        Body: { email, otp }      → { data: {...user} } + x-auth-token header
GET  /manager/transactions                                   → { data: [ ...transactions ] }
GET  /manager/transactions/:id                               → { data: { ...transaction } }
PUT  /manager/transactions/i-am-interested/:id   (no body)   → success → show success modal
```

- The interest call is a **`PUT` with no body** (the authenticated user + id are sufficient), not a `POST` with `{ transactionId, userId }`.
- RTK Query `extraOptions` (`showToastOnSuccess` / `showToastOnFailure`) drive automatic toasts in the custom base query; the `Transactions` tag is invalidated on a successful interest submission so listing/detail `isInterested` refreshes.

### Transaction Listing Page (`/`)

- Welcome banner greeting the RM by first name (derived from `user-data`).
- Responsive card grid (`TransactionCard`), one query via `useGetTransactionsQuery`.
- **Card fields (from API):** `heading`, `subHeading`, `index` (selects the hero image via `backgroundImage(index)`), `status` + `type` badges, and a 4-cell metrics grid — `valuation`, `minInvestment`, `instrumentType`, `pricePerShare`. A **"Shown Interest"** badge appears when `isInterested` is true. Most fields are HTML strings rendered through `trimHTML`.
- States: `<Loading />` while fetching; on error the page throws → caught by `app/error.jsx`.

### Transaction Details Page (`/[id]`)

Sections diverge from the original A–M list. As-built sections (in order): Hero image, sticky company header (title + back + CTA), description, Business Segments, then a two-column body (sticky `SideNav` + content) containing Key Highlights, Investment Thesis, Financial table, Financial Chart, Shareholding & Last Round, Valuation, Key Management Team, Cap Table, Video, FAQs, Key Investors, Related Transactions, and a Disclaimer. Most are API-driven; `CapTable` is still hardcoded and `CompanyNews`/`FAQs` carry a hardcoded "Bombay Shaving" reference. Full breakdown in [`transaction-details.md`](./transaction-details.md).

> Not yet built from the original vision: dedicated **About the Company**, **Market Opportunity (TAM/SAM/SOM)**, **Risk Factors**, **Documents & Data Room**, and **Contact / RM Support** sections, and **LinkedIn/previous-company** links on leadership profiles.

### Show Interest

- Triggered from the sticky CTA (`ButtonsGroup`'s "I'm Interested"); the button is hidden entirely when `isInterested === true` (duplicate prevention).
- On success a `Modal` confirms submission; its only action navigates back to the dashboard (no dismiss affordance). Failures surface a toast.

### Cross-Cutting Behaviors

- **Error / not-found:** `app/error.jsx` ("OOPS!") with Retry, and `app/not-found.jsx` (404) — both use `FloatingStatusImage` + `ButtonsGroup`. Detail page calls `notFound()` on a fetch error.
- **Loading:** `app/loading.jsx` full-page spinner, reused by pages during RTK Query loading.
- **Images:** new remote hosts must be allowlisted in `next.config` `remotePatterns` (e.g. `oistercdn.s3…`, `oister-transactions.s3…`) or `next/image` refuses to render them.
- **HTML fields:** API fields are frequently HTML strings; render via `app/lib/htmlConversion.js` (`trimHTML`, `htmlListToArray`, `htmlListToHtmlArray`) rather than ad-hoc parsing.

---

## Future Scope (Phase 2–3)

- Saved transactions / Watchlist
- AI-powered recommendations
- Investor analytics & audit logs
- CRM integrations & email notifications
- Multi-role dashboards
- Data room permissions & e-sign workflows
- Document watermarking
- Advanced reporting
