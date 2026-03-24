# Hotspot Connection & Flow Map: Enterprise Marketing Strategy

This document defines the logical relationships, dependencies, and visual flow paths between the 21 tactics (hotspots) in the BuildingTools™ Enterprise Marketing Strategy map. It provides the logic required for Warp to animate the particle streams and show how prospects move through the funnel.

## 1. Core Logic & Visualisation Rules

*   **Within-Phase Dependencies (Solid Lines):** Tactics that must occur sequentially within the same phase are connected by solid, static lines.
*   **Cross-Phase Flows (Animated Particles):** When a prospect transitions from one phase to the next (e.g., Awareness → Engage), the connection is visualised as an animated stream of particles flowing upward to the next floor.
*   **Segment-Specific Paths:** The flow diverges based on the target account tier (Tier 1, Tier 2, Tier 3). These paths should be colour-coded or visually distinct when a specific tier is selected in the UI.

---

## 2. Phase 1: Awareness (Ground Floor) Dependencies

The Awareness phase is foundational. The logic here is sequential: strategy definition must precede data gathering, which must precede campaign execution.

### The Strategic Foundation (Sequential)
1.  **#1 ICP & Account Tiering** MUST flow into **#2 Buying Committee Map**. (You cannot map the committee until you know the accounts).
2.  **#2 Buying Committee Map** MUST flow into **#3 Intelligence Gathering**. (You cannot gather intelligence until you know who you are researching).

### Data Sourcing (Parallel)
From **#3 Intelligence Gathering**, the flow splits into two parallel data sourcing tracks:
*   Flows to **#4 Known Contacts (CRM)**
*   Flows to **#5 External Enrichment**

### Campaign Execution (Omni-channel Flood)
Once the Target Account List (TAL) is built from #4 and #5, the flow converges and then explodes outward into the "Flood Them" campaigns. Both #4 and #5 flow into:
*   **#6 Content Strategy** (Broad air cover)
*   **#7 Social Ads** (Targeted air cover)
*   **#8 EDM Outreach** (Direct digital touch)
*   **#9 Lumpy Mailout** (Direct physical touch - *Tier 1 & 2 Only*)

---

## 3. Cross-Phase Flows: Awareness → Engage

This is where the animated particle streams move from the Ground Floor (Awareness) up to the First Floor (Engage). The flows are highly dependent on the specific tactic and the account tier.

### Flow Path A: The PLG "Land & Expand" Route
*   **From:** #4 Known Contacts (CRM)
*   **To:** #10 Land & Expand (PLG)
*   *Logic:* Existing free users identified in the CRM are immediately routed to the PLG escalation play to engage leadership.

### Flow Path B: The Executive "Pattern Interrupt" Route (Tier 1 Focus)
*   **From:** #9 Lumpy Mailout
*   **To:** #11 Personalised Video AND #14 Events & Roundtables
*   *Logic:* The physical mailout (e.g., the custom hard hat) creates the pattern interrupt. This is immediately followed up by a highly personalised video referencing the gift, or an invitation to a VIP dinner.

### Flow Path C: The Digital Warm-Up Route
*   **From:** #7 Social Ads AND #6 Content Strategy
*   **To:** #12 LinkedIn Strategy
*   *Logic:* Prospects who have been warmed up by ads and content are now primed for the hyper-personalised LinkedIn social selling sequence.

### Flow Path D: The Direct Response Route
*   **From:** #8 EDM Outreach
*   **To:** #13 Multi-Threaded Email AND #15 Personalised Landing Pages
*   *Logic:* The initial short email sequence transitions into the deep, multi-threaded cadence. Clicks from these emails direct prospects to their 1:1 or 1:Few personalised landing pages.

---

## 4. Phase 2: Engage (First Floor) Dependencies

Within the Engage phase, tactics operate somewhat concurrently to surround the buying committee, but they all ultimately converge on a single goal: securing the meeting.

### The Convergence Point
All engagement tactics (#10 PLG, #11 Video, #12 LinkedIn, #13 Email, #14 Events, #15 Landing Pages) MUST flow into:
*   **#17 Sales Discovery & Pitch**
*   *Logic:* The entire purpose of the multi-channel engagement phase is to generate a Sales Qualified Opportunity (SQO) and get the prospect into the discovery process.

### The Support Loop
*   **#16 Leverage Strengths** (Endorsements, ISO 9001, etc.) acts as a continuous support loop, feeding into #12 LinkedIn, #13 Email, and #17 Sales Discovery. It is the "ammunition" used in these tactics.

---

## 5. Cross-Phase Flows: Engage → Convert

The animated particle streams now move from the First Floor (Engage) up to the Penthouse (Convert). This transition represents a prospect moving from a Sales Qualified Lead to an active Pipeline Opportunity.

### The Main Deal Flow
*   **From:** #17 Sales Discovery & Pitch
*   **To:** #18 Deal Acceleration
*   *Logic:* Once the initial pitch is successful, the deal moves into the acceleration phase where custom business cases are built.

---

## 6. Phase 3: Convert (Penthouse) Dependencies

The final phase is highly linear, driving toward the closed-won revenue.

### The Closing Sequence
1.  **#18 Deal Acceleration** MUST flow into **#19 Propose & Close**. (You must build the business case before you can propose the contract).
2.  **#19 Propose & Close** MUST flow into **#20 Conversion Outcomes**. (Once closed, the client is routed to onboarding/immediate value delivery).

### The Feedback Loop
*   **#21 ABM KPIs & Measurement** sits above the entire process.
*   *Logic:* All conversion outcomes (#20), as well as data from the Engage phase (#17), flow into #21 to measure pipeline generation, deal velocity, and overall ROI.

---

## 7. Segment-Specific Pathing (For UI Filtering)

When a user selects a specific Tier in the UI, the map should highlight the specific flow paths relevant to that segment:

### Tier 1: Strategic ABM (Top 15 "Whales")
*   **Highlighted Path:** #1 → #2 → #3 → #5 → #9 (Lumpy Mailout) → #11 (Video) & #14 (VIP Events) → #15 (1:1 Landing Pages) → #17 → #18 → #19.
*   *Visual Note:* This path should be the thickest, most prominent flow, representing the highest value deals.

### Tier 2: ABM Lite (Next 35 Accounts)
*   **Highlighted Path:** #1 → #2 → #3 → #4 & #5 → #7 (Ads) & #8 (EDM) → #12 (LinkedIn) & #13 (Multi-thread Email) → #15 (1:Few Landing Pages) → #17 → #18 → #19.
*   *Visual Note:* This path relies heavily on digital clustering and industry-specific messaging rather than physical mailouts.

### Tier 3: Programmatic ABM (Remaining 50 Accounts)
*   **Highlighted Path:** #1 → #4 (CRM Mining) → #6 (Content) & #7 (Ads) → #10 (PLG Escalation) → #20 (Conversion Outcomes - Small Team / Self-Serve).
*   *Visual Note:* This path bypasses the heavy enterprise sales motion (#17, #18, #19) and routes directly to product-led growth and self-serve conversion.
