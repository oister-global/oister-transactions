# Transaction Details Page Spec

**Route:** `/[id]`
**File:** `app/(protected)/[id]/page.jsx`

---

## Data Flow

```
useGetTransactionQuery({ id })
  └── GET /manager/transactions/:id
        └── data.data → { heading, subHeading, disclaimer, bulletPoints,
                           deckLink, videoLink, index, isInterested }

useShowInterestMutation()
  └── PUT /manager/transactions/i-am-interested/:id
        └── on success → show Modal
```

- `isInterested: true` from API hides the "I'm Interested" button permanently (duplicate prevention)
- `index` is used by `backgroundImage(index)` in `app/lib/backgroundImage.js` to pick the hero image
- Loading state → renders `<Loading />` full-page spinner
- Error state → calls `notFound()` → renders `app/not-found.jsx`

---

## Section Order & Component Map

| # | Section | Component | Data Source |
|---|---|---|---|
| 1 | Hero banner image | `next/image` | `backgroundImage(index)` |
| 2 | Title + back nav | inline JSX | `heading` (API) |
| 3 | Subtitle | inline JSX | `subHeading` (API) |
| 4 | Sticky CTA bar | `ButtonsGroup` | `deckLink`, `isInterested` (API) |
| 5 | Key Highlights | `KeyHighlights` | `KEY_HIGHLIGHTS` (hardcoded) + `bulletPoints` (API) |
| 6 | Financial Projections | `Financial` | hardcoded |
| 7 | Shareholding & Last Round | `ShareholdingSection` | hardcoded |
| 8 | Key Management Team | `LeadershipTeam` | `keyManagementTeam`, `seniorLeadershipTeam` (API) |
| 9 | Cap Table | `CapTable` | hardcoded |
| 10 | Company News | `CompanyNews` | `/api/news?q=companyName` (NewsAPI proxy — companyName hardcoded) |
| 11 | Video | `VideoComponent` | `videoLink` (API) |
| 12 | FAQs | `FAQs` | hardcoded |
| 13 | Key Investors | `KeyInvestors` (inside `ComponentWrapper`) | `keyInvestors` (API) |
| 14 | Related Transactions | `RelatedTransactions` | `useGetTransactionsQuery()` — random 4, excludes current |
| 15 | Disclaimer | `ComponentWrapper` | `disclaimer` (API) |
| 16 | Success Modal | `Modal` | triggered by showInterest mutation |

---

## Components

### `ButtonsGroup`
Props: `text`, `text1`, `onClick`, `onClick1`, `hideButton1`, `isLoading1`

Sticky bar (`sticky top-24 z-20`) with two buttons:
- **Show Deck** (Primary) → `window.open(deckLink, "_blank")`
- **I'm Interested** (Secondary) → calls `showInterest({ id })`, hidden when `isInterested === true`

### `KeyHighlights`
Props: `listData` (array of `{ title, subtitle }`), `bulletListData` (array of strings)

- KPI card grid: 2 cols on sm, 4 cols on lg
- Bullet list rendered from `htmlListToArray(bulletPoints)` (API field)
- `KEY_HIGHLIGHTS` array is currently hardcoded in `page.jsx` — needs to come from CMS

### `Financial` (FinancialProjections)
- No props — all data hardcoded inside component
- Responsive scrollable table with header `bg-[#555573]`
- Bullet points below table
- **Pending:** connect to CMS/API

### `ShareholdingSection`
- No props — hardcoded bullet list of shareholding facts
- **Pending:** connect to CMS/API

### `LeadershipTeam`
Props: `team` (`keyManagementTeam`), `seniorLeadership` (`seniorLeadershipTeam`)

- `team`: array of `{ name, title, bullets, image? }`. `bullets` is an HTML list string parsed via `htmlListToHtmlArray` (rendered with `dangerouslySetInnerHTML` to preserve inline tags)
- Avatar: shows `image` if provided, else initials on `bg-[#d9e8b5]`
- `seniorLeadership`: HTML list string parsed via `htmlListToHtmlArray`, rendered as a bulleted "Senior Leadership Team" block below the team
- Renders `null` only when both `team` and `seniorLeadership` are empty; each block renders independently

