import React from 'react'

const H = {
  // Awareness entry (y=1280)
  1:{x:200,y:1280}, 2:{x:420,y:1280}, 3:{x:640,y:1280},
  // Leadfeeder (y=1210)
  24:{x:420,y:1210},
  // Pipeline row (y=1140) - includes live generic
  4:{x:200,y:1140}, 5:{x:380,y:1140},
  30:{x:540,y:1140}, 22:{x:700,y:1140}, 23:{x:840,y:1140},
  // PLG gateway (y=1060)
  10:{x:400,y:1060},
  // Tier 2 outreach (y=1000)
  9:{x:150,y:1000}, 6:{x:310,y:1000}, 7:{x:490,y:1000}, 8:{x:650,y:1000},
  // Whale awareness (y=905) - only 25,26,27 (28+29 now in engage)
  25:{x:150,y:905}, 26:{x:340,y:905}, 27:{x:530,y:905},
  // Engage - whale row (y=650)
  28:{x:220,y:650}, 29:{x:400,y:650}, 15:{x:580,y:650},
  // Engage - tier 2 row (y=715)
  11:{x:310,y:715}, 12:{x:570,y:715}, 13:{x:700,y:715}, 14:{x:450,y:715},
  // Engage - sales (y=545)
  16:{x:680,y:545}, 17:{x:420,y:545},
  // Convert
  18:{x:300,y:330}, 19:{x:300,y:180}, 20:{x:550,y:180}, 21:{x:750,y:180},
}

function bz(from, to) {
  const dx = to.x - from.x, dy = to.y - from.y
  if (Math.abs(dy) > Math.abs(dx) * 0.8)
    return `M ${from.x} ${from.y} C ${from.x} ${from.y+dy*0.4}, ${to.x} ${to.y-dy*0.4}, ${to.x} ${to.y}`
  return `M ${from.x} ${from.y} C ${from.x+dx*0.4} ${from.y}, ${to.x-dx*0.4} ${to.y}, ${to.x} ${to.y}`
}
function Solid({ from, to, color, opacity=0.15, width=1 }) {
  return <path d={bz(H[from],H[to])} fill="none" stroke={color} strokeWidth={width} strokeOpacity={opacity} strokeLinecap="round" className="flow-line" />
}
function Animated({ id, from, to, color, pc, opacity=0.16, width=1.2, n=2 }) {
  const pid = `fl-${id}`
  return (
    <g>
      <path id={pid} d={bz(H[from],H[to])} fill="none" stroke={color} strokeWidth={width} strokeOpacity={opacity} strokeLinecap="round" className="flow-line" />
      {Array.from({length:n}).map((_,i) => (
        <circle key={i} r={2.5} fill={pc} opacity={0.6}>
          <animateMotion dur={`${2.8+i*0.4}s`} repeatCount="indefinite" begin={`${i*1.3}s`}><mpath href={`#${pid}`} /></animateMotion>
          <animate attributeName="opacity" values="0;0.7;0.7;0" dur={`${2.8+i*0.4}s`} repeatCount="indefinite" begin={`${i*1.3}s`} />
        </circle>
      ))}
    </g>
  )
}
function Dashed({ from, to, color, opacity=0.1 }) {
  return <path d={bz(H[from],H[to])} fill="none" stroke={color} strokeWidth={0.8} strokeOpacity={opacity} strokeDasharray="4,4" strokeLinecap="round" className="flow-line" />
}
function Label({ x, y, text, color }) {
  const w = text.length * 4.2 + 16
  return (
    <g>
      <rect x={x-w/2} y={y-8} width={w} height={16} rx={8} fill="rgba(26,31,46,0.85)" stroke={color} strokeWidth={0.5} strokeOpacity={0.25} />
      <text x={x} y={y+4} textAnchor="middle" fill={color} fillOpacity={0.7} fontSize={6} fontFamily="'Inter',sans-serif" fontWeight={700} letterSpacing="0.06em">{text}</text>
    </g>
  )
}
function Gateway({ x, y, label, sub, color }) {
  return (
    <g>
      <rect x={x-47} y={y-20} width={94} height={40} rx={10} fill={color} fillOpacity={0.06} />
      <rect x={x-45} y={y-18} width={90} height={36} rx={8} fill="rgba(26,31,46,0.92)" stroke={color} strokeWidth={1} strokeOpacity={0.45} />
      <line x1={x-40} y1={y-14.5} x2={x+40} y2={y-14.5} stroke={color} strokeWidth={2} strokeOpacity={0.35} strokeLinecap="round" />
      <text x={x} y={y+1} textAnchor="middle" fill={color} fillOpacity={0.8} fontSize={9} fontFamily="'Inter',sans-serif" fontWeight={800} letterSpacing="0.08em">{label}</text>
      <text x={x} y={y+12} textAnchor="middle" fill={color} fillOpacity={0.5} fontSize={6.5} fontFamily="'Inter',sans-serif" fontWeight={600}>{sub}</text>
    </g>
  )
}

