# Specification: Interactive Enterprise Marketing Strategy Map

**Project:** BuildingTools™ Enterprise Marketing Strategy Visualisation
**Version:** 2.0 (Updated March 2026)
**Target Platform:** Web Browser (Desktop & Mobile)
**Status:** Built and deployed
**Source Documents:** Original spec + ABM Channel Strategy Playbook + ABM Strategy: Top 100 Enterprise Clients (Ari Vivekanandarajah, March 2026)

---

## 1. Project Overview

An interactive, single-page React web application that visualises the BuildingTools™ Enterprise Marketing Strategy as a **3-storey building cross-section** (architectural elevation view). Each floor represents a marketing phase, with 21 interactive hotspots that reveal detailed tactic information when clicked.

The visual metaphor maps directly to the construction industry:
*   **Ground Floor (Foundation)** = Phase 1: Awareness — 9 Tactics
*   **First Floor (Structure)** = Phase 2: Engage — 8 Tactics
*   **Penthouse (Fit-out)** = Phase 3: Convert — 4 Tactics

Users can pan, zoom, filter by phase, and click hotspots to explore the full ABM strategy.

---

## 2. Core Functionality (Implemented)

### 2.1 The Canvas
*   **Layout:** Vertical 3-storey building cross-section (SVG viewBox: 1000×1300)
*   **Background:** Dark architectural paper (`#1a1f2e`) with blueprint grid lines
*   **Building Elements:** Roof structure with rafters, building envelope with wall thickness, structural columns, windows, elevator shaft, staircase, foundation with piles and ground hatching
*   **Blueprint Conventions:** Grid reference labels (A–J columns, 1–13 rows), dimension arrows, compass rose, title block with revision info
*   **Navigation:** Smooth pan (click-drag), zoom (scroll wheel / pinch), powered by `react-zoom-pan-pinch`

### 2.2 Interactive Hotspots
*   **Style:** Pulsing SVG circles, phase-coloured (Blue=Awareness, Lime=Engage, Teal=Convert)
*   **Hover:** 180px-wide tooltip with tactic name
*   **Click:** Opens detail panel with full tactic information
*   **Filter:** Hotspots fade/hide when filtered out

### 2.3 Detail Panel
When a hotspot is clicked, a panel slides up from the bottom (elevator-style animation) containing:
*   Phase badge with colour dot
*   Tactic name and hotspot label
*   Phase-coloured divider
*   Description paragraph
*   Target audience card with icon
*   Key execution details as a bulleted list
*   Large tactic number watermark

### 2.4 Controls
*   **Phase Filter Pills:** Show All (default), Awareness, Engage, Convert — top-right header bar
*   **Zoom Controls:** +/− buttons and reset view — bottom-right
*   **Phase Legend:** Bottom-left with colour-coded dots
*   **Help Hint:** "Scroll to zoom · Drag to pan · Click hotspots for details" (auto-fades)

### 2.5 Flow Visualisation
Animated vertical flow paths between floors showing strategy progression:
*   **Awareness → Engage:** 7 curved streams with animated particles, "QUALIFY" gateway badge (Marketing Qualified → Sales Qualified), 100% Pipeline Flow metric
*   **Engage → Convert:** 5 curved streams, "PROPOSE" gateway badge (Sales Qualified → Opportunity), 100% Deal Flow metric
*   Side annotations with handoff details at each transition

---

## 3. Data Structure — 21 Tactics

All tactics are loaded from `src/data/tactics.json`. Each entry contains: `id`, `hotspotLabel`, `name`, `phase`, `phaseLabel`, `description`, `targetAudience`, `details[]`, `x`, `y`.

### Phase 1: Awareness — Ground Floor (9 Tactics)

*   **Hotspot 1: ICP & Account Tiering**
    *   *Name:* Enterprise ICP & Account Segmentation
    *   *Target:* Internal: Sales & Marketing Leadership
    *   *Description:* Defining the top 100 target accounts using a rigorous 3-tier segmentation model based on strategic value, workforce size, and compliance risk exposure.
    *   *Details:* Tier 1 (Top 15 "Whales"): Revenue >$1B — Lendlease, CIMIC, John Holland, Multiplex, Downer. Tier 2 (Next 35): $200M–$1B — Built, Fulton Hogan, BMD, BESIX/Watpac, Kane. Tier 3 (Remaining 50): Regional builders, engineering firms, certification bodies. Architecture targets: Woods Bagot, Hassell, Bates Smart, AECOM, WSP. Certification: Buildcert, Drake Development Solutions.

