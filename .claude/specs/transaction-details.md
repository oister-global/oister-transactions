# Transaction Details Page Spec

**Route:** `/[id]`
**File:** `app/(protected)/[id]/page.jsx`

---

## Data Flow

```
useGetTransactionQuery({ id })
  └── GET /manager/transactions/:id
        └── data.data → { heading, subHeading,
                           businessSegments, businessSegmentsDisclaimer,
                           keyHighlights, keyHighlightsBullets,
                           investmentThesis,
                           financialColumns, financialRows, financialBullets,
                           shareholdingAndLastRound,
                           valuationContent, valuationDisclaimer,
                           keyManagementTeam, seniorLeadershipTeam,
                           keyInvestors, faqs,
                           disclaimer, deckLink, videoLink, index, isInterested }

useShowInterestMutation()
  └── PUT /manager/transactions/i-am-interested/:id
        └── on success (response.data) → setShowModal(true)
```

- `isInterested: true` from API hides the "I'm Interested" button permanently (duplicate prevention)
- `index` is used by `backgroundImage(index)` in `app/lib/backgroundImage.js` to pick the hero image
- Loading state (`isLoading`) → renders `<Loading />` full-page spinner
- Error state (`isError`) → calls `notFound()` → renders `app/not-found.jsx`
- `showInterest` uses `extraOptions.showToastOnFailure` so failures surface a toast automatically (see `transactionsApi.js`); the success path opens the `Modal`

---

## Page Layout

The page is built as a vertical stack with two distinct layout zones:

1. **Full-width zone** (above the fold): hero image → sticky company header (title + CTA) → description → Business Segments → mobile section nav
2. **Two-column zone**: a sticky `SideNav` (desktop only) on the left and the main content column on the right

Each content section is wrapped in a `<div id="...">` whose `id` matches an entry in the `SECTIONS` array so both nav components can scroll-spy and anchor-link to it.

### `SECTIONS` (defined in `page.jsx`)

Drives both `SideNav` (desktop) and `MobileSectionNav` (mobile). Order:

`highlights` → `thesis` → `financial` → `shareholding` → `valuation` → `leadership` → `cap-table` → `news` → `video` → `faqs` → `investors` → `related`

> Note: the rendered content also includes a `financial-chart` block (`FinancialChart`) between `financial` and `shareholding`, and a trailing Disclaimer block — neither has a `SECTIONS` entry, so they are reachable by scroll but not listed in the nav.

---

## Section Order & Component Map

| # | Section | `id` | Component | Data Source |
|---|---|---|---|---|
| 1 | Hero banner image | — | `next/image` | `backgroundImage(index)` |
| 2 | Sticky company header (title + back nav + CTA) | — | inline JSX + `ButtonsGroup` | `heading`, `deckLink`, `isInterested` (API) |
| 3 | Description | — | inline JSX | `subHeading` (API, via `trimHTML`) |
| 4 | Business Segments | — | `BusinessSegments` | `businessSegments`, `businessSegmentsDisclaimer` (API) |
| 5 | Mobile section nav | — | `MobileSectionNav` | `SECTIONS` |
| 6 | Side nav (desktop) | — | `SideNav` | `SECTIONS` |
| 7 | Key Highlights | `highlights` | `KeyHighlights` | `keyHighlights`, `keyHighlightsBullets` (API) |
| 8 | Investment Thesis | `thesis` | `InvestmentThesis` | `investmentThesis` (API) |
| 9 | Financial | `financial` | `FinancialProjections` (`Financial.jsx`) | `financialColumns`, `financialRows`, `financialBullets` (API) |
| 10 | Financial Projections Chart | `financial-chart` | `FinancialChart` | `financialColumns`, `financialRows` (API) |
| 11 | Shareholding & Last Round | `shareholding` | `ShareholdingSection` | `shareholdingAndLastRound` (API) |
| 12 | Valuation | `valuation` | `ValuationSection` | `valuationContent`, `valuationDisclaimer` (API) |
| 13 | Key Management Team | `leadership` | `LeadershipTeam` | `keyManagementTeam`, `seniorLeadershipTeam` (API) |
| 14 | Cap Table | `cap-table` | `CapTable` | hardcoded |
| 15 | Company News | `news` | `CompanyNews` | `/api/news?q=companyName` (NewsAPI proxy — `companyName` hardcoded `"Bombay Shaving"`) |
| 16 | Video | `video` | `VideoComponent` | `videoLink` (API, via `trimHTML`) |
| 17 | FAQs | `faqs` | `FAQs` | `faqs` (API) |
| 18 | Key Investors | `investors` | `KeyInvestors` (inside `ComponentWrapper`) | `keyInvestors` (API) |
| 19 | Related Transactions | `related` | `RelatedTransactions` | `useGetTransactionsQuery()` — random 4, excludes current |
| 20 | Disclaimer | — | `ComponentWrapper` | `disclaimer` (API, via `trimHTML`) |
| 21 | Success Modal | — | `Modal` | triggered by `showInterest` mutation |

