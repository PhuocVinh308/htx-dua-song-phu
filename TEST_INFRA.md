# Test Infrastructure Architecture — HTX Dừa Song Phú

## 1. Overview
This document specifies the architecture, methodology, and execution instructions for the automated end-to-end (E2E) testing framework designed for the **HTX Dừa Song Phú** website project.

The testing harness executes requirement-driven, opaque-box validations across all functional, boundary, integration, and real-world purchasing workflows, targeting 100% adherence to the 5 reference design screens of HTX Thanh Bình and the e-commerce business contracts.

---

## 2. Test Architecture & Directory Layout

```
htx/
├── scripts/
│   └── run-e2e-tests.js                # Master automated CLI test runner
├── tests/
│   └── e2e/
│       ├── test-helpers.js             # JSDOM/SSR mounting, esbuild cache & test framework
│       ├── tier1-feature-coverage.test.js     # Tier 1: Feature Coverage & Screen 1-5 Match
│       ├── tier2-boundary-corner-cases.test.js # Tier 2: Boundary & Corner Cases
│       ├── tier3-cross-feature-combinations.test.js # Tier 3: Cross-Feature Combinations
│       └── tier4-real-world-scenarios.test.js # Tier 4: Real-World Workflows & Responsive Layout
├── TEST_INFRA.md                       # This infrastructure specification
└── TEST_READY.md                       # Test suite readiness & coverage verification matrix
```

---

## 3. Technology Stack & Execution Mechanism

- **Execution Runtime**: Node.js v20.20+ (ES Modules native)
- **Component Mount & Rendering**: `react` 18.3.1, `react-dom/server` (`renderToStaticMarkup`)
- **Compilation Engine**: `esbuild` bundled pipeline transforming React 18 JSX into high-performance in-memory/cache modules (`.test-cache/`) with 0 external network dependencies.
- **Test Framework**: Zero-dependency modular assertion suite supporting structured test definitions, assertion counters, execution timers, colored terminal reporting, and standard process exit codes (0 on success, 1 on failure).

---

## 4. Test Tiers Specification

### Tier 1: Feature Coverage & Screen Accuracy (12 Tests, 81 Assertions)
- **R1.1 Typography Tokens Contract**:
  - Verifies Lobster font loaded for main headings (`.font-script-title`, `.font-lobster-heading`).
  - Verifies Barlow font for uppercase titles, body text, and buttons (`--font-barlow`, `font-heading`, `btn-pill-green`).
  - Verifies Dancing Script font for Hero subtitle banner (`.font-script`, `.font-welcome-script`).
  - Verifies Google Fonts preconnect and stylesheets in `index.html`, variables in `src/index.css`, and tokens in `tailwind.config.js`.
- **R1.2 Screen 1 (Home Page) 100% Reference Match**:
  - Header: 3-tier structure (top contact bar, middle logo/hotline, bottom green menu bar `#0f4c3a`).
  - Hero: Frosted glass box (`backdrop-blur-md`) and bottom wave SVG divider (`viewBox="0 0 1200 120"`).
  - About Section: 2 overlapping photos layout with circular OCOP seal badge.
  - Why Choose Us: 4 circular pillars (`circle-pillar`) and central SOCOOP round logo.
  - Featured Products: 12 product grid with green pill buttons (`btn-pill-green`).
  - Production Gallery: 8 photos grid (2 rows x 4 cols).
  - News Section: 3 articles with carousel navigation arrows.
  - Footer: Mountain silhouette background banner (`footer-mountain-bg`).
- **R1.3 Screen 2 (About Page)**:
  - Header, breadcrumb, 9 cooperative principles, 165+ members, VietGAP/HACCP certifications, copyright logo certificates.
- **R1.4 Screen 3 (Products Page)**:
  - 5-column responsive catalog grid (`lg:grid-cols-5`), sorting dropdown, pagination controls, and "SẢN PHẨM ĐÃ XEM" recently viewed carousel.
- **R1.5 Screen 4 (Collections Page)**:
  - 3-column articles grid (`md:grid-cols-3`), tags, publish date, author.
- **R1.6 Screen 5 (Certifications Page)**:
  - 3-column certificates grid (`md:grid-cols-3` / `lg:grid-cols-3`), ISO 22000:2018, HACCP, Mã Vùng Trồng, GS1.
