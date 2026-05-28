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

---

## Pages & User Journey

### 1. Login Page
- Email + Password form
- JWT/session-based auth
- Success → redirect to Transaction Listing
- Failure → inline error message
- All protected routes redirect unauthenticated users to login

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

## Future Scope (Phase 2–3)

- Saved transactions / Watchlist
- AI-powered recommendations
- Investor analytics & audit logs
- CRM integrations & email notifications
- Multi-role dashboards
- Data room permissions & e-sign workflows
- Document watermarking
- Advanced reporting
