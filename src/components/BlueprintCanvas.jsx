import React, { useState } from 'react'
import Hotspot from './Hotspot'
import FlowPaths from './FlowPaths'
import { KATE_TACTIC_OVERRIDES, KATE_FLOOR_OVERRIDES } from '../data/kateStrategy'

const SVG_WIDTH = 1000
const SVG_HEIGHT = 1700

const PHASE_DISPLAY_NAMES = {
  awareness: 'AWARENESS',
  engage: 'ENGAGE',
  convert: 'CONVERT',
}

// ── Floor definitions
const FLOORS = {
  awareness: { y: 880, h: 500, label: 'GROUND FLOOR', phase: 'Phase 1: Awareness', sub: 'Foundation & Groundwork · Tier 1 Whales + Tier 2 · 15 Tactics', color: '#1482FF' },
  engage:    { y: 480, h: 340, label: 'FIRST FLOOR',  phase: 'Phase 2: Engage',    sub: 'Framing & Structure · 8 Tactics',    color: '#BFE000' },
  convert:   { y: 100, h: 320, label: 'PENTHOUSE',    phase: 'Phase 3: Convert',    sub: 'Fit-out & Completion · 4 Tactics',   color: '#00C2A8' },
}

const BLDG_LEFT = 80
const BLDG_RIGHT = 920
const BLDG_W = BLDG_RIGHT - BLDG_LEFT

// ── Blueprint grid ──
function GridLines() {
  const lines = []
  for (let x = 0; x <= SVG_WIDTH; x += 50) {
    lines.push(<line key={`v${x}`} x1={x} y1={0} x2={x} y2={SVG_HEIGHT} stroke="rgba(20,130,255,0.05)" strokeWidth={0.5} />)
  }
  for (let y = 0; y <= SVG_HEIGHT; y += 50) {
    lines.push(<line key={`h${y}`} x1={0} y1={y} x2={SVG_WIDTH} y2={y} stroke="rgba(20,130,255,0.05)" strokeWidth={0.5} />)
  }
  return <g>{lines}</g>
}

function GridLabels() {
  const cols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const labels = []
  for (let i = 0; i < Math.ceil(SVG_WIDTH / 100); i++) {
    labels.push(
      <text key={`c${i}`} x={i * 100 + 50} y={16} textAnchor="middle"
        fill="rgba(20,130,255,0.18)" fontSize={9} fontFamily="'Inter',sans-serif" fontWeight={600}>{cols[i]}</text>
    )
  }
  for (let j = 0; j < Math.ceil(SVG_HEIGHT / 100); j++) {
    labels.push(
      <text key={`r${j}`} x={14} y={j * 100 + 54} textAnchor="middle"
        fill="rgba(20,130,255,0.18)" fontSize={9} fontFamily="'Inter',sans-serif" fontWeight={600}>{j + 1}</text>
    )
  }
  return <g>{labels}</g>
}

// ── Building Exterior Walls ──
function BuildingEnvelope() {
  const topY = FLOORS.convert.y - 20
  const bottomY = FLOORS.awareness.y + FLOORS.awareness.h
  return (
    <g>
      {/* Main building outline */}
      <rect x={BLDG_LEFT} y={topY} width={BLDG_W} height={bottomY - topY} rx={0}
        fill="none" stroke="rgba(20,130,255,0.2)" strokeWidth={1.5} />
      {/* Left wall thickness */}
      <rect x={BLDG_LEFT} y={topY} width={8} height={bottomY - topY}
        fill="rgba(20,130,255,0.04)" stroke="none" />
      {/* Right wall thickness */}
      <rect x={BLDG_RIGHT - 8} y={topY} width={8} height={bottomY - topY}
        fill="rgba(20,130,255,0.04)" stroke="none" />
    </g>
  )
}

// ── Roof Structure ──
function Roof() {
  const roofY = FLOORS.convert.y - 20
  const peakY = FLOORS.convert.y - 70
  const midX = (BLDG_LEFT + BLDG_RIGHT) / 2
  return (
    <g>
      {/* Roof triangle */}
      <polygon
        points={`${BLDG_LEFT - 10},${roofY} ${midX},${peakY} ${BLDG_RIGHT + 10},${roofY}`}
        fill="rgba(20,130,255,0.02)" stroke="rgba(20,130,255,0.2)" strokeWidth={1} />
      {/* Rafters */}
      {[0.2, 0.4, 0.6, 0.8].map(t => {
        const lx = BLDG_LEFT - 10 + (midX - BLDG_LEFT + 10) * t
        const ly = roofY + (peakY - roofY) * t
        const rx = BLDG_RIGHT + 10 - (BLDG_RIGHT + 10 - midX) * t
        return <line key={`rafter${t}`} x1={lx} y1={ly} x2={rx} y2={ly}
          stroke="rgba(20,130,255,0.06)" strokeWidth={0.5} strokeDasharray="4,4" />
      })}
      {/* Ridge beam */}
      <line x1={midX} y1={peakY} x2={midX} y2={roofY}
        stroke="rgba(20,130,255,0.1)" strokeWidth={0.5} strokeDasharray="3,3" />
      {/* Title */}
      <text x={midX} y={peakY - 12} textAnchor="middle"
        fill="rgba(20,130,255,0.28)" fontSize={9} fontFamily="'Inter',sans-serif" fontWeight={700}
        letterSpacing="0.15em">TOOLS™ — ENTERPRISE BUILDERS PLAN</text>
    </g>
  )
}