const B='#1482FF', W='#E53935', L='#BFE000', T='#00C2A8', G='#22C55E', GR='rgba(110,120,140,0.45)'

export default function FlowPaths({ unlockedPhases=[1,2,3], presentationStep=0 }) {
  const ph2=unlockedPhases.includes(2), ph3=unlockedPhases.includes(3)
  const s1=presentationStep>=1, s2=presentationStep>=2, s3=presentationStep>=3

  return (
    <g className="flow-paths">

      {/* AWARENESS ENTRY */}
      {s1 && <><Solid from={1} to={2} color={B} opacity={0.18} width={1.2} /><Solid from={2} to={3} color={B} opacity={0.18} width={1.2} /></>}

      {/* LEADFEEDER */}
      {s1 && <><Solid from={3} to={24} color={B} opacity={0.15} /><Solid from={24} to={4} color={B} opacity={0.12} /><Dashed from={24} to={5} color={B} opacity={0.08} /></>}

      {/* PIPELINE: Known Contacts + PLG */}
      {s2 && <><Animated id="kc-plg" from={4} to={10} color={B} pc={L} opacity={0.15} /><Dashed from={5} to={10} color={GR} opacity={0.5} /></>}

      {/* GENERIC CAMPAIGNS (always animated - Meta, Google, EDM are LIVE) */}
      <Animated id="g1" from={22} to={20} color={G} pc={G} opacity={0.22} width={1.2} />
      <Animated id="g2" from={23} to={20} color={G} pc={G} opacity={0.22} width={1.2} />
      <Animated id="g3" from={30} to={20} color={G} pc={G} opacity={0.22} width={1.2} />
      <Label x={762} y={1100} text="GENERIC CAMPAIGNS - LIVE" color={G} />

      {/* TIER 2 OUTREACH: PLG -> Lumpy, Content&EDM, LinkedIn, EDM(grey) */}
      {s3 && <>
        <Animated id="t2-lumpy" from={10} to={9} color={B} pc={B} opacity={0.14} />
        <Animated id="t2-cont"  from={10} to={6} color={B} pc={B} opacity={0.13} />
        <Animated id="t2-li"    from={10} to={7} color={B} pc={B} opacity={0.12} />
        <Solid from={10} to={8} color={GR} opacity={0.4} width={0.7} />
        <Label x={390} y={972} text="TIER 2" color={B} />
      </>}

      {/* WHALE BRANCH: PLG -> Whale LinkedIn, Lumpy Mail, Content */}
      {s3 && <>
        <Animated id="w25" from={10} to={25} color={W} pc={W} opacity={0.18} width={1.1} />
        <Animated id="w26" from={10} to={26} color={W} pc={W} opacity={0.18} width={1.1} />
        <Animated id="w27" from={10} to={27} color={W} pc={W} opacity={0.16} width={1.1} />
        <Label x={340} y={877} text="TIER 1 WHALE" color={W} />
      </>}

      {/* AWARENESS -> ENGAGE */}
      {ph2 ? (
        <>
          {/* Tier 2: Lumpy + Content&EDM + LinkedIn -> Personalised Video + Events */}
          <Animated id="t2-b1" from={9} to={11} color={B} pc={L} opacity={0.14} />
          <Animated id="t2-b2" from={9} to={14} color={B} pc={L} opacity={0.12} />
          <Animated id="t2-c1" from={6} to={14} color={B} pc={L} opacity={0.12} />
          <Animated id="t2-li-eng" from={7} to={11} color={B} pc={L} opacity={0.11} />
          <Label x={230} y={843} text="TIER 2 ENGAGE" color={B} />
          <Gateway x={470} y={865} label="QUALIFY" sub="MQL to SQL" color={B} />

          {/* Whale: Lumpy Mail -> Whale Videos; Content -> Videos + Playbook; LinkedIn -> Playbook */}
          <Animated id="w-lump-vid"  from={26} to={28} color={W} pc={W} opacity={0.16} width={1.1} />
          <Animated id="w-cont-vid"  from={27} to={28} color={W} pc={W} opacity={0.14} width={1.0} />
          <Animated id="w-cont-play" from={27} to={29} color={W} pc={W} opacity={0.14} width={1.0} />
          <Animated id="w-li-play"   from={25} to={29} color={W} pc={W} opacity={0.14} width={1.0} />
          <Label x={640} y={843} text="WHALE ENGAGE" color={W} />
        </>
      ) : (
        <>
          <Solid from={9} to={11}  color={GR} opacity={0.4} width={0.7} />
          <Solid from={9} to={14}  color={GR} opacity={0.4} width={0.7} />
          <Solid from={6} to={14}  color={GR} opacity={0.3} width={0.7} />
          <Solid from={7} to={11}  color={GR} opacity={0.3} width={0.7} />
          <Solid from={26} to={28} color={GR} opacity={0.3} width={0.7} />
          <Solid from={27} to={28} color={GR} opacity={0.3} width={0.7} />
          <Solid from={27} to={29} color={GR} opacity={0.3} width={0.7} />
          <Solid from={25} to={29} color={GR} opacity={0.3} width={0.7} />
        </>
      )}

      {/* ENGAGE WITHIN-PHASE */}
      {ph2 ? (
        <>
          {/* Whale engage: Videos + Playbook -> Personalised Landing Pages */}
          <Animated id="w-vid-lp"  from={28} to={15} color={W} pc={W} opacity={0.14} />
          <Animated id="w-play-lp" from={29} to={15} color={W} pc={W} opacity={0.12} />
          <Solid from={15} to={17} color={W} opacity={0.14} />

          {/* Tier 2 engage: Personalised Video + Events -> Sales Discovery */}
          {[11, 14].map(id => <Solid key={`e${id}`} from={id} to={17} color={L} opacity={0.09} />)}
          {/* Dimmed low-priority engage */}
          <Solid from={12} to={17} color={GR} opacity={0.25} width={0.7} />
          <Solid from={13} to={17} color={GR} opacity={0.25} width={0.7} />
          <Dashed from={16} to={17} color={L} />
        </>
      ) : (
        <>
          {[11, 12, 13, 14, 15, 28, 29, 16].map(id => {
            if (!H[id]) return null
            return <Solid key={`el${id}`} from={id} to={17} color={GR} opacity={0.25} width={0.7} />
          })}
        </>
      )}

      {/* ENGAGE -> CONVERT */}
      {ph3 ? (
        <><Animated id="deal" from={17} to={18} color={L} pc={T} opacity={0.2} width={1.5} n={3} /><Gateway x={360} y={450} label="PROPOSE" sub="SQL to Opportunity" color={L} /></>
      ) : (
        <Solid from={17} to={18} color={GR} opacity={0.4} width={0.7} />
      )}

      {/* CONVERT WITHIN-PHASE */}
      {ph3 ? (
        <><Solid from={18} to={19} color={T} opacity={0.2} width={1.2} /><Solid from={19} to={20} color={T} opacity={0.2} width={1.2} /><Solid from={20} to={21} color={T} opacity={0.15} /></>
      ) : (
        <><Solid from={18} to={19} color={GR} opacity={0.3} width={0.7} /><Solid from={19} to={20} color={GR} opacity={0.3} width={0.7} /><Solid from={20} to={21} color={GR} opacity={0.25} width={0.7} /></>
      )}
    </g>
  )
}