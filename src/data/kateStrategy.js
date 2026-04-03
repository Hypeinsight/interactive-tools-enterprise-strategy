/**
 * Kate's Strategic Overlay
 * Amendments based on Kate Aston's recommendations from the
 * Enterprise BLD meeting — 27 Mar 2026.
 *
 * This data is only shown when kateMode is active (toggled in the header).
 * Original tactic data is never modified — this is purely additive.
 */

// Per-tactic strategic notes, shown as a card in the detail panel
export const KATE_TACTIC_OVERRIDES = {
  1: {
    badge: 'REFRAME',
    badgeColor: '#BFE000',
    note: "Primary target shifts to Tier 2 builders ($50\u2013300M) \u2014 commercial builders and large residential developers such as Hickory, Built, and Kane. Tier 1 whales (Lendlease, CIMIC, Multiplex) become a secondary / stretch target, not the lead priority. Commercial builders already prioritise compliance and process, making them faster and more predictable to convert.",
  },
  4: {
    badge: 'START HERE',
    badgeColor: '#BFE000',
    note: "Kate's Phase 1 begins with the existing CRM \u2014 mine the database for enterprise-registered accounts before any net-new outreach. Hickory is the prime example: existing relationship, spare licence capacity, proven product usage. This is the lowest-effort, highest-probability path to early enterprise wins.",
  },
  9: {
    badge: 'IMMEDIATE',
    badgeColor: '#FF6B35',
    note: "Kate's #1 short-term action: lumpy direct mail to the top 50\u2013100 CRM accounts, followed immediately by a phone call. Physical mail cuts through digital noise, gives sales a tangible reason to call, and gets runs on the board before the HubSpot nurture campaign is ready. Quality over quantity \u2014 20 high-quality sends beats 100 generic ones. Kate has a merchandise contact who can deliver interesting items within budget.",
  },
  16: {
    badge: 'KEY ADDITION',
    badgeColor: '#00C2A8',
    note: "For all enterprise prospects, present the Customisable Workspace as the only option. Do not offer or discuss the multi-license path. A cheaper alternative creates an exit ramp that reduces conversion to the high-value product. Since Tools\u2122 is affordable relative to enterprise budgets, there is no reason to show a lesser tier \u2014 it only introduces doubt and slows the deal.",
  },
  17: {
    badge: 'NOTE',
    badgeColor: '#0077FF',
    note: "Ensure pitch decks and discovery materials explicitly address commercial builders, not just residential. Commercial builders respond strongly to compliance ROI, process standardisation, and speed-to-delivery messaging. Kate's experience: commercial divisions invest in compliance tools reflexively \u2014 they know the cost of non-compliance to their bottom line and don't need to be persuaded on that front.",
  },
  21: {
    badge: 'UPDATE',
    badgeColor: '#0077FF',
    note: "Primary metrics: MQAs (marketing validated accounts), SQOs (sales qualified opportunities), pipeline value, conversion rate, and sales cycle length by tier. Leading indicators: high-intent engagement, multi-user activity, role-based content engagement. Note: KPIs are not yet established \u2014 Ari is working on setting these with Siva and Jerry as a priority.",
  },
}

// Floor sub-label overrides when Kate mode is active
export const KATE_FLOOR_OVERRIDES = {
  awareness: { sub: 'CRM-First Approach · Foundation & Groundwork · 9 Tactics' },
  engage:    { sub: 'Tier 2 Focus · Framing & Structure · 8 Tactics' },
  convert:   { sub: 'Workspace-Only Close · Fit-out & Completion · 4 Tactics' },
}