// ── Foundation ──
function Foundation() {
  const baseY = FLOORS.awareness.y + FLOORS.awareness.h
  return (
    <g>
      {/* Foundation slab */}
      <rect x={BLDG_LEFT - 15} y={baseY} width={BLDG_W + 30} height={16} rx={0}
        fill="rgba(20,130,255,0.04)" stroke="rgba(20,130,255,0.15)" strokeWidth={1} />
      {/* Piles */}
      {[140, 260, 380, 500, 620, 740, 860].map(x => (
        <g key={`pile${x}`}>
          <line x1={x} y1={baseY + 16} x2={x} y2={baseY + 50}
            stroke="rgba(20,130,255,0.1)" strokeWidth={2} />
          <line x1={x - 8} y1={baseY + 50} x2={x + 8} y2={baseY + 50}
            stroke="rgba(20,130,255,0.08)" strokeWidth={1} />
        </g>
      ))}
      {/* Ground hatching */}
      {Array.from({ length: 30 }).map((_, i) => (
        <line key={`gh${i}`} x1={BLDG_LEFT - 15 + i * 30} y1={baseY + 55}
          x2={BLDG_LEFT - 15 + i * 30 + 15} y2={baseY + 70}
          stroke="rgba(20,130,255,0.05)" strokeWidth={0.5} />
      ))}
      {/* Ground line */}
      <line x1={40} y1={baseY + 55} x2={SVG_WIDTH - 40} y2={baseY + 55}
        stroke="rgba(20,130,255,0.08)" strokeWidth={0.5} strokeDasharray="2,3" />
      <text x={50} y={baseY + 68} fill="rgba(20,130,255,0.18)" fontSize={7}
        fontFamily="'Inter',sans-serif" fontWeight={600}>GL ±0.000</text>
    </g>
  )
}

// ── Customer Journey stage mapping ──
const CJ_STAGES = {
  22: { stage: 'LIVE ●', track: 'generic',    color: '#22C55E' },
  23: { stage: 'LIVE ●', track: 'generic',    color: '#22C55E' },
  4:  { stage: 'IDENTIFY', track: 'enterprise', color: '#1482FF' },
  9:  { stage: 'OUTREACH', track: 'enterprise', color: '#1482FF' },
  6:  { stage: 'AWARENESS',track: 'enterprise', color: '#1482FF' },
  7:  { stage: 'AWARENESS',track: 'enterprise', color: '#1482FF' },
  8:  { stage: 'AWARENESS',track: 'enterprise', color: '#1482FF' },
  10: { stage: 'TRIAL',    track: 'enterprise', color: '#BFE000' },
  11: { stage: 'ENGAGE',   track: 'enterprise', color: '#BFE000' },
  12: { stage: 'ENGAGE',   track: 'enterprise', color: '#BFE000' },
  13: { stage: 'ENGAGE',   track: 'enterprise', color: '#BFE000' },
  14: { stage: 'ENGAGE',   track: 'enterprise', color: '#BFE000' },
  15: { stage: 'ENGAGE',   track: 'enterprise', color: '#BFE000' },
  16: { stage: 'QUALIFY',  track: 'enterprise', color: '#BFE000' },
  17: { stage: 'QUALIFY',  track: 'enterprise', color: '#BFE000' },
  18: { stage: 'CLOSE',    track: 'enterprise', color: '#00C2A8' },
  19: { stage: 'CLOSE',    track: 'enterprise', color: '#00C2A8' },
  20: { stage: 'BUY / CLOSE', track: 'both',   color: '#00C2A8' },
  21: { stage: 'MEASURE',  track: 'both',       color: '#00C2A8' },
}

function CJBadge({ x, y, stage, color }) {
  const bw = stage.length * 4.8 + 14
  const bh = 11
  const byc = y - 29
  return (
    <g style={{ pointerEvents: 'none' }}>
      <rect x={x - bw / 2} y={byc - bh / 2} width={bw} height={bh} rx={bh / 2}
        fill={color} fillOpacity={0.15}
        stroke={color} strokeWidth={0.7} strokeOpacity={0.6} />
      <text x={x} y={byc + 3.8} textAnchor="middle"
        fill={color} fillOpacity={0.9} fontSize={5}
        fontFamily="'Inter',sans-serif" fontWeight={800} letterSpacing="0.07em">
        {stage}
      </text>
    </g>
  )
}

