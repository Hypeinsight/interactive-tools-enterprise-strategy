import React from 'react'

// Modern SVG icon component
function Icon({ d, paths }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round">
      {paths}
    </svg>
  )
}

const WHY_CARDS = [
  {
    icon: <Icon paths={<><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>} />,
    title: 'Highest Revenue Impact',
    text: 'The highest propensity to pay and already our biggest customers. Hutchinson Builders, Richard Crookes, Icon, Hickory and Taylor are all active. Mervac returned this morning after two years. Enterprise builders put their hands in their pockets.',
  },
  {
    icon: <Icon paths={<><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></>} />,
    title: 'Builders Are Ready to Buy',
    text: 'Unlike architects who resist fees, enterprise builders see compliance as a business imperative. The response is immediate: it is a no-brainer. No product education required. The cost of defects, rework and legal exposure dwarfs the platform cost.',
  },
  {
    icon: <Icon paths={<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>} />,
    title: 'Champions Already Exist',
    text: 'Quality Managers at our enterprise clients are already using and advocating. Drury at Taylor, Tom and Lauren at Icon, Andrew and Mark at Hickory, Mariana and Alex at Mervac. The strategy converts that internal advocacy into formal contracts.',
  },
  {
    icon: <Icon paths={<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>} />,
    title: 'Urgent Need, No Competition',
    text: 'NCC updates, multi-site compliance obligations and defect liability are pressing in 2026. Quality Managers are tasked with stopping mistakes when things go wrong. Tools solves this. There is no enterprise-grade compliance platform built for Australian construction.',
  },
]

const TIERS = [
  {
    badge: 'Tier 1: Whales',
    badgeClass: 'tier-1',
    def: 'Revenue >$1B',
    examples: 'Lendlease · CIMIC · John Holland · Multiplex · Downer',
  },
  {
    badge: 'Tier 2: Primary Target',
    badgeClass: 'tier-2',
    def: 'Revenue $200M to $1B',
    examples: 'Built · Hickory · Fulton Hogan · BMD · Kane · BESIX/Watpac',
    primary: true,
  },
]

export default function IntroScreen({ onBegin }) {
  return (
    <div className="intro-screen">
      <div className="intro-container">

        {/* Logo */}
        <div className="intro-logo">
          <img src="/Logo.png" alt="Tools" />
        </div>

        {/* Headline */}
        <div className="intro-headline">
          <h1>Enterprise Builders</h1>
          <p className="intro-subhead">
            Our number one target audience for 2026. Who they are, why they buy, and why this is the right focus.
          </p>
        </div>

        {/* 4 reasons */}
        <div className="intro-why-grid">
          {WHY_CARDS.map(({ icon, title, text }) => (
            <div key={title} className="intro-why-card">
              <div className="intro-why-icon">{icon}</div>
              <h3 className="intro-why-title">{title}</h3>
              <p className="intro-why-text">{text}</p>
            </div>
          ))}
        </div>

        {/* Who we target */}
        <div className="intro-who">
          <h2>Build Our Target List</h2>

          <div className="intro-tiers">
            {TIERS.map(({ badge, badgeClass, def, examples, primary }) => (
              <div key={badge} className={`intro-tier${primary ? ' primary' : ''}`}>
                <span className={`intro-tier-label ${badgeClass}`}>{badge}</span>
                <span className="intro-tier-def">{def}</span>
                <span className="intro-tier-examples">{examples}</span>
              </div>
            ))}
          </div>

          <div className="intro-personas">
            <div className="intro-persona primary-champion">
              <strong>Primary Target: Quality Manager (QM)</strong>
              <span>
                Identify 100 QMs from the biggest enterprise builders in Australia by revenue. Know their names and titles.
                Big organisations will have several people in Quality. QMs deal with the mess when things go wrong - they are tasked with stopping mistakes and improving quality.
              </span>
            </div>
            <div className="intro-persona primary-champion" style={{ marginTop: '0.5rem' }}>
              <strong>Named champions who have already adopted Tools</strong>
              <span>Taylor Construction: James Drury · ICON: Tom and Lauren · Hickory: Andrew and Mark</span>
            </div>
            <div className="intro-persona">
              <strong>Secondary: Supporters - key to win, but not direct drivers</strong>
              <span>Design Managers · Construction Managers · Site Managers</span>
            </div>
            <div className="intro-persona">
              <strong>Secondary: C-Suite - important for final sign-off only</strong>
              <span>C-Suite provide the final approval but typically do not drive the change. Win the QM first, then the C-Suite follows.</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button className="intro-begin-btn" onClick={onBegin}>
          View Enterprise Builder Strategy
        </button>

      </div>
    </div>
  )
}
