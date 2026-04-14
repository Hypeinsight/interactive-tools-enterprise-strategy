/**
 * contentPreviews.js
 * Rich preview content for select tactics.
 * Keyed by tactic ID.
 */

export const TACTIC_PREVIEWS = {

  // ── Meta Ads (id 22) ──────────────────────────────────────────────
  22: {
    type: 'image',
    image: '/meta-ads.png',
    caption: 'Current Meta Ads creative running across Facebook and Instagram.',
  },

  // ── Google Ads (id 23) ────────────────────────────────────────────
  23: {
    type: 'image',
    image: '/google-ads.png',
    caption: 'Current Google Search and Display campaigns targeting compliance keywords.',
  },

  // ── EDM Outreach (id 8) - 3-Part Awareness Sequence ──────────────
  8: {
    type: 'email-sequence',
    label: 'Email Preview: 3-Part Awareness Sequence',
    emails: [
      {
        step: 'Email 1',
        timing: 'Week 5+ - after content warm-up',
        subject: 'NCC compliance at [Company] - quick question',
        from: 'Ari V. - Tools',
        preview: 'Hi [First Name], quick one...',
        body: `Hi [First Name],

Quick one from me at Tools.

We work with a number of Australia's leading commercial builders to help their quality and compliance teams manage NCC requirements across active sites - replacing the usual mess of spreadsheets, printed code booklets, and repeated Google searches.

Given [Company]'s portfolio, I thought it might be worth a 15-minute conversation to see if we can add value for your team.

Happy to send over a short video walkthrough if easier.

Warm regards,
Ari
Tools - buildingtools.co`,
      },
      {
        step: 'Email 2',
        timing: '3 days after Email 1',
        subject: 'How Hutchinson Builders streamlined site compliance',
        from: 'Ari V. - Tools',
        preview: 'Sharing a quick example that might be relevant...',
        body: `Hi [First Name],

Following on from my last message - wanted to share something relevant.

Hutchinson Builders rolled out Tools across their site teams and their quality managers now spend significantly less time answering compliance queries from site, because the answers are already in the platform.

Same story with Richard Crookes and Hickory.

The product is used across multi-site commercial builds, residential developments and civil projects. It works wherever teams need to interpret NCC requirements quickly and accurately.

Worth a quick chat? I can keep it to 15 minutes.

Best,
Ari`,
      },
      {
        step: 'Email 3',
        timing: '7 days after Email 2',
        subject: 'One quick thing before I close the loop',
        from: 'Ari V. - Tools',
        preview: 'Last one from me on this...',
        body: `Hi [First Name],

Last one from me on this.

If NCC compliance is not front of mind right now, completely understood. Happy to revisit when the timing is better.

If you are open to a quick look at what we do, here is a short product overview: buildingtools.co

Either way, best of luck with [Company]'s upcoming projects.

Ari
Tools
P: [Phone]`,
      },
    ],
  },

  // ── Multi-Threaded Email (id 13) - Intent-Driven ABM Cadence ─────
  13: {
    type: 'email-sequence',
    label: 'Email Preview: Intent-Driven ABM Cadence',
    emails: [
      {
        step: 'Day 1 - Hook',
        timing: 'Account-specific trigger (project win, news event)',
        subject: 'Saw the [Project Name] win - compliance across that scale?',
        from: 'Kate A. - Tools (Sales)',
        preview: 'Congratulations on [Project Name]...',
        body: `Hi [First Name],

Saw the announcement about [Project Name] - impressive project. Congratulations to the [Company] team.

Given the scale and multi-site nature of that build, I wanted to reach out quickly. We work with a number of Tier 1 commercial builders in Australia to help their quality and compliance teams stay on top of NCC requirements across active sites - without the usual manual lookup process.

Hutchinson Builders, Richard Crookes and Hickory are all on the platform. Happy to show you what it looks like in practice.

Worth 15 minutes?

Kate Aston
Sales - Tools`,
      },
      {
        step: 'Day 4 - Proof',
        timing: '4 days after Day 1 - personalised video via Vidyard or Loom',
        subject: 'I made this 60-second video for [Company]',
        from: 'Kate A. - Tools (Sales)',
        preview: 'Quick video walkthrough - took 60 seconds to record...',
        body: `Hi [First Name],

Quick follow-up. I recorded a short 60-second walkthrough showing how [Company]'s team could use Tools across a project like [Project Name].

[Video thumbnail / Vidyard link]

The clip shows:
- How your site teams would pull up NCC compliance details on mobile
- How QMs get instant answers without referencing physical code booklets
- How team adoption looks across a multi-site build

Happy to jump on a call and walk through it live if that is easier.

Kate`,
      },
      {
        step: 'Day 7 - Value',
        timing: '7 days after Day 1 - relevant case study',
        subject: 'How Hickory manages compliance across 40+ active sites',
        from: 'Kate A. - Tools (Sales)',
        preview: 'Short case study - might be relevant for [Company]...',
        body: `Hi [First Name],

One more thing worth sharing.

Hickory rolled out Tools across their site teams and quality managers. The key outcome was reducing the time spent answering ad-hoc compliance queries from site - questions that used to mean a phone call, a search through the NCC, and often an uncertain answer.

With Tools, the same query is answered in seconds directly by the person on-site.

Given [Company]'s scale, I think there is a strong case for something similar. Happy to put together a short proposal tailored to your team's workflow.

Kate
Tools - buildingtools.co`,
      },
      {
        step: 'Day 12 - Breakup',
        timing: '12 days after Day 1 - professional close, leaves door open',
        subject: 'Closing the loop, [First Name]',
        from: 'Kate A. - Tools (Sales)',
        preview: 'Last note from me...',
        body: `Hi [First Name],

I have reached out a few times and do not want to be a nuisance.

If the timing is not right for [Company] right now, I completely understand. I will leave it there.

If anything changes or a compliance challenge comes up where you think we could help, feel free to get in touch directly: kate@buildingtools.co

Wishing [Company] all the best with upcoming projects.

Kate Aston
Tools`,
      },
    ],
  },
}
