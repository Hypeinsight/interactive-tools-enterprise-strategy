import React from 'react'

const H = {
  1:{x:200,y:1160}, 2:{x:420,y:1160}, 3:{x:640,y:1160},
  4:{x:220,y:1060},  5:{x:620,y:1060},
  22:{x:420,y:1060}, 23:{x:820,y:1060},
  6:{x:380,y:930},   7:{x:550,y:930},  8:{x:740,y:930},  9:{x:180,y:930},
  10:{x:160,y:715}, 11:{x:310,y:715}, 12:{x:570,y:715}, 13:{x:700,y:715},
  14:{x:450,y:715}, 15:{x:840,y:715}, 16:{x:680,y:545}, 17:{x:420,y:545},
  18:{x:300,y:330}, 19:{x:300,y:180}, 20:{x:550,y:180}, 21:{x:750,y:180},
}

function bz(from, to) {
  const dx = to.x - from.x, dy = to.y - from.y
  if (Math.abs(dy) > Math.abs(dx) * 0.8)
    return `M ${from.x} ${from.y} C ${from.x} ${from.y+dy*0.4}, ${to.x} ${to.y-dy*0.4}, ${to.x} ${to.y}`
  return `M ${from.x} ${from.y} C ${from.x+dx*0.4} ${from.y}, ${to.x-dx*0.4} ${to.y}, ${to.x} ${to.y}`
}

function Solid({ from, to, color, opacity=0.15, width=1 }) {
  return <path d={bz(H[from],H[to])} fill="none" stroke={color}
    strokeWidth={width} strokeOpacity={opacity} strokeLinecap="round"
    className="flow-line" />
}

function Animated({ id, from, to, color, pc, opacity=0.16, width=1.2, n=2 }) {
  const pid = `fl-${id}`
  return (
    <g>
      <path id={pid} d={bz(H[from],H[to])} fill="none" stroke={color}
        strokeWidth={width} strokeOpacity={opacity} strokeLinecap="round"
        className="flow-line" />
      {Array.from({length:n}).map((_,i) => (
        <circle key={i} r={2.5} fill={pc} opacity={0.6}>
          <animateMotion dur={`${2.8+i*0.4}s`} repeatCount="indefinite" begin={`${i*1.3}s`}>
            <mpath href={`#${pid}`} />
          </animateMotion>
          <animate attributeName="opacity" values="0;0.7;0.7;0"
            dur={`${2.8+i*0.4}s`} repeatCount="indefinite" begin={`${i*1.3}s`} />
        </circle>
      ))}
    </g>
  )
}

function Dashed({ from, to, color, opacity=0.1 }) {
  return <path d={bz(H[from],H[to])} fill="none" stroke={color}
    strokeWidth={0.8} strokeOpacity={opacity} strokeDasharray="4,4" strokeLinecap="round"
    className="flow-line" />
}

function Label({ x, y, text, color }) {
  return (
    <g>
      <rect x={x-50} y={y-8} width={100} height={16} rx={8}
        fill="rgba(26,31,46,0.85)" stroke={color} strokeWidth={0.5} strokeOpacity={0.25} />
      <text x={x} y={y+4} textAnchor="middle" fill={color} fillOpacity={0.65}
        fontSize={6} fontFamily="'Inter',sans-serif" fontWeight={700} letterSpacing="0.06em">{text}</text>
    </g>
  )
}

function Gateway({ x, y, label, sub, color }) {
  return (
    <g>
      <rect x={x-47} y={y-20} width={94} height={40} rx={10}
        fill={color} fillOpacity={0.06} />
      <rect x={x-45} y={y-18} width={90} height={36} rx={8}
        fill="rgba(26,31,46,0.92)" stroke={color} strokeWidth={1} strokeOpacity={0.45} />
      <line x1={x-40} y1={y-14.5} x2={x+40} y2={y-14.5}
        stroke={color} strokeWidth={2} strokeOpacity={0.35} strokeLinecap="round" />
      <text x={x} y={y+1} textAnchor="middle" fill={color} fillOpacity={0.8}
        fontSize={9} fontFamily="'Inter',sans-serif" fontWeight={800} letterSpacing="0.08em">{label}</text>
      <text x={x} y={y+12} textAnchor="middle" fill={color} fillOpacity={0.5}
        fontSize={6.5} fontFamily="'Inter',sans-serif" fontWeight={600}>{sub}</text>
    </g>
  )
}

const B='#0077FF', L='#BFE000', T='#00C2A8', G='#FF9500'

export default function FlowPaths() {
  return (
    <g className="flow-paths">
      {/* AWARENESS within-phase */}
      <Solid from={1} to={2} color={B} opacity={0.18} width={1.2} />
      <Solid from={2} to={3} color={B} opacity={0.18} width={1.2} />
      <Solid from={3} to={4} color={B} opacity={0.13} />
      <Solid from={3} to={5} color={B} opacity={0.13} />
      <Solid from={4} to={6} color={B} opacity={0.1} />
      <Solid from={4} to={9} color={B} opacity={0.1} />
      <Solid from={5} to={7} color={B} opacity={0.1} />
      <Solid from={5} to={8} color={B} opacity={0.1} />

      {/* GENERIC CAMPAIGN — Meta + Google → PRO Conversion (self-serve) */}
      <Animated id="g1" from={22} to={20} color={G} pc={G} opacity={0.18} width={1.2} />
      <Animated id="g2" from={23} to={20} color={G} pc={G} opacity={0.18} width={1.2} />
      <Label x={620} y={1020} text="GENERIC CAMPAIGN" color={G} />

      {/* AWARENESS → ENGAGE cross-phase */}
      <Animated id="a" from={4} to={10} color={B} pc={L} opacity={0.15} />
      <Animated id="b1" from={9} to={11} color={B} pc={L} opacity={0.14} />
      <Animated id="b2" from={9} to={14} color={B} pc={L} opacity={0.14} />
      <Animated id="c1" from={6} to={12} color={B} pc={L} opacity={0.12} />
      <Animated id="c2" from={7} to={12} color={B} pc={L} opacity={0.12} />
      <Animated id="d1" from={8} to={13} color={B} pc={L} opacity={0.12} />
      <Animated id="d2" from={8} to={15} color={B} pc={L} opacity={0.12} />

      <Label x={170} y={843} text="A: PLG ROUTE" color={B} />
      <Label x={340} y={843} text="B: EXEC ROUTE" color={B} />
      <Label x={550} y={843} text="C: DIGITAL ROUTE" color={B} />
      <Label x={750} y={843} text="D: DIRECT ROUTE" color={B} />
      <Gateway x={470} y={865} label="QUALIFY" sub="MQL → SQL" color={B} />

      {/* ENGAGE within-phase */}
      {[10,11,12,13,14,15].map(id => (
        <Solid key={`e${id}`} from={id} to={17} color={L} opacity={0.09} />
      ))}
      <Dashed from={16} to={12} color={L} />
      <Dashed from={16} to={13} color={L} />
      <Dashed from={16} to={17} color={L} />

      {/* ENGAGE → CONVERT */}
      <Animated id="deal" from={17} to={18} color={L} pc={T} opacity={0.2} width={1.5} n={3} />
      <Gateway x={360} y={450} label="PROPOSE" sub="SQL → Opportunity" color={L} />

      {/* CONVERT within-phase */}
      <Solid from={18} to={19} color={T} opacity={0.2} width={1.2} />
      <Solid from={19} to={20} color={T} opacity={0.2} width={1.2} />
      <Solid from={20} to={21} color={T} opacity={0.15} />
    </g>
  )
}
