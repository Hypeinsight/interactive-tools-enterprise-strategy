import React from 'react'
import Hotspot from './Hotspot'
import FlowPaths from './FlowPaths'

const SVG_WIDTH = 1000
const SVG_HEIGHT = 1300

// ── Floor definitions (bottom to top) ──
const FLOORS = {
  awareness: { y: 880, h: 340, label: 'GROUND FLOOR', phase: 'Phase 1: Awareness', sub: 'Foundation & Groundwork · 9 Tactics', color: '#0077FF' },
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
    lines.push(<line key={`v${x}`} x1={x} y1={0} x2={x} y2={SVG_HEIGHT} stroke="rgba(0,119,255,0.05)" strokeWidth={0.5} />)
  }
  for (let y = 0; y <= SVG_HEIGHT; y += 50) {
    lines.push(<line key={`h${y}`} x1={0} y1={y} x2={SVG_WIDTH} y2={y} stroke="rgba(0,119,255,0.05)" strokeWidth={0.5} />)
  }
  return <g>{lines}</g>
}

function GridLabels() {
  const cols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const labels = []
  for (let i = 0; i < Math.ceil(SVG_WIDTH / 100); i++) {
    labels.push(
      <text key={`c${i}`} x={i * 100 + 50} y={16} textAnchor="middle"
        fill="rgba(0,119,255,0.18)" fontSize={9} fontFamily="'Inter',sans-serif" fontWeight={600}>{cols[i]}</text>
    )
  }
  for (let j = 0; j < Math.ceil(SVG_HEIGHT / 100); j++) {
    labels.push(
      <text key={`r${j}`} x={14} y={j * 100 + 54} textAnchor="middle"
        fill="rgba(0,119,255,0.18)" fontSize={9} fontFamily="'Inter',sans-serif" fontWeight={600}>{j + 1}</text>
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
        fill="none" stroke="rgba(0,119,255,0.2)" strokeWidth={1.5} />
      {/* Left wall thickness */}
      <rect x={BLDG_LEFT} y={topY} width={8} height={bottomY - topY}
        fill="rgba(0,119,255,0.04)" stroke="none" />
      {/* Right wall thickness */}
      <rect x={BLDG_RIGHT - 8} y={topY} width={8} height={bottomY - topY}
        fill="rgba(0,119,255,0.04)" stroke="none" />
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
        fill="rgba(0,119,255,0.02)" stroke="rgba(0,119,255,0.2)" strokeWidth={1} />
      {/* Rafters */}
      {[0.2, 0.4, 0.6, 0.8].map(t => {
        const lx = BLDG_LEFT - 10 + (midX - BLDG_LEFT + 10) * t
        const ly = roofY + (peakY - roofY) * t
        const rx = BLDG_RIGHT + 10 - (BLDG_RIGHT + 10 - midX) * t
        return <line key={`rafter${t}`} x1={lx} y1={ly} x2={rx} y2={ly}
          stroke="rgba(0,119,255,0.06)" strokeWidth={0.5} strokeDasharray="4,4" />
      })}
      {/* Ridge beam */}
      <line x1={midX} y1={peakY} x2={midX} y2={roofY}
        stroke="rgba(0,119,255,0.1)" strokeWidth={0.5} strokeDasharray="3,3" />
      {/* Title */}
      <text x={midX} y={peakY - 12} textAnchor="middle"
        fill="rgba(0,119,255,0.28)" fontSize={9} fontFamily="'Inter',sans-serif" fontWeight={700}
        letterSpacing="0.15em">TOOLS™ ENTERPRISE MARKETING STRATEGY</text>
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
        fill="rgba(0,119,255,0.04)" stroke="rgba(0,119,255,0.15)" strokeWidth={1} />
      {/* Piles */}
      {[140, 260, 380, 500, 620, 740, 860].map(x => (
        <g key={`pile${x}`}>
          <line x1={x} y1={baseY + 16} x2={x} y2={baseY + 50}
            stroke="rgba(0,119,255,0.1)" strokeWidth={2} />
          <line x1={x - 8} y1={baseY + 50} x2={x + 8} y2={baseY + 50}
            stroke="rgba(0,119,255,0.08)" strokeWidth={1} />
        </g>
      ))}
      {/* Ground hatching */}
      {Array.from({ length: 30 }).map((_, i) => (
        <line key={`gh${i}`} x1={BLDG_LEFT - 15 + i * 30} y1={baseY + 55}
          x2={BLDG_LEFT - 15 + i * 30 + 15} y2={baseY + 70}
          stroke="rgba(0,119,255,0.05)" strokeWidth={0.5} />
      ))}
      {/* Ground line */}
      <line x1={40} y1={baseY + 55} x2={SVG_WIDTH - 40} y2={baseY + 55}
        stroke="rgba(0,119,255,0.08)" strokeWidth={0.5} strokeDasharray="2,3" />
      <text x={50} y={baseY + 68} fill="rgba(0,119,255,0.18)" fontSize={7}
        fontFamily="'Inter',sans-serif" fontWeight={600}>GL ±0.000</text>
    </g>
  )
}

// ── Single Floor ──
function Floor({ id, floor }) {
  const { y, h, label, phase, sub, color } = floor
  return (
    <g>
      {/* Floor fill */}
      <rect x={BLDG_LEFT + 8} y={y} width={BLDG_W - 16} height={h}
        fill={color} fillOpacity={0.025} />
      {/* Floor slab (bottom) */}
      <line x1={BLDG_LEFT} y1={y + h} x2={BLDG_RIGHT} y2={y + h}
        stroke={color} strokeWidth={2} strokeOpacity={0.18} />
      {/* Ceiling line */}
      <line x1={BLDG_LEFT} y1={y} x2={BLDG_RIGHT} y2={y}
        stroke={color} strokeWidth={1} strokeOpacity={0.12} />

      {/* Floor label strip */}
      <rect x={BLDG_LEFT + 8} y={y} width={BLDG_W - 16} height={28}
        fill={color} fillOpacity={0.05} />
      <text x={BLDG_LEFT + 22} y={y + 12} fill={color} fillOpacity={0.65}
        fontSize={8} fontFamily="'Inter',sans-serif" fontWeight={800} letterSpacing="0.1em">
        {label} — {phase.toUpperCase()}
      </text>
      <text x={BLDG_LEFT + 22} y={y + 23} fill={color} fillOpacity={0.35}
        fontSize={7} fontFamily="'Inter',sans-serif" fontWeight={500}>
        {sub}
      </text>

      {/* Large floor number watermark */}
      <text x={BLDG_RIGHT - 25} y={y + h - 15} textAnchor="end"
        fill={color} fillOpacity={0.06} fontSize={70}
        fontFamily="'Inter',sans-serif" fontWeight={900}>
        {id === 'awareness' ? 'G' : id === 'engage' ? '1' : 'P'}
      </text>

      {/* Structural columns */}
      {[BLDG_LEFT + 60, (BLDG_LEFT + BLDG_RIGHT) / 2, BLDG_RIGHT - 60].map(cx => (
        <rect key={`col-${id}-${cx}`} x={cx - 3} y={y} width={6} height={h}
          fill={color} fillOpacity={0.02} stroke={color} strokeWidth={0.5}
          strokeOpacity={0.06} strokeDasharray="4,8" />
      ))}

      {/* Windows (not on ground floor — it's foundation) */}
      {id !== 'awareness' && [180, 300, 420, 580, 700, 820].map(wx => (
        <g key={`win-${id}-${wx}`}>
          <rect x={wx} y={y + 40} width={30} height={50} rx={2}
            fill="rgba(200,220,255,0.06)" stroke={color} strokeWidth={0.5} strokeOpacity={0.1} />
          <line x1={wx + 15} y1={y + 40} x2={wx + 15} y2={y + 90}
            stroke={color} strokeWidth={0.3} strokeOpacity={0.06} />
          <line x1={wx} y1={y + 65} x2={wx + 30} y2={y + 65}
            stroke={color} strokeWidth={0.3} strokeOpacity={0.06} />
        </g>
      ))}

      {/* Left-side dimension */}
      <g>
        <line x1={55} y1={y} x2={55} y2={y + h}
          stroke={color} strokeWidth={0.4} strokeOpacity={0.15} strokeDasharray="3,3" />
        <line x1={50} y1={y} x2={60} y2={y}
          stroke={color} strokeWidth={0.4} strokeOpacity={0.2} />
        <line x1={50} y1={y + h} x2={60} y2={y + h}
          stroke={color} strokeWidth={0.4} strokeOpacity={0.2} />
        <text x={54} y={y + h / 2 + 3} textAnchor="middle"
          fill={color} fillOpacity={0.2} fontSize={6}
          fontFamily="'Inter',sans-serif" fontWeight={600}
          transform={`rotate(-90, 54, ${y + h / 2})`}>
          {h}0mm
        </text>
      </g>
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
        fill="rgba(0,119,255,0.015)" stroke="rgba(0,119,255,0.1)" strokeWidth={0.8}
        strokeDasharray="6,4" />
      <text x={ex + ew / 2} y={topY + 14} textAnchor="middle"
        fill="rgba(0,119,255,0.22)" fontSize={5.5}
        fontFamily="'Inter',sans-serif" fontWeight={700} letterSpacing="0.08em">LIFT</text>
      {[FLOORS.convert.y + FLOORS.convert.h, FLOORS.engage.y + FLOORS.engage.h].map((fy, i) => (
        <g key={`stop${i}`}>
          <line x1={ex} y1={fy} x2={ex + ew} y2={fy}
            stroke="rgba(0,119,255,0.12)" strokeWidth={0.5} />
          <rect x={ex + 8} y={fy - 6} width={ew - 16} height={12} rx={2}
            fill="rgba(0,119,255,0.03)" stroke="rgba(0,119,255,0.08)" strokeWidth={0.5} />
        </g>
      ))}
      <line x1={ex + ew / 2} y1={botY - 20} x2={ex + ew / 2} y2={topY + 25}
        stroke="rgba(0,119,255,0.1)" strokeWidth={0.5} />
      <polygon points={`${ex + ew / 2 - 4},${topY + 28} ${ex + ew / 2 + 4},${topY + 28} ${ex + ew / 2},${topY + 22}`}
        fill="rgba(0,119,255,0.12)" />
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
        fill="none" stroke="rgba(0,119,255,0.06)" strokeWidth={0.5} strokeDasharray="4,4" />
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
            stroke="rgba(0,119,255,0.08)" strokeWidth={0.5} />
        ))
      })}
      <text x={sx + 15} y={topY + 12} textAnchor="middle"
        fill="rgba(0,119,255,0.18)" fontSize={5}
        fontFamily="'Inter',sans-serif" fontWeight={700} letterSpacing="0.06em">STAIR</text>
    </g>
  )
}