*   **Hotspot 2: Buying Committee Map**
    *   *Name:* Buying Committee Persona Framework
    *   *Target:* All Personas within Target Accounts
    *   *Description:* Enterprise deals involve 6–11 stakeholders. Tools™ must map and tailor messaging to each persona to multi-thread effectively.
    *   *Details:* Quality/Compliance Director (Champion), Construction/Project Manager (End User), COO (Economic Buyer), Training/Development Manager (Influencer), IT/Systems Director (Technical Evaluator — ISO 9001, data sovereignty, Revit integration).

*   **Hotspot 3: Intelligence Gathering**
    *   *Name:* Account Planning & Intelligence
    *   *Target:* Tier 1 & Tier 2 Enterprise Accounts
    *   *Description:* Creating detailed account dossiers including recent company news, major project wins, identified stakeholders, and compliance pain point hypotheses.
    *   *Details:* Weeks 1–4 before any outreach. Clean CRM data, ensure tracking, align sales/marketing on finalised Target Account List (TAL).

*   **Hotspot 4: Known Contacts (CRM)**
    *   *Name:* Mining Existing Database
    *   *Target:* Existing Free Users at Target Firms
    *   *Description:* Identifying current free users or Individual PRO users at target firms to serve as internal champions and first-party intent signals.
    *   *Details:* Audit free users for enterprise adoption, define landing pages and CTAs, implement self-qualification, flag PLG expansion opportunities.

*   **Hotspot 5: External Enrichment**
    *   *Name:* External Data Enrichment
    *   *Target:* Quality Directors, COOs, IT Directors
    *   *Description:* Using external enrichment and scraping tools to complete the buying committee map at each target account.
    *   *Details:* Delay outreach until list is complete. Identify 6–10 stakeholders per account. Tools: ZoomInfo, Apollo, LinkedIn Sales Navigator.

*   **Hotspot 6: Content Strategy**
    *   *Name:* Omni-channel Content Distribution
    *   *Target:* Entire Construction Industry
    *   *Description:* High-value thought leadership content across multiple channels, focusing on cost of defects, NCC complexity, and digital compliance transformation.
    *   *Details:* LinkedIn company page, PR releases, blog republishing, content syndication through MBA/HIA publications, whitepapers and case studies.

*   **Hotspot 7: Social Ads**
    *   *Name:* Targeted Advertising & Competitor Conquesting
    *   *Target:* Buying Committee in Top 100 Accounts
    *   *Description:* Targeted ads to buying committee personas, including competitor conquesting ads to capture high-intent accounts researching alternatives.
    *   *Details:* LinkedIn, Meta, Google Search/Display. Competitor conquesting: "Tools™ vs. Hammertech", "Procore Alternatives". Remarketing to intent signals and pricing page visits.

*   **Hotspot 8: EDM Outreach**
    *   *Name:* 3-Part Short Sequence
    *   *Target:* Curated Target List
    *   *Description:* Concise, impactful email sequence for initial awareness before the full engagement cadence.
    *   *Details:* 3-part sequence with account-specific relevance. Timed after content warm-up phase (Week 5+).