function GenericCampaignDashboard() {
  const x = 82, y = 108, w = 888, h = 82
  const rows = [
    { label: 'Current monthly budget', value: '~$1,000',    note: 'Very limited — needs to scale once CPA is confirmed and attribution is fixed' },
    { label: 'CPA — trial start',       value: '~$8 ✓',     note: 'Strong signal and a good baseline to build from' },
    { label: 'CPA — PRO conversion',    value: 'TBD',        note: 'Attribution fix in progress (Buck/Michelle, dev priority) — cannot optimise until this is resolved' },
    { label: 'Daily PRO target',          value: '10.45/day', note: "= $3,000/day annualised revenue at $287/yr — Jerry's goal (3K/day = 10.45 new PROs)" },
    { label: 'Budget to reach target',   value: '~$3–5K/mo', note: 'Estimate once CPA confirmed → reinvest revenue → scale up → long-term vision: $300K/month' },
  ]
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={3}
        fill="rgba(255,149,0,0.02)" stroke="#FF9500" strokeWidth={0.5} strokeOpacity={0.3} />
      <rect x={x} y={y} width={w} height={14} rx={3}
        fill="rgba(255,149,0,0.08)" stroke="none" />
      <text x={x + 8} y={y + 10} fill="#FF9500" fillOpacity={0.75} fontSize={6.5}
        fontFamily="'Inter',sans-serif" fontWeight={800} letterSpacing="0.1em">
        GENERIC CAMPAIGN — BUDGET &amp; CPA SNAPSHOT
      </text>
      <text x={x + 440} y={y + 10} fill="#FF9500" fillOpacity={0.38} fontSize={5.5}
        fontFamily="'Inter',sans-serif" fontWeight={600}>
        current state · what we need to reach 10.45 PROs/day · scale model
      </text>
      {rows.map(({ label, value, note }, i) => (
        <g key={i}>
          <text x={x + 10} y={y + 24 + i * 12} fill="#FF9500" fillOpacity={0.55} fontSize={5.5}
            fontFamily="'Inter',sans-serif" fontWeight={600}>{label}</text>
          <text x={x + 178} y={y + 24 + i * 12} fill="#FF9500" fillOpacity={0.9} fontSize={5.5}
            fontFamily="'Inter',sans-serif" fontWeight={800}>{value}</text>
          <text x={x + 262} y={y + 24 + i * 12} fill="#FF9500" fillOpacity={0.5} fontSize={5}
            fontFamily="'Inter',sans-serif" fontWeight={500}>{note}</text>
        </g>
      ))}
    </g>
  )
}

