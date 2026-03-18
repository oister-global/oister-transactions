# Product Requirement Document (PRD)

## Product Name: OISTER TRANSACTIONS

---

## 1. Objective

Build a B2B transaction discovery platform where only authorized Relationship Managers (RMs) can:

- View available transactions
- Explore detailed transaction information
- Express interest in a transaction

The platform should provide a seamless, CMS-driven, scalable experience.

---

## 2. Target Users

### Primary Users:

- Relationship Managers (RMs)

### Access Control:

- Restricted (Login required)

---

## 3. Authentication & Access Control

### Requirements:

- Only authenticated users (RMs) can access the platform
- Unauthorized users should be redirected to login

### Flow:

1. RM lands on Login Page
2. Enters credentials
3. On success → Redirect to Transaction Listing page

---

## 4. User Journey

### Step 1: Login

- User logs into the platform

### Step 2: Transaction Listing (Entry Point)

- Displays all available transactions in card format

### Step 3: Transaction Details Page

- Clicking a card opens detailed view

### Step 4: Show Interest

- CTA button → opens modal → success confirmation

---

## 5. Features & Functional Requirements

---

### 5.1 Transaction Listing Page

#### Description:

Entry point after login showing all transactions.

#### UI:

- Card-based layout
- Responsive grid

#### Each Card Should Include:

- Transaction Name
- Minimum ticket size
- Key highlights (optional)
- CTA: **“View Details”** (clickable card)

#### Functional Requirements:

- Fetch data from backend / CMS
- Pagination / Infinite scroll (optional)
- Loading & empty states

---

### 5.2 Transaction Details Page

#### Description:

Detailed view of selected transaction.

#### Data Source:

- Fully CMS-driven

#### Sections:

- Overview / About
- Key Details
- Investment Information
- Linked Documents (e.g., Deck)
- Videos (if available)

#### Functional Requirements:

- Dynamic rendering of sections from CMS
- Support for:
  - Rich text
  - Files (PDFs, docs)
  - Media (videos)

---

### 5.3 CTA: “Show Interest”

#### Placement:

- Prominent button on Details Page

#### Behavior:

1. User clicks CTA
2. Modal opens
3. User sees confirmation

#### Modal Content:

> “We have received your interest. Our team will reach out shortly.”

#### Functional Requirements:

- Trigger API call (optional, based on backend)
- Show success state
- Close modal option..