*   **Hotspot 9: Lumpy Mailout**
    *   *Name:* High-Value Direct Mail & Executive Gifting
    *   *Target:* C-Suite at Tier 1 Accounts
    *   *Description:* Physical pattern interrupts to command executive attention — a powerful differentiator in an era of overflowing digital inboxes.
    *   *Details:* "Site Safety Audit" Kit with custom-branded hard hat (prospect's logo + Tools™ logo). Bespoke printed report + compliance savings. Dimensional mailers (rarely intercepted by gatekeepers). Handwritten note from founder + Personalised URL (PURL). Glossy brochures with QR codes.

### Phase 2: Engage — First Floor (8 Tactics)

*   **Hotspot 10: Land & Expand (PLG)**
    *   *Name:* Product-Led Growth Escalation
    *   *Target:* Tier 1 Builders, Existing Free Users
    *   *Description:* Leveraging free-tier usage within enterprise accounts as the ultimate first-party intent data source for enterprise expansion.
    *   *Details:* Executive Escalation: "Hi [CIO], three of your site teams are using Tools™. Can I show you the executive dashboard?" Confidential internal case studies using actual product usage data. Upsell path: Free → Individual PRO → Enterprise.

*   **Hotspot 11: Personalised Video**
    *   *Name:* Video Prospecting
    *   *Target:* Key Decision Makers at Target Accounts
    *   *Description:* 60-second personalised videos showing the prospect's actual website or project inside the Tools™ interface.
    *   *Details:* Tools: Vidyard or Loom. Video emails lift open rates 35%+, click-through rates increase 150%+.

*   **Hotspot 12: LinkedIn Strategy**
    *   *Name:* Layered Targeting & Social Selling
    *   *Target:* Buying Committee across Target Accounts
    *   *Description:* Targeting by function and seniority with hyper-personalised warm-up sequences. Upload verified top 100 account list into LinkedIn Campaign Manager.
    *   *Details:* Competitor conquesting ads. Warm-up: Engage content → Connect → Follow up with value. Day +1/+2/+5 post-connection with high-value assets (ROI calculator). Layer targeting: C-Suite (ROI), Operations/HSE (compliance), IT/Procurement (security).

*   **Hotspot 13: Multi-Threaded Email**
    *   *Name:* Intent-Driven Email Cadence
    *   *Target:* 3+ Roles in the Buying Committee
    *   *Description:* Deliberately multi-threading to 3+ roles simultaneously. If a template can be sent to 500 people without alteration, it is not ABM.
    *   *Details:* Day 1 (Hook): Specific account trigger. Day 4 (Proof): Embedded personalised video via Vidyard/Loom. Day 7 (Value): Case study — Hutchinson Builders or Richard Crookes. Day 12 (Breakup): Polite withdrawal.

*   **Hotspot 14: Events & Roundtables**
    *   *Name:* VIP Experiences & FCON-Tech Strategy
    *   *Target:* Tier 1 Executives, Industry Leaders
    *   *Description:* Targeted micro-events and VIP experiences around major industry gatherings. Face-to-face trust condenses the sales cycle.
    *   *Details:* VIP Dinners: 8–12 people, CEO-hosted, peer networking. Virtual roundtables hosted by Jerry Tyrrell. FCON-Tech 2026 (Sydney, Oct): Pre-event outreach 2 weeks prior, deploy executives during, host private breakfast roundtable, follow up within 24 hours.

*   **Hotspot 15: Personalised Landing Pages**
    *   *Name:* 1:1 and 1:Few Web Experiences
    *   *Target:* Top 15 Accounts & Key Verticals
    *   *Description:* Dynamic website personalisation using tools like Mutiny. Generic homepages do not convert enterprise buyers.
    *   *Details:* 1:1 for Top 15: "How John Holland Can Digitise WHS Compliance Across 50+ Active Sites" with prospect's logo, pre-filled ROI calculator, direct calendar link. 1:Few for verticals: Civil Engineering vs. Commercial High-Rise.

*   **Hotspot 16: Leverage Strengths**
    *   *Name:* Weaponising Existing Assets
    *   *Target:* All Enterprise Prospects
    *   *Description:* Systematically deploying Tools™ competitive advantages across all ABM touchpoints.
    *   *Details:* Hutchinson Builders & Richard Crookes endorsements (strongest social proof). Visual product demos: "A picture tells 1,000 words." ISO 9001 Certification & Patents for risk-averse procurement. CPD/PointsBuild partnership: enterprise firms mandated to provide CPD.

*   **Hotspot 17: Sales Discovery & Pitch**
    *   *Name:* Initial Sales Process
    *   *Target:* Qualified Enterprise Prospects
    *   *Description:* Deep-diving into compliance challenges and presenting the tailored Tools™ solution with the full arsenal of enterprise collateral.
    *   *Details:* Enterprise Pitch Decks, implementation guides, use cases, custom pricing models, visual product demonstrations as the "aha moment."

### Phase 3: Convert — Penthouse (4 Tactics)

*   **Hotspot 18: Deal Acceleration**
    *   *Name:* Customised Proposals & Enablement
    *   *Target:* Active Pipeline Opportunities
    *   *Description:* Marketing supports sales to accelerate the deal with tailored business cases and enablement resources for the internal champion.
    *   *Details:* Tailored business cases / ROI models. Stakeholder enablement: security docs for IT, training overviews for HR. Provide champion with resources to sell internally. Executive alignment: peer-to-peer meetings between leadership teams.

*   **Hotspot 19: Propose & Close**
    *   *Name:* Final Sales Process
    *   *Target:* Decision Makers & Procurement
    *   *Description:* Presenting the formal proposal and securing the enterprise contract, leveraging Tier 1 endorsements and proven ROI.
    *   *Details:* Proposal Decks, standardised contracts, Hutchinson Builders / Richard Crookes references. Tier 1 goal: secure pilot programs on major flagship projects.

*   **Hotspot 20: Conversion Outcomes**
    *   *Name:* Routing & Immediate Value
    *   *Target:* All Qualified Leads
    *   *Description:* Routing prospects to the appropriate conversion path based on self-qualification with immediate value delivery.
    *   *Details:* Small Teams → "Buy Now" self-serve. Enterprise Teams → "Book A Demo." Immediate value: 10 Enterprise Playbooks. 30 Days Complimentary PRO Access.

*   **Hotspot 21: ABM KPIs & Measurement**
    *   *Name:* Account-Centric Metrics Framework
    *   *Target:* Internal: Sales & Marketing Leadership
    *   *Description:* Traditional lead-gen metrics are insufficient for enterprise ABM. Success is measured using account-centric metrics.
    *   *Details:* Account Engagement: % of target accounts engaged, stakeholders per account. Pipeline Generation: SQOs from top 100, total pipeline value. Deal Velocity: Average time from first engagement to closed-won. Revenue & ROI: Enterprise ARR, expansion revenue, overall ABM program ROI.

---

## 4. Technical Implementation

*   **Framework:** React 18 + Vite
*   **Pan/Zoom:** `react-zoom-pan-pinch` (TransformWrapper with 0.5×–4× scale)
*   **Canvas:** Inline SVG (1000×1300 viewBox) with all architectural elements rendered as React components
*   **Styling:** CSS with custom properties matching BuildingTools™ branding (Inter font, `#0077FF` blue, `#BFE000` lime, `#00C2A8` teal)
*   **Data:** `src/data/tactics.json` — 21 entries loaded at build time
*   **Branding:** BuildingTools™ Logo.png in header, Inter font (300–900 weights via Google Fonts)
*   **Detail Panel:** Elevator-style animation (slides up from bottom, `translateY` with cubic-bezier easing)
*   **Flow Paths:** Animated SVG particles flowing upward between floors with gradient-coloured bezier curves

### File Structure
```
src/
  App.jsx                    — Root: state, TransformWrapper, layout
  main.jsx                   — React entry point
  data/tactics.json           — All 21 tactic definitions
  components/
    BlueprintCanvas.jsx       — Vertical building SVG (floors, roof, foundation, elevator, staircase)
    Hotspot.jsx               — Pulsing dot with tooltip
    DetailPanel.jsx           — Slide-up detail panel
    FilterBar.jsx             — Phase filter pills
    FlowPaths.jsx             — Animated vertical flow between floors
    ZoomControls.jsx          — +/−/reset buttons
  styles/
    variables.css             — CSS custom properties (branding)
    app.css                   — All component styles
public/
  Logo.png                   — BuildingTools™ logo
```

---

## 5. Content Sources

The 21 tactics are derived from three source documents:
1.  **Original Warp Specification** — 17 base tactics across 3 phases
2.  **ABM Channel Strategy: The Deep-Dive Playbook** (Ari Vivekanandarajah, March 2026) — Detailed channel execution: LinkedIn layered targeting, 4-step cold email sequence, FCON-Tech 3-stage strategy, "Site Safety Audit" kit details, PLG executive escalation play, 1:1/1:Few landing page specifics, competitor conquesting, video prospecting with Vidyard/Loom stats
3.  **ABM Strategy: Acquiring the Top 100 Enterprise Clients** (Ari Vivekanandarajah, March 2026) — Enterprise ICP definition with 4 target segments, 5-persona buying committee framework, 3-tier ABM approach (Strategic 1:1, ABM Lite 1:Few, Programmatic 1:Many), leveraging existing strengths (Hutchinson/RCC endorsements, ISO 9001, patents, CPD/PointsBuild), account-centric KPI framework

### Tactics added from ABM documents (not in original spec):
*   **#1 Enterprise ICP & Account Segmentation** — 3-tier account structure with named targets
*   **#2 Buying Committee Persona Framework** — 5 persona types with tailored value props
*   **#16 Weaponising Existing Assets** — Endorsements, ISO 9001, patents, CPD partnership
*   **#21 Account-Centric Metrics Framework** — Enterprise ABM KPIs

### Tactics enriched with ABM document detail:
*   **#7 Social Ads** — Added competitor conquesting (Tools™ vs. Hammertech, Procore Alternatives)
*   **#9 Lumpy Mailout** — Added prospect-branded hard hat, PURL, dimensional mailer details
*   **#10 PLG** — Added confidential case studies using actual usage data
*   **#11 Video** — Added 60-second format, Vidyard/Loom stats (35% open rate lift, 150%+ CTR)
*   **#14 Events** — Added FCON-Tech 2026 3-stage strategy (pre/during/post)