---

## Navigation Components

### `SideNav`
Props: `sections` (array of `{ id, label }`)

- Desktop only (`hidden md:flex`), sticky at `top-[172px]`, fixed `176px` width
- One `IntersectionObserver` per section (rootMargin `-15% 0px -75% 0px`) sets the `active` section for scroll-spy highlighting
- Clicking a link smooth-scrolls to the target with a `172px` offset (to clear the sticky headers)

### `MobileSectionNav`
Props: `sections` (array of `{ id, label }`)

- Mobile only (`md:hidden`), a horizontally scrollable pill bar, sticky at `top-[140px]`
- Uses a scroll listener that computes the most-visible section (max visible pixel height, accounting for a `STICKY_OFFSET` of `200`) to set `active`
- Auto-scrolls the active pill into the center of the nav
- Clicking a pill smooth-scrolls to the target using the same `STICKY_OFFSET`
- Hides its native scrollbar via the `mobile-nav-scroll` class + inline `scrollbarWidth: none`

---

## Section Components

### `ButtonsGroup`
Props: `text`, `text1`, `onClick`, `onClick1`, `hideButton1`, `isLoading1`

Lives inside the sticky company header (not a standalone bar). Two buttons:
- **Show Deck** (Primary) → `window.open(trimHTML(deckLink), "_blank")`
- **I'm Interested** (Secondary) → calls `showInterest({ id })`, on `response.data` opens the modal; hidden when `isInterested === true`

### `BusinessSegments`
Props: `SEGMENTS` (`businessSegments`), `disclaimer` (`businessSegmentsDisclaimer`)

- `SEGMENTS`: array of `{ name, revenue, segmentFor, description }`
- Left column shows `name`, normalized `revenue` (via local `formatRevenue` → `"N% revenue"`, tolerating both `"68%"` and `"16"` inputs), and `segmentFor`
- `description` is an HTML list string parsed via `htmlListToHtmlArray`, each item rendered as a bullet with `dangerouslySetInnerHTML`
- Optional italic `disclaimer` footnote below the list
- Renders `null` when `SEGMENTS` is empty/not an array

### `KeyHighlights`
Props: `listData` (`keyHighlights`), `bulletListData` (parsed `keyHighlightsBullets`)

- `listData`: array of `{ title, value }` rendered as a KPI card grid (2 cols sm, 4 cols lg) with a top accent bar
- `bulletListData`: array of HTML strings (page passes `htmlListToHtmlArray(keyHighlightsBullets)`), each rendered with a `StarIcon` bullet via `dangerouslySetInnerHTML`

### `InvestmentThesis`
Props: `thesis` (`investmentThesis`)

- `thesis`: array of `{ heading, bullets }`; `bullets` is an HTML list string parsed via `htmlListToHtmlArray` and rendered with `dangerouslySetInnerHTML`
- Renders `null` when empty/not an array

### `FinancialProjections` (`Financial.jsx`)
Props: `columns` (`financialColumns`), `rows` (`financialRows`), `bullets` (`financialBullets`)

- `columns`: array of `{ label }` → table header cells (header row `bg-[#555573]`)
- `rows`: array of `{ particular, values: [{ value }] }` → table body
- `bullets`: HTML list string parsed via `htmlListToHtmlArray`, rendered below the table
- Horizontally scrollable on overflow; renders `null` when `rows` is empty