// ── Title Block ──
function TitleBlock() {
  return (
    <g>
      <rect x={660} y={SVG_HEIGHT - 70} width={300} height={55} rx={2}
        fill="rgba(0,119,255,0.02)" stroke="rgba(0,119,255,0.12)" strokeWidth={0.5} />
      <line x1={660} y1={SVG_HEIGHT - 52} x2={960} y2={SVG_HEIGHT - 52}
        stroke="rgba(0,119,255,0.08)" strokeWidth={0.5} />
      <text x={670} y={SVG_HEIGHT - 56} fill="rgba(0,119,255,0.3)" fontSize={7}
        fontFamily="'Inter',sans-serif" fontWeight={700} letterSpacing="0.08em">
        TOOLS™ — ENTERPRISE MARKETING STRATEGY
      </text>
      <text x={670} y={SVG_HEIGHT - 42} fill="rgba(0,119,255,0.2)" fontSize={6}
        fontFamily="'Inter',sans-serif" fontWeight={500}>
        ELEVATION VIEW · SCALE: NTS · REV: 2.0 · DATE: 2026
      </text>
      <text x={670} y={SVG_HEIGHT - 30} fill="rgba(0,119,255,0.2)" fontSize={6}
        fontFamily="'Inter',sans-serif" fontWeight={500}>
        SHEET: 1 OF 1 · 21 TACTICS · 3 PHASES · 3 STOREYS
      </text>
    </g>
  )
}

