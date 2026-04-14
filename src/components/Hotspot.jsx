import React from 'react'

const PHASE_COLORS = {
  awareness: '#1482FF',
  engage: '#BFE000',
  convert: '#00C2A8',
}
const GENERIC_COLOR = '#FF9500'
const LIVE_COLOR = '#22C55E'
const LOCKED_COLOR = 'rgba(120,130,150,0.55)'
const WHALE_COLOR = '#E53935'
const FADED_COLOR = 'rgba(140,150,165,0.55)'

export default function Hotspot({ tactic, isVisible, isSelected, onClick, isLocked, isGenericFaded }) {
  const isGeneric = tactic.campaignType === 'generic'
  const isLive = tactic.isLive === true
  const isWhale = tactic.whale === true
  const isDeferred = tactic.status === 'deferred'
  const isLowPriority = tactic.lowPriority === true
  const isAI = tactic.isAI === true

  const color = isLocked
    ? LOCKED_COLOR
    : (isLive && isGenericFaded)
    ? FADED_COLOR
    : isWhale
    ? WHALE_COLOR
    : isLive
    ? LIVE_COLOR
    : isGeneric
    ? GENERIC_COLOR
    : (PHASE_COLORS[tactic.phase] || '#1482FF')

  const isPhase1 = tactic.execPhase === 1 && !isDeferred && !isLocked && !isLive && !isWhale

  const className = [
    'hotspot-group',
    isVisible ? '' : 'hidden',
    isSelected ? 'selected' : '',
    isDeferred || isLowPriority ? 'deferred' : '',
    isGeneric && !isLive ? 'generic' : '',
    isLocked ? 'locked' : '',
    isLive && !isGenericFaded ? 'live' : '',
    isWhale ? 'whale-tactic' : '',
  ].filter(Boolean).join(' ')

  return (
    <g
      className={className}
      onClick={(e) => { e.stopPropagation(); onClick(tactic) }}
      role="button"
      aria-label={tactic.hotspotLabel}
      style={{ cursor: isLocked ? 'default' : 'pointer' }}
    >
      {/* Outer pulse ring — hidden when locked */}
      {!isLocked && (
        <circle cx={tactic.x} cy={tactic.y} r={18} fill={color} className="hotspot-pulse" />
      )}
      {/* Main dot */}
      <circle cx={tactic.x} cy={tactic.y} r={isSelected ? 10 : 7}
        fill={color}
        stroke={isLocked ? 'rgba(120,130,150,0.25)' : '#fff'}
        strokeWidth={isLocked ? 1 : 2}
        className="hotspot-dot"
        style={{ filter: isLocked ? 'none' : `drop-shadow(0 0 6px ${color})` }} />
      {/* Inner dot */}
      <circle cx={tactic.x} cy={tactic.y} r={2.5}
        fill={isLocked ? 'rgba(120,130,150,0.4)' : '#fff'} opacity={isLocked ? 0.5 : 0.9} />

      {/* Phase 1 NOW badge */}
      {isPhase1 && (
        <>
          <rect x={tactic.x - 9} y={tactic.y - 22} width={18} height={8} rx={4}
            fill={color} fillOpacity={0.18} stroke={color} strokeWidth={0.6} strokeOpacity={0.5}
            style={{ pointerEvents: 'none' }} />
          <text x={tactic.x} y={tactic.y - 16} textAnchor="middle"
            fill={color} fillOpacity={0.75} fontSize={4.5}
            fontFamily="'Inter', sans-serif" fontWeight={800} letterSpacing="0.06em"
            style={{ pointerEvents: 'none' }}>NOW</text>
        </>
      )}

      {isLive && !isLocked && !isGenericFaded && (
        <>
          <rect x={tactic.x - 13} y={tactic.y - 22} width={26} height={9} rx={4.5}
            fill={LIVE_COLOR} fillOpacity={0.18} stroke={LIVE_COLOR} strokeWidth={0.7} strokeOpacity={0.75}
            style={{ pointerEvents: 'none' }} />
          <text x={tactic.x} y={tactic.y - 15.5} textAnchor="middle"
            fill={LIVE_COLOR} fillOpacity={0.95} fontSize={4.5}
            fontFamily="'Inter', sans-serif" fontWeight={800} letterSpacing="0.06em"
            style={{ pointerEvents: 'none' }}>● LIVE</text>
        </>
      )}

      {/* GENERIC badge (only for non-live generic tactics) */}
      {isGeneric && !isLive && !isLocked && (
        <>
          <rect x={tactic.x - 14} y={tactic.y + 29} width={28} height={8} rx={4}
            fill={GENERIC_COLOR} fillOpacity={0.12} stroke={GENERIC_COLOR} strokeWidth={0.6} strokeOpacity={0.45}
            style={{ pointerEvents: 'none' }} />
          <text x={tactic.x} y={tactic.y + 35} textAnchor="middle"
            fill={GENERIC_COLOR} fillOpacity={0.8} fontSize={4.2}
            fontFamily="'Inter', sans-serif" fontWeight={800} letterSpacing="0.05em"
            style={{ pointerEvents: 'none' }}>GENERIC</text>
        </>
      )}

      {/* Label */}
      <text
        x={tactic.x}
        y={tactic.y + 22}
        textAnchor="middle"
        fill={color}
        fontSize={7.5}
        fontFamily="'Inter', sans-serif"
        fontWeight={600}
        opacity={isLocked ? 0.35 : 0.75}
        style={{ pointerEvents: 'none' }}
        className="hotspot-label"
      >
        {tactic.hotspotLabel}
      </text>
    </g>
  )
}