### `FinancialChart`
Props: `columns` (`financialColumns`), `rows` (`financialRows`)

- Hand-rolled SVG chart (no chart library) derived from the same financial table
- `buildChartData` locates Revenue / EBITDA / Growth / Margin rows by matching `particular` substrings; `num()` strips formatting (`"1,050"` → `1050`); `niceMax()` rounds the axes
- Dual-axis: grouped Revenue + EBITDA bars (left axis) and an EBITDA-margin line (right axis), with a legend
- Renders `null` when there is no chart data

### `ShareholdingSection`
Props: `content` (`shareholdingAndLastRound`)

- `content`: HTML list string parsed via `htmlListToHtmlArray` into a bulleted list (`dangerouslySetInnerHTML` per item)
- Renders `null` when there are no list items

### `ValuationSection`
Props: `content` (`valuationContent`), `disclaimer` (`valuationDisclaimer`)

- `content`: arbitrary CMS HTML rendered via `dangerouslySetInnerHTML`, styled with arbitrary-variant selectors (`[&_h3]`, `[&_strong]`, `[&_ul]`, `[&_li]:before` bullets)
- Optional italic `disclaimer` footnote
- Renders `null` when `content` is empty

### `LeadershipTeam`
Props: `team` (`keyManagementTeam`), `seniorLeadership` (`seniorLeadershipTeam`)

