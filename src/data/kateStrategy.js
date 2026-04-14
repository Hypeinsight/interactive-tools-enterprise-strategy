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
  7: {
    badge: 'LEAD QUALITY',
    badgeColor: '#FF9500',
    note: "Ari raised a valid concern: enterprise ads will initially generate a mix of lead quality — some unsuitable prospects wanting demos, which wastes sales time. Kate's position: in the early stages you have to cast your net wide. No lead is truly bad. Every response, qualified or not, gives you data to tighten targeting. The cost of a few unqualified demos is far less than under-investing and never learning. Siva agrees: send everything through and Kate can qualify on the call. Marketing leads are a bonus on top of proactive CRM outreach — once the pipeline sharpens, so will the ads.",
  },
  6: {
    badge: 'REFRAME',
    badgeColor: '#BFE000',
    note: "Current go-to-market content skews heavily residential. Commercial builders need to be addressed explicitly and separately — they respond to different pain points: compliance obligations, speed-to-delivery, defect liability, and process standardisation. Content strategy should produce distinct commercial-focused pieces, not adapt residential content. Kate's direct experience: when she brought a commercial division into a previously residential business, the difference in priorities, budgets, and decision-making was chalk and cheese. Commercial builders invest in compliance tools reflexively — they don't need to be sold on the why.",
  },
  14: {
    badge: 'REFINE',
    badgeColor: '#BFE000',
    note: "Kate's events vision is distinct from the FCON-Tech trade show approach in the current plan. She recommends intimate roundtable lunches: 15\u201320 people, private room, no booths, no large-scale format. Start with one trial in Melbourne, then Sydney. The key mechanic: curated invite lists — when targets know who else is attending (peers, industry leaders), they show up. Kate has existing relationships she can bring to seed the first events. Face-to-face trust is the fastest sales cycle compressor in construction. Long-term, start charging for them and build a reputation as the go-to industry forum.",
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
  awareness: { sub: 'Whale: Wks 1-12 · Tier 2: Wks 1-8 · External Path: Wks 2-14 · Click to edit' },
  engage:    { sub: 'Whale: Wks 6-24 · Tier 2: Wks 4-14 · Overlaps with Awareness · Click to edit' },
  convert:   { sub: 'Whale: Wks 16-40+ · Tier 2: Wks 10-20 · Starts once champion is identified · Click to edit' },
}
