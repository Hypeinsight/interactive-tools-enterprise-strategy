import React from 'react'

const PHASE_COLORS = {
  awareness: '#0077FF',
  engage: '#BFE000',
  convert: '#00C2A8',
}
const GENERIC_COLOR = '#FF9500'

export default function Hotspot({ tactic, isVisible, isSelected, onClick }) {
  const isGeneric = tactic.campaignType === 'generic'
  const color = isGeneric ? GENERIC_COLOR : (PHASE_COLORS[tactic.phase] || '#0077FF')
  const isDeferred = tactic.status === 'deferred'
  const isPhase1 = tactic.execPhase === 1 && !isDeferred
  const className = `hotspot-group${isVisible ? '' : ' hidden'}${isSelected ? ' selected' : ''}${isDeferred ? ' deferred' : ''}${isGeneric ? ' generic' : ''}`

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
      {/* Phase 1 NOW badge */}
      {isPhase1 && (
        <>
          <rect x={tactic.x - 9} y={tactic.y - 22} width={18} height={8} rx={4}
            fill={color} fillOpacity={0.18} stroke={color} strokeWidth={0.6} strokeOpacity={0.5}
            style={{ pointerEvents: 'none' }} />
          <text x={tactic.x} y={tactic.y - 16} textAnchor="middle"
            fill={color} fillOpacity={0.75} fontSize={4.5}
            fontFamily="'Inter', sans-serif" fontWeight={800} letterSpacing="0.06em"
            style={{ pointerEvents: 'none' }}>
            NOW
          </text>
        </>
      )}
      {/* Campaign type badge for generic */}
      {isGeneric && (
        <>
          <rect x={tactic.x - 14} y={tactic.y + 29} width={28} height={8} rx={4}
            fill={GENERIC_COLOR} fillOpacity={0.12} stroke={GENERIC_COLOR} strokeWidth={0.6} strokeOpacity={0.45}
            style={{ pointerEvents: 'none' }} />
          <text x={tactic.x} y={tactic.y + 35} textAnchor="middle"
            fill={GENERIC_COLOR} fillOpacity={0.8} fontSize={4.2}
            fontFamily="'Inter', sans-serif" fontWeight={800} letterSpacing="0.05em"
            style={{ pointerEvents: 'none' }}>
            GENERIC
          </text>
        </>
      )}
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