function CJComparisonPanel() {
  const x = 82, y = 10, w = 888, h = 88
  const midX = x + Math.floor(w / 2)
  const gStages = ['DISCOVER', 'CONSIDER', 'TRIAL', 'BUY PRO', 'EXPAND']
  const gSubs   = ['See ad', 'Click/visit', 'Free trial', '$287/yr', 'Enterprise']
  const eStages = ['IDENTIFY', 'OUTREACH', 'ENGAGE', 'QUALIFY', 'PROPOSE', 'CLOSE']
  const eSubs   = ['ICP + CRM', 'Mail/EDMs', 'Events/video', 'MQL→SQL', 'Discovery', 'Contract']
  const eColors = ['#1482FF', '#1482FF', '#BFE000', '#BFE000', '#00C2A8', '#00C2A8']
  const gStartX = x + 52, gSpacing = 88
  const eStartX = midX + 32, eSpacing = 73
  const nodeY = y + 62
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={3}
        fill="rgba(26,31,46,0.85)" stroke="rgba(0,194,168,0.2)" strokeWidth={0.5} />
      <text x={x + w / 2} y={y + 11} textAnchor="middle"
        fill="#00C2A8" fillOpacity={0.65} fontSize={7}
        fontFamily="'Inter',sans-serif" fontWeight={800} letterSpacing="0.1em">
        CUSTOMER JOURNEY MAP vs OMNI-CHANNEL STRATEGY
      </text>
      <line x1={midX} y1={y + 15} x2={midX} y2={y + h - 5}
        stroke="rgba(255,255,255,0.06)" strokeWidth={0.5} strokeDasharray="3,3" />
      <circle cx={gStartX - 16} cy={y + 26} r={2.5} fill="#FF9500" />
      <text x={gStartX - 10} y={y + 29.5} fill="#FF9500" fillOpacity={0.75} fontSize={5.8}
        fontFamily="'Inter',sans-serif" fontWeight={800}>
        GENERIC  (Meta + Google → Self-Serve PRO)
      </text>
      <circle cx={eStartX - 16} cy={y + 26} r={2.5} fill="#1482FF" />
      <text x={eStartX - 10} y={y + 29.5} fill="#1482FF" fillOpacity={0.75} fontSize={5.8}
        fontFamily="'Inter',sans-serif" fontWeight={800}>
        ENTERPRISE ABM  (Top 100 Accounts → Direct Sales)
      </text>
      {gStages.map((stage, i) => {
        const nx = gStartX + i * gSpacing
        return (
          <g key={`gn${i}`}>
            {i < gStages.length - 1 && (
              <line x1={nx + 7} y1={nodeY} x2={nx + gSpacing - 7} y2={nodeY}
                stroke="#FF9500" strokeWidth={0.6} strokeOpacity={0.25} />
            )}
            <circle cx={nx} cy={nodeY} r={5} fill="#FF9500" fillOpacity={0.18}
              stroke="#FF9500" strokeWidth={0.7} strokeOpacity={0.55} />
            <text x={nx} y={nodeY - 9} textAnchor="middle"
              fill="#FF9500" fillOpacity={0.8} fontSize={5}
              fontFamily="'Inter',sans-serif" fontWeight={800}>{stage}</text>
            <text x={nx} y={nodeY + 13} textAnchor="middle"
              fill="#FF9500" fillOpacity={0.5} fontSize={4.5}
              fontFamily="'Inter',sans-serif" fontWeight={500}>{gSubs[i]}</text>
          </g>
        )
      })}
      {eStages.map((stage, i) => {
        const nx = eStartX + i * eSpacing
        const color = eColors[i]
        return (
          <g key={`en${i}`}>
            {i < eStages.length - 1 && (
              <line x1={nx + 7} y1={nodeY} x2={nx + eSpacing - 7} y2={nodeY}
                stroke={color} strokeWidth={0.6} strokeOpacity={0.25} />
            )}
            <circle cx={nx} cy={nodeY} r={5} fill={color} fillOpacity={0.18}
              stroke={color} strokeWidth={0.7} strokeOpacity={0.55} />
            <text x={nx} y={nodeY - 9} textAnchor="middle"
              fill={color} fillOpacity={0.8} fontSize={5}
              fontFamily="'Inter',sans-serif" fontWeight={800}>{stage}</text>
            <text x={nx} y={nodeY + 13} textAnchor="middle"
              fill={color} fillOpacity={0.5} fontSize={4.5}
              fontFamily="'Inter',sans-serif" fontWeight={500}>{eSubs[i]}</text>
          </g>
        )
      })}
    </g>
  )
}

function CJLegend() {
  const y = 1232
  return (
    <g>
      <rect x={82} y={y} width={530} height={50} rx={3}
        fill="rgba(26,31,46,0.92)" stroke="rgba(0,194,168,0.22)" strokeWidth={0.6} />
      <text x={92} y={y + 11} fill="#00C2A8" fillOpacity={0.75} fontSize={6.5}
        fontFamily="'Inter',sans-serif" fontWeight={800} letterSpacing="0.12em">
        CUSTOMER JOURNEY COMPARISON
      </text>
      <circle cx={92} cy={y + 24} r={3} fill="#FF9500" />
      <text x={100} y={y + 27.5} fill="#FF9500" fillOpacity={0.85} fontSize={6}
        fontFamily="'Inter',sans-serif" fontWeight={700}>
        GENERIC: Discover (Meta/Google Ads) → Trial → Subscribe PRO ($287/yr, target: 10.45/day) → Expand to Enterprise
      </text>
      <circle cx={92} cy={y + 39} r={3} fill="#1482FF" />
      <text x={100} y={y + 42.5} fill="#1482FF" fillOpacity={0.85} fontSize={6}
        fontFamily="'Inter',sans-serif" fontWeight={700}>
        ENTERPRISE ABM: Identify → Outreach → Engage → Qualify (MQL→SQL) → Propose → Close
      </text>
    </g>
  )
}

// ── Kate Mode: badge on hotspots with strategic notes ──
function KateBadge({ x, y, badge, color }) {
  const byc = y + 43
  const bw = badge.length * 5.2 + 16
  const bh = 12
  return (
    <g style={{ pointerEvents: 'none' }}>
      <rect x={x - bw / 2} y={byc - bh / 2} width={bw} height={bh} rx={bh / 2}
        fill={color} fillOpacity={0.18}
        stroke={color} strokeWidth={0.8} strokeOpacity={0.75} />
      <text x={x} y={byc + 3.8} textAnchor="middle"
        fill={color} fillOpacity={0.95} fontSize={5.5}
        fontFamily="'Inter',sans-serif" fontWeight={800}
        letterSpacing="0.08em">
        {badge}
      </text>
    </g>
  )
}