- `team`: array of `{ name, title, bullets, image? }`. `bullets` may be an HTML string **or** an array of strings — normalized to HTML by the local `bulletsToHtml` helper, then rendered with `dangerouslySetInnerHTML` using the shared `RICH_HTML` arbitrary-variant styling (restores list bullets/indentation that Tailwind's reset strips)
- Avatar (`LeaderAvatar`): shows `image` (grayscale `next/image`) if provided, else uppercase initials on `bg-[#d9e8b5]`
- Separate mobile (stacked) and desktop (side-by-side) layouts
- `seniorLeadership`: HTML string rendered as a "Senior Leadership Team" block below the team
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

- Wraps an `<iframe src={videoLink}>` in an `aspect-video` container inside `ComponentWrapper`
- Page passes `trimHTML(videoLink)`
- **Pending:** no guard against empty `videoLink` — renders an empty iframe rather than hiding the section

### `FAQs`
Props: `faqs` (`faqs`)

- `faqs`: array of `{ question, answer }`; `answer` rendered via `dangerouslySetInnerHTML`
- Single-column accordion on mobile, two-column (split in half) on sm+
- Each `FAQItem` toggles open/close independently
- Renders `null` when empty/not an array
- **Pending:** the section heading `"FAQs ABOUT BOMBAY SHAVING"` is still hardcoded — should derive from the company/API

### `KeyInvestors`
Props: `investors` (`keyInvestors`)

- `investors`: array of `{ name, logo }`. Renders `logo` via `next/image` (`object-contain` on a white card), falling back to the `name` text when no logo
- Uses Framer Motion `whileHover` scale on each card
- Renders `null` when empty; `page.jsx` also guards the surrounding `ComponentWrapper` (`Array.isArray(keyInvestors) && keyInvestors.length > 0`) so the heading + `id="investors"` wrapper are omitted when there are no investors
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
- Used for the Key Investors wrapper, the standalone Video wrapper, and the trailing Disclaimer block

### `Modal` (Show Interest success)
Props: `show`, `title`, `description`, `buttonText`

- Locks body scroll while open (`document.body.style.overflow = "hidden"`)
- "Go back to dashboard" (`PrimaryButton`) → `router.push("/")`
- No close/dismiss affordance — user must click the button
- Note: `page.jsx` passes a `setShowModal` prop, but the component does not consume it (closes only by navigating away)

---

## API Fields Reference

| Field | Type | Used by |
|---|---|---|
| `heading` | HTML string | Header title (via `trimHTML`) |
| `subHeading` | HTML string | Description (via `trimHTML`) |
| `businessSegments` | array of `{ name, revenue, segmentFor, description }` | `BusinessSegments` (`description` is an HTML list string) |
| `businessSegmentsDisclaimer` | string | `BusinessSegments` footnote |
| `keyHighlights` | array of `{ title, value }` | `KeyHighlights` KPI cards |
| `keyHighlightsBullets` | HTML list string | `KeyHighlights` bullet list (via `htmlListToHtmlArray`) |
| `investmentThesis` | array of `{ heading, bullets }` | `InvestmentThesis` (`bullets` is an HTML list string) |
| `financialColumns` | array of `{ label }` | `FinancialProjections` + `FinancialChart` header/periods |
| `financialRows` | array of `{ particular, values: [{ value }] }` | `FinancialProjections` table + `FinancialChart` series |
| `financialBullets` | HTML list string | `FinancialProjections` bullets (via `htmlListToHtmlArray`) |
| `shareholdingAndLastRound` | HTML list string | `ShareholdingSection` (via `htmlListToHtmlArray`) |
| `valuationContent` | HTML string | `ValuationSection` body (rendered raw) |
| `valuationDisclaimer` | string | `ValuationSection` footnote |
| `keyManagementTeam` | array of `{ name, title, bullets, image? }` | `LeadershipTeam` (`bullets` HTML string or string[]) |
| `seniorLeadershipTeam` | HTML string | `LeadershipTeam` Senior Leadership block |
| `keyInvestors` | array of `{ name, logo }` | `KeyInvestors` |
| `faqs` | array of `{ question, answer }` | `FAQs` (`answer` rendered raw) |
| `disclaimer` | HTML string | Disclaimer section (via `trimHTML`) |
| `deckLink` | HTML string | "Show Deck" button (via `trimHTML`) |
| `videoLink` | HTML string | `VideoComponent` (via `trimHTML`) |
| `index` | number | Hero background image selector |
| `isInterested` | boolean | Hides "I'm Interested" button |

---

## HTML Parsing Helpers (`app/lib/htmlConversion.js`)

| Helper | Behavior |
|---|---|
| `trimHTML(html)` | Strips all tags → plain text |
| `htmlListToArray(html)` | Extracts each `<li>` as plain text (inline tags stripped) |
| `htmlListToHtmlArray(html)` | Extracts each `<li>`'s **inner HTML** (inline tags preserved); passes through arrays unchanged |

Rich CMS HTML rendered via `dangerouslySetInnerHTML` needs the `RICH_HTML` arbitrary-variant class (see `LeadershipTeam.jsx`) or equivalent inline `[&_…]` selectors to restore list styling stripped by Tailwind's reset.

---

## Pending / Known Issues

| Item | Status |
|---|---|
| Business Segments | ✅ API-driven (`businessSegments` + `businessSegmentsDisclaimer`) |
| Key Highlights | ✅ API-driven (`keyHighlights` + `keyHighlightsBullets`) |
| Investment Thesis | ✅ API-driven (`investmentThesis`) |
| Financial (table) | ✅ API-driven (`financialColumns` / `financialRows` / `financialBullets`) |
| Financial Chart | ✅ Derived from the financial table; not in `SECTIONS` nav |
| Shareholding & Last Round | ✅ API-driven (`shareholdingAndLastRound`) |
| Valuation | ✅ API-driven (`valuationContent` + `valuationDisclaimer`) |
| Leadership Team | ✅ API-driven (`keyManagementTeam` + `seniorLeadershipTeam`) |
| FAQs (data) | ✅ API-driven (`faqs`) |
| Key Investors | ✅ API-driven (`keyInvestors` — logo + name fallback) |
| `CapTable` fully hardcoded | Needs CMS field |
| `CompanyNews` — `companyName` hardcoded (`"Bombay Shaving"`) | Should come from API |
| `FAQs` heading hardcoded (`"FAQs ABOUT BOMBAY SHAVING"`) | Should derive from company/API |
| `VideoComponent` — no guard on empty `videoLink` | Should hide section if no link |
| `Modal` has no dismiss/close action | Intentional or pending? |
| `financial-chart` & Disclaimer missing from `SECTIONS` nav | Intentional or pending? |