// ── Compass ──
function Compass() {
  return (
    <g transform={`translate(60, ${SVG_HEIGHT - 45})`}>
      <circle cx={0} cy={0} r={14} fill="none" stroke="rgba(0,119,255,0.1)" strokeWidth={0.5} />
      <line x1={0} y1={-12} x2={0} y2={12} stroke="rgba(0,119,255,0.12)" strokeWidth={0.5} />
      <line x1={-12} y1={0} x2={12} y2={0} stroke="rgba(0,119,255,0.12)" strokeWidth={0.5} />
      <polygon points="0,-12 -3,-5 3,-5" fill="rgba(0,119,255,0.2)" />
      <text x={0} y={-17} textAnchor="middle" fill="rgba(0,119,255,0.2)"
        fontSize={7} fontFamily="'Inter',sans-serif" fontWeight={700}>N</text>
    </g>
  )
}

// ═══════════════════════════════════════
export default function BlueprintCanvas({ tactics, activeFilter, selectedTactic, onSelectTactic }) {
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
        fill="none" stroke="rgba(0,119,255,0.08)" strokeWidth={0.5} />

      <Roof />
      <BuildingEnvelope />
      <Floor id="convert" floor={FLOORS.convert} />
      <Floor id="engage" floor={FLOORS.engage} />
      <Floor id="awareness" floor={FLOORS.awareness} />
      <Foundation />
      <Elevator />
      <Staircase />
      <FlowPaths />
      <TitleBlock />
      <Compass />

      {tactics.map(tactic => (
        <Hotspot
          key={tactic.id}
          tactic={tactic}
          isVisible={activeFilter === 'all' || activeFilter === tactic.phase}
          isSelected={selectedTactic?.id === tactic.id}
          onClick={onSelectTactic}
        />
      ))}
    </svg>
  )
}
