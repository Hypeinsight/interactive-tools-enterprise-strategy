import React from 'react'

const PHASE_COLORS = {
  awareness: '#0077FF',
  engage: '#BFE000',
  convert: '#00C2A8',
}

export default function Hotspot({ tactic, isVisible, isSelected, onClick }) {
  const color = PHASE_COLORS[tactic.phase] || '#0077FF'
  const className = `hotspot-group${isVisible ? '' : ' hidden'}${isSelected ? ' selected' : ''}`

  return (
    <g
      className={className}
      onClick={(e) => { e.stopPropagation(); onClick(tactic) }}
      role="button"
      aria-label={tactic.hotspotLabel}
    >
      {/* Outer pulse ring */}
      <circle cx={tactic.x} cy={tactic.y} r={18} fill={color} className="hotspot-pulse" />
      {/* Main dot */}
      <circle cx={tactic.x} cy={tactic.y} r={isSelected ? 10 : 7}
        fill={color} stroke="#fff" strokeWidth={2} className="hotspot-dot"
        style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
      {/* Inner dot */}
      <circle cx={tactic.x} cy={tactic.y} r={2.5} fill="#fff" opacity={0.9} />
      {/* Always-visible label below dot */}
      <text
        x={tactic.x}
        y={tactic.y + 22}
        textAnchor="middle"
        fill={color}
        fontSize={7.5}
        fontFamily="'Inter', sans-serif"
        fontWeight={600}
        opacity={0.75}
        style={{ pointerEvents: 'none' }}
      >
        {tactic.hotspotLabel}
      </text>
    </g>
  )
}