- **R2.1 Quick View Modal**:
  - Detailed product view, formatted VND price, unit, features list with checkmarks, farmer name, trace batch code, +/- quantity selector, Add to Cart CTA, Traceability link. Safe guards against null/sparse product data.
- **R2.2 Cart Drawer & Order Calculation**:
  - Subtotal summation, item increment/decrement/deletion, formatted currency in VND.
- **R2.3 Category Filtering**:
  - Validates category mappings (`trai-cay-tuoi`, `thuc-pham`, `vat-lieu`, etc.).
- **R3.1 AI Bé CoCo Assistant**:
  - Floating action button (`.coco-fab`), chatbox interface, FAQ knowledge base coverage.
- **R3.2 Zero Waste Diagram**:
  - Circular economy tree parts (thân, lá, cùi, nước, vỏ, gáo), 0% waste metrics.
- **R3.3 Blockchain QR Traceability**:
  - Batch code lookup, farmer provenance, harvest details, and blockchain verification ledger.

---

### Tier 2: Boundary & Corner Cases (6 Tests, 40 Assertions)
- **R2.B1 Empty Cart Behavior**: Friendly empty message, 0 ₫ subtotal, disabled checkout buttons.
- **R2.B2 Form Field Validation**: Strict rejection of empty name, missing address, non-numeric/short phone numbers. Validates correct formats.
- **R2.B3 Quantity Bounds & Negative Handling**: Decrementing from quantity 1 deletes item; negative deltas clamped/deleted; cart cannot contain negative or 0 quantity items.
- **R2.B4 Nonexistent Batch QR Lookup**: Unknown batch codes handled cleanly without throwing exceptions.
- **R2.B5 Empty Search / Category Results**: Displays friendly empty results message when 0 items match.
- **R2.B6 Pagination Boundaries**: Page clamped safely within [1, totalPages]; handles underflow (page <= 0) and overflow (page > totalPages).

---

### Tier 3: Cross-Feature Combinations (4 Tests, 20 Assertions)
- **R3.C1 Filter -> Quick View -> Cart Drawer -> COD Checkout**: Full multi-component transaction flow with quantity adjustments and cart reset.
- **R3.C2 AI Bé CoCo Recommendation -> Add to Cart**: Consultation query matches knowledge base, recommends product, and seamlessly populates cart.
- **R3.C3 Quick View -> Traceability Linkage**: Clicking "Tra cứu lý lịch lô" navigates to Traceability section with pre-filled batch code.
- **R3.C4 Zero Waste CTA -> Products Catalog**: CTA on circular economy diagram transitions to products catalog.

---

### Tier 4: Real-World Scenarios & Non-Functional Verification (3 Tests, 26 Assertions)
- **R4.1 Complete Customer Purchasing Journey with VietQR**:
  - Real customer flow purchasing Diamond Coconut and Coconut Powder, calculating line subtotals, proceeding to Bank Transfer checkout, verifying Agribank account information (`7300205168379`, `HOP TAC XA DUA SONG PHU`), and verifying order confirmation.
- **R4.2 Responsive Layout Contracts**:
  - Mobile (375px/414px): Hamburger toggle, 2-column grid (`grid-cols-2`), full-width drawer (`w-full`).
  - Tablet (768px): 3 to 4 columns grid (`sm:grid-cols-3 md:grid-cols-4`).
  - Desktop (1280px+): 5 columns grid (`lg:grid-cols-5`), 3-tier header, mountain background footer.
- **R4.3 Production Build & Asset Integrity**:
  - Synchronous `npm run build` execution, verifying production artifacts in `dist/` (HTML, CSS bundle, JS module bundle, zero build errors).

---

## 5. Execution Commands

```bash
# Run the complete test suite (Tiers 1-4)
npm run test:e2e
# or directly with Node:
node scripts/run-e2e-tests.js

# Run an individual tier
node scripts/run-e2e-tests.js --tier=1
node scripts/run-e2e-tests.js --tier=2
node scripts/run-e2e-tests.js --tier=3
node scripts/run-e2e-tests.js --tier=4

# Run production build verification
npm run build
```