// ── Unlock Phase Button (interactive SVG) ──
function UnlockPhaseButton({ x, y, phaseNum, color, onClick }) {
  const [hovered, setHovered] = useState(false)
  const w = 210, h = 42
  const darkText = color === '#BFE000'
  return (
    <g onClick={onClick} style={{ cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {/* Glow ring */}
      <rect x={x - w / 2 - 5} y={y - h / 2 - 5} width={w + 10} height={h + 10} rx={(h + 10) / 2}
        fill={color} fillOpacity={hovered ? 0.10 : 0.03} />
      {/* Button body */}
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={h / 2}
        fill={hovered ? color : 'rgba(15,20,35,0.95)'}
        stroke={color} strokeWidth={1.5} strokeOpacity={0.85} />
      {/* Main label */}
      <text x={x} y={y + 2} textAnchor="middle"
        fill={hovered ? (darkText ? '#0d1b2e' : '#fff') : color}
        fontSize={10} fontFamily="'Inter',sans-serif" fontWeight={800}
        letterSpacing="0.08em" style={{ pointerEvents: 'none' }}>
        ▶ ACTIVATE PHASE {phaseNum}
      </text>
      {/* Sub label */}
      <text x={x} y={y + 16} textAnchor="middle"
        fill={hovered ? (darkText ? '#0d1b2e' : '#fff') : color}
        fillOpacity={0.65} fontSize={7} fontFamily="'Roboto',sans-serif" fontWeight={400}
        style={{ pointerEvents: 'none' }}>
        {phaseNum === 2 ? 'Engage · 8 tactics' : 'Convert · 4 tactics'}
      </text>
    </g>
  )
}

// ── Single Floor ──
function Floor({ id, floor, kateSub, isLocked, onStartHere }) {
  const { y, h, label, phase, sub, color } = floor
  const displaySub = kateSub || sub
  const c = isLocked ? 'rgba(130,140,160,0.55)' : color
  const cOp = (base) => isLocked ? base * 0.4 : base

  return (
    <g>
      {/* Floor fill */}
      <rect x={BLDG_LEFT + 8} y={y} width={BLDG_W - 16} height={h}
        fill={isLocked ? 'rgba(80,90,110,1)' : color} fillOpacity={isLocked ? 0.02 : 0.025} />
      {/* Locked grey overlay */}
      {isLocked && (
        <rect x={BLDG_LEFT + 8} y={y} width={BLDG_W - 16} height={h}
          fill="rgba(50,60,80,0.20)" />
      )}

      {/* Floor slab (bottom) */}
      <line x1={BLDG_LEFT} y1={y + h} x2={BLDG_RIGHT} y2={y + h}
        stroke={c} strokeWidth={2} strokeOpacity={cOp(0.18)} />
      {/* Ceiling line */}
      <line x1={BLDG_LEFT} y1={y} x2={BLDG_RIGHT} y2={y}
        stroke={c} strokeWidth={1} strokeOpacity={cOp(0.12)} />

      {/* Floor label strip */}
      <rect x={BLDG_LEFT + 8} y={y} width={BLDG_W - 16} height={28}
        fill={c} fillOpacity={cOp(0.05)} />
      <text x={BLDG_LEFT + 22} y={y + 12} fill={c} fillOpacity={cOp(0.65)}
        fontSize={8} fontFamily="'Inter',sans-serif" fontWeight={800} letterSpacing="0.1em"
        className="floor-label">
        {label} — {phase.toUpperCase()}
      </text>
      <text x={BLDG_LEFT + 22} y={y + 23} fill={c} fillOpacity={cOp(kateSub ? 0.55 : 0.35)}
        fontSize={7} fontFamily="'Inter',sans-serif" fontWeight={500}
        className="floor-sublabel">
        {displaySub}
      </text>

      {/* Vertical phase label — right exterior strip (replaces centred watermark) */}
      <rect x={BLDG_RIGHT + 7} y={y + 2} width={22} height={h - 4} rx={3}
        fill={c} fillOpacity={isLocked ? 0.025 : 0.07}
        stroke={c} strokeWidth={0.5} strokeOpacity={isLocked ? 0.08 : 0.25} />
      <text
        x={BLDG_RIGHT + 18}
        y={y + h / 2}
        textAnchor="middle"
        fill={c}
        fillOpacity={isLocked ? 0.07 : 0.60}
        fontSize={10}
        fontFamily="'Inter',sans-serif"
        fontWeight={900}
        letterSpacing="0.20em"
        transform={`rotate(90, ${BLDG_RIGHT + 18}, ${y + h / 2})`}
        style={{ pointerEvents: 'none' }}
        className="phase-vert-label"
      >
        {PHASE_DISPLAY_NAMES[id]}
      </text>

      {/* Structural columns */}
      {[BLDG_LEFT + 60, (BLDG_LEFT + BLDG_RIGHT) / 2, BLDG_RIGHT - 60].map(cx => (
        <rect key={`col-${id}-${cx}`} x={cx - 3} y={y} width={6} height={h}
          fill={c} fillOpacity={0.02} stroke={c} strokeWidth={0.5}
          strokeOpacity={cOp(0.06)} strokeDasharray="4,8" />
      ))}

      {/* Windows (not on ground floor) */}
      {id !== 'awareness' && [180, 300, 420, 580, 700, 820].map(wx => (
        <g key={`win-${id}-${wx}`}>
          <rect x={wx} y={y + 40} width={30} height={50} rx={2}
            fill="rgba(200,220,255,0.06)" stroke={c} strokeWidth={0.5} strokeOpacity={cOp(0.10)} />
          <line x1={wx + 15} y1={y + 40} x2={wx + 15} y2={y + 90}
            stroke={c} strokeWidth={0.3} strokeOpacity={cOp(0.06)} />
          <line x1={wx} y1={y + 65} x2={wx + 30} y2={y + 65}
            stroke={c} strokeWidth={0.3} strokeOpacity={cOp(0.06)} />
        </g>
      ))}

      {/* Left-side dimension */}
      <g>
        <line x1={55} y1={y} x2={55} y2={y + h}
          stroke={c} strokeWidth={0.4} strokeOpacity={cOp(0.15)} strokeDasharray="3,3" />
        <line x1={50} y1={y} x2={60} y2={y}
          stroke={c} strokeWidth={0.4} strokeOpacity={cOp(0.20)} />
        <line x1={50} y1={y + h} x2={60} y2={y + h}
          stroke={c} strokeWidth={0.4} strokeOpacity={cOp(0.20)} />
        <text x={54} y={y + h / 2 + 3} textAnchor="middle"
          fill={c} fillOpacity={cOp(0.20)} fontSize={6}
          fontFamily="'Inter',sans-serif" fontWeight={600}
          transform={`rotate(-90, 54, ${y + h / 2})`}>
          {h}0mm
        </text>
      </g>

      {/* START HERE — bottom-of-awareness banner, entry point of the strategy */}
      {id === 'awareness' && !isLocked && (
        <g
          onClick={onStartHere}
          style={{ cursor: onStartHere ? 'pointer' : 'default' }}
        >
          {/* Full-width entry banner just above the foundation slab */}
          <rect x={BLDG_LEFT + 8} y={y + h - 32} width={BLDG_W - 16} height={26}
            fill={color} fillOpacity={0.06}
            stroke={color} strokeWidth={0.8} strokeOpacity={0.30} rx={3} />
          {/* START HERE pill */}
          <rect x={BLDG_LEFT + 18} y={y + h - 30} width={118} height={22} rx={11}
            fill={color} fillOpacity={0.88} />
          <text x={BLDG_LEFT + 77} y={y + h - 15} textAnchor="middle"
            fill="#fff" fontSize={8.5} fontFamily="'Inter',sans-serif" fontWeight={900}
            letterSpacing="0.10em" style={{ pointerEvents: 'none' }}>
            ▶ START HERE
          </text>
          {/* ICP statement */}
          <text x={BLDG_LEFT + 152} y={y + h - 15} fill={color} fillOpacity={0.65}
            fontSize={6.5} fontFamily="'Roboto',sans-serif" fontWeight={400}
            className="floor-sublabel" style={{ pointerEvents: 'none' }}>
            Enterprise Builders · Quality Manager = primary champion · Top 100 AU firms
          </text>
          {/* Reset hint on far right */}
          {onStartHere && (
            <text x={BLDG_RIGHT - 18} y={y + h - 15} textAnchor="end"
              fill={color} fillOpacity={0.35} fontSize={5.5}
              fontFamily="'Roboto',sans-serif" style={{ pointerEvents: 'none' }}>
              ↺ click to reset
            </text>
          )}
        </g>
      )}
    </g>
  )
}

// ── Elevator Shaft ──
function Elevator() {
  const topY = FLOORS.convert.y
  const botY = FLOORS.awareness.y + FLOORS.awareness.h
  const ex = BLDG_RIGHT - 55
  const ew = 36
  return (
    <g>
      <rect x={ex} y={topY} width={ew} height={botY - topY}
        fill="rgba(20,130,255,0.015)" stroke="rgba(20,130,255,0.1)" strokeWidth={0.8}
        strokeDasharray="6,4" />
      <text x={ex + ew / 2} y={topY + 14} textAnchor="middle"
        fill="rgba(20,130,255,0.22)" fontSize={5.5}
        fontFamily="'Inter',sans-serif" fontWeight={700} letterSpacing="0.08em">LIFT</text>
      {[FLOORS.convert.y + FLOORS.convert.h, FLOORS.engage.y + FLOORS.engage.h].map((fy, i) => (
        <g key={`stop${i}`}>
          <line x1={ex} y1={fy} x2={ex + ew} y2={fy}
            stroke="rgba(20,130,255,0.12)" strokeWidth={0.5} />
          <rect x={ex + 8} y={fy - 6} width={ew - 16} height={12} rx={2}
            fill="rgba(20,130,255,0.03)" stroke="rgba(20,130,255,0.08)" strokeWidth={0.5} />
        </g>
      ))}
      <line x1={ex + ew / 2} y1={botY - 20} x2={ex + ew / 2} y2={topY + 25}
        stroke="rgba(20,130,255,0.1)" strokeWidth={0.5} />
      <polygon points={`${ex + ew / 2 - 4},${topY + 28} ${ex + ew / 2 + 4},${topY + 28} ${ex + ew / 2},${topY + 22}`}
        fill="rgba(20,130,255,0.12)" />
    </g>
  )
}

// ── Staircase ──
function Staircase() {
  const sx = BLDG_LEFT + 20
  const topY = FLOORS.convert.y + FLOORS.convert.h
  const botY = FLOORS.awareness.y
  return (
    <g>
      <rect x={sx} y={topY} width={30} height={botY - topY}
        fill="none" stroke="rgba(20,130,255,0.06)" strokeWidth={0.5} strokeDasharray="4,4" />
      {[
        { from: FLOORS.awareness.y, to: FLOORS.engage.y + FLOORS.engage.h },
        { from: FLOORS.engage.y, to: FLOORS.convert.y + FLOORS.convert.h },
      ].map((gap, gi) => {
        const steps = 8
        const stepH = (gap.from - gap.to) / steps
        return Array.from({ length: steps }).map((_, si) => (
          <line key={`stair-${gi}-${si}`}
            x1={sx + 2} y1={gap.to + si * stepH}
            x2={sx + 28} y2={gap.to + si * stepH}
            stroke="rgba(20,130,255,0.08)" strokeWidth={0.5} />
        ))
      })}
      <text x={sx + 15} y={topY + 12} textAnchor="middle"
        fill="rgba(20,130,255,0.18)" fontSize={5}
        fontFamily="'Inter',sans-serif" fontWeight={700} letterSpacing="0.06em">STAIR</text>
    </g>
  )
}

// ── Title Block ──
function TitleBlock() {
  return (
    <g>
      <rect x={660} y={1450} width={300} height={55} rx={2}
        fill="rgba(20,130,255,0.02)" stroke="rgba(20,130,255,0.12)" strokeWidth={0.5} />
      <line x1={660} y1={1468} x2={960} y2={1468}
        stroke="rgba(20,130,255,0.08)" strokeWidth={0.5} />
      <text x={670} y={1464} fill="rgba(20,130,255,0.3)" fontSize={7}
        fontFamily="'Inter',sans-serif" fontWeight={700} letterSpacing="0.08em">
        TOOLS™ — ENTERPRISE BUILDER PLAN
      </text>
      <text x={670} y={1478} fill="rgba(20,130,255,0.2)" fontSize={6}
        fontFamily="'Inter',sans-serif" fontWeight={500}>
        ELEVATION VIEW · SCALE: NTS · REV: 3.0 · DATE: 2026
      </text>
      <text x={670} y={1490} fill="rgba(20,130,255,0.2)" fontSize={6}
        fontFamily="'Inter',sans-serif" fontWeight={500}>
        SHEET: 1 OF 1 · 30 TACTICS · 2 CAMPAIGNS · 3 PHASES
      </text>
    </g>
  )
}

// ── Compass ──
function Compass() {
  return (
    <g transform={`translate(60, 1460)`}>
      <circle cx={0} cy={0} r={14} fill="none" stroke="rgba(20,130,255,0.1)" strokeWidth={0.5} />
      <line x1={0} y1={-12} x2={0} y2={12} stroke="rgba(20,130,255,0.12)" strokeWidth={0.5} />
      <line x1={-12} y1={0} x2={12} y2={0} stroke="rgba(20,130,255,0.12)" strokeWidth={0.5} />
      <polygon points="0,-12 -3,-5 3,-5" fill="rgba(20,130,255,0.2)" />
      <text x={0} y={-17} textAnchor="middle" fill="rgba(20,130,255,0.2)"
        fontSize={7} fontFamily="'Inter',sans-serif" fontWeight={700}>N</text>
    </g>
  )
}

// ═══════════════════════
export default function BlueprintCanvas({ tactics, activeFilter, selectedTactic, onSelectTactic, kateMode, unlockedPhases = [1, 2, 3], presentationStep = 999, onResetPhases }) {
  const ph2Locked = !unlockedPhases.includes(2)
  const ph3Locked = !unlockedPhases.includes(3)
  return (
    <svg
      viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
      width="100%"
      height="100%"
      style={{ background: 'var(--bp-bg)' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="var(--bp-bg)" />
      <GridLines />
      <GridLabels />
      <rect x={25} y={25} width={SVG_WIDTH - 50} height={SVG_HEIGHT - 50} rx={2}
        fill="none" stroke="rgba(20,130,255,0.08)" strokeWidth={0.5} />

      {/* GenericCampaignDashboard removed — stats shown in tactic detail panels */}

      {/* Building blueprint — shifted down to make room for overview panels */}
      <g transform="translate(0, 210)">
      <Roof />
      <BuildingEnvelope />
      <Floor id="convert" floor={FLOORS.convert} kateSub={kateMode ? KATE_FLOOR_OVERRIDES.convert?.sub : null} isLocked={ph3Locked} />
      <Floor id="engage" floor={FLOORS.engage} kateSub={kateMode ? KATE_FLOOR_OVERRIDES.engage?.sub : null} isLocked={ph2Locked} />
      <Floor id="awareness" floor={FLOORS.awareness} kateSub={kateMode ? KATE_FLOOR_OVERRIDES.awareness?.sub : null} isLocked={false} />
      <Foundation />
      <Elevator />
      <Staircase />
      {/* Whale branch zone — LEFT side (starts below floor header strip at y=908) */}
      <rect x={82} y={916} width={300} height={110} rx={4}
        fill="rgba(229,57,53,0.025)" stroke="#E53935" strokeWidth={0.4} strokeOpacity={0.12} strokeDasharray="6,4" />
      <text x={232} y={912} textAnchor="middle"
        fill="#E53935" fillOpacity={0.38} fontSize={7}
        fontFamily="'Inter',sans-serif" fontWeight={800} letterSpacing="0.1em">TIER 1 WHALE</text>
      {/* Tier 2 branch zone — RIGHT side */}
      <rect x={460} y={960} width={460} height={105} rx={4}
        fill="rgba(20,130,255,0.02)" stroke="#1482FF" strokeWidth={0.4} strokeOpacity={0.1} strokeDasharray="6,4" />
      <text x={690} y={956} textAnchor="middle"
        fill="#1482FF" fillOpacity={0.3} fontSize={7}
        fontFamily="'Inter',sans-serif" fontWeight={700} letterSpacing="0.1em">TIER 2 TARGET MARKET</text>
      <FlowPaths unlockedPhases={unlockedPhases} presentationStep={presentationStep} />
      <TitleBlock />
      <Compass />

      {tactics.map(tactic => {
        const isLocked =
          (tactic.phase === 'engage' && ph2Locked) ||
          (tactic.phase === 'convert' && ph3Locked)
        // Hide tactics whose step hasn't been reached yet
        const stepHidden = !isLocked && presentationStep < (tactic.presentationStep ?? 1)
        if (stepHidden) return null
        // Live generic tactics (isLive) fade to grey after step 0
        const isGenericFaded = tactic.isLive === true && presentationStep >= 1
        const isVisible =
          activeFilter === 'all' ||
          activeFilter === tactic.phase ||
          (activeFilter === 'generic' && (tactic.campaignType === 'generic' || tactic.campaignType === 'both'))
        return (
          <Hotspot
            key={tactic.id}
            tactic={tactic}
            isVisible={isVisible}
            isSelected={selectedTactic?.id === tactic.id}
            onClick={isLocked ? () => {} : onSelectTactic}
            isLocked={isLocked}
            isGenericFaded={isGenericFaded}
          />
        )
      })}

      {/* Customer Journey Overlay — hidden for locked/unrevealed tactics */}
      <g className="cj-canvas-overlay">
        {tactics.map(tactic => {
          const cj = CJ_STAGES[tactic.id]
          if (!cj) return null
          if (tactic.isLive) return null // LIVE badge on hotspot handles this — no duplicate
          const isLocked =
            (tactic.phase === 'engage' && ph2Locked) ||
            (tactic.phase === 'convert' && ph3Locked)
          if (isLocked) return null
          const stepHidden = presentationStep < (tactic.presentationStep || 1)
          if (stepHidden) return null
          const isVisible =
            activeFilter === 'all' ||
            activeFilter === tactic.phase ||
            (activeFilter === 'generic' && (tactic.campaignType === 'generic' || tactic.campaignType === 'both'))
          if (!isVisible) return null
          return (
            <CJBadge
              key={`cj-${tactic.id}`}
              x={tactic.x}
              y={tactic.y}
              stage={cj.stage}
              color={cj.color}
            />
          )
        })}
        {/* CJLegend removed */}
      </g>

      {/* Kate strategy badges removed — Kate’s notes live in the detail panel popups */}
      </g>
    </svg>
  )
}