### `CapTable`
- No props — hardcoded `GROUPS` array with grouped rows (parent + member rows)
- First column is sticky for horizontal scroll
- Total row pinned at bottom in `bg-[#555573]`
- **Pending:** connect to CMS/API

### `CompanyNews`
Props: `companyName` (string)

- Fetches from `/api/news?q=companyName` (internal Next.js route → NewsAPI proxy)
- Requires `NEWSAPI_KEY` in `.env.local`
- States: skeleton loader → articles list / error message / empty state
- Filters out articles with `title === "[Removed]"`
- `companyName` is currently hardcoded as `"Bombay Shaving"` in `page.jsx` — should come from API

### `VideoComponent`
Props: `videoLink` (string — iframe-compatible URL)

- Wraps an `<iframe>` in `aspect-video` container inside `ComponentWrapper`
- Hidden implicitly if `videoLink` is empty/null (iframe renders with empty src)
- **Pending:** guard against empty `videoLink`

### `FAQs`
- No props — hardcoded `FAQS` array
- Two-column accordion layout on sm+, single column on mobile
- Each item toggles open/close independently
- **Pending:** connect to CMS/API

### `KeyInvestors`
Props: `investors` (`keyInvestors`)

- `investors`: array of `{ name, logo }`. Renders `logo` via `next/image` (`object-contain` on a white card), falling back to the `name` text when no logo
- Uses Framer Motion `whileHover` scale on each card
- Renders `null` when empty; `page.jsx` also guards the surrounding `ComponentWrapper` so the heading is hidden when there are no investors
- Logo URLs are expected from the allowlisted S3 hosts in `next.config` (`oistercdn.s3…`, `oister-transactions.s3…`)

### `RelatedTransactions`
Props: `currentId` (string)

- Fetches all transactions, filters out current, picks 4 at random
- Accordion UI (expand to show metadata + "View details →" link)
- Returns `null` if loading or no related transactions

### `ComponentWrapper`
Props: `heading`, `subHeading`, `children`

- Generic section shell with `card-wrapper` class
- Uppercases `heading` automatically
- Renders heading/subHeading block only if either is non-empty

### `Modal` (Show Interest success)
Props: `show`, `title`, `description`, `buttonText`

- Locks body scroll while open
- "Go back to dashboard" → `router.push("/")`
- No close/dismiss — user must click the button

---

## API Fields Reference

| Field | Type | Used by |
|---|---|---|
| `heading` | HTML string | Title (via `trimHTML`) |
| `subHeading` | HTML string | Subtitle (via `trimHTML`) |
| `disclaimer` | HTML string | Disclaimer section (via `trimHTML`) |
| `bulletPoints` | HTML list string | `KeyHighlights` bullet list (via `htmlListToArray`) |
| `deckLink` | HTML string | "Show Deck" button (via `trimHTML`) |
| `videoLink` | HTML string | `VideoComponent` (via `trimHTML`) |
| `index` | number | Hero background image selector |
| `isInterested` | boolean | Hides "I'm Interested" button |
| `keyManagementTeam` | array of `{ name, title, bullets, image? }` | `LeadershipTeam` (`bullets` is an HTML list string) |
| `seniorLeadershipTeam` | HTML list string | `LeadershipTeam` Senior Leadership block (via `htmlListToHtmlArray`) |
| `keyInvestors` | array of `{ name, logo }` | `KeyInvestors` |

---

## Pending / Known Issues

| Item | Status |
|---|---|
| `KEY_HIGHLIGHTS` hardcoded in `page.jsx` | Needs CMS field |
| `LeadershipTeam` | ✅ API-driven (`keyManagementTeam` + `seniorLeadershipTeam`) |
| `Financial` fully hardcoded | Needs CMS field |
| `ShareholdingSection` fully hardcoded | Needs CMS field |
| `CapTable` fully hardcoded | Needs CMS field |
| `FAQs` fully hardcoded | Needs CMS field |
| `KeyInvestors` | ✅ API-driven (`keyInvestors` — logo + name fallback) |
| `CompanyNews` — `companyName` hardcoded | Should come from API |
| `VideoComponent` — no guard on empty `videoLink` | Should hide section if no link |
| `Modal` has no dismiss/close action | Intentional or pending? |
| `seniorLeadershipTeam` | ✅ Full HTML rendered (paragraphs + lists) via `dangerouslySetInnerHTML` with arbitrary-variant list styling |
