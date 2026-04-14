import React, { useState, useRef, useCallback, useEffect } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import BlueprintCanvas from './components/BlueprintCanvas'
import IntroScreen from './components/IntroScreen'
import DetailPanel from './components/DetailPanel'
import FilterBar from './components/FilterBar'
import ZoomControls from './components/ZoomControls'
import baseTactics from './data/tactics.json'
import { loadRemoteEdits, saveRemoteEdits } from './utils/remoteStorage'

const STORAGE_KEY = 'tools-strategy-map-edits'
const TIMELINE_KEY = 'tools-floor-timelines'

const DEFAULT_TIMELINES = {
  awareness: 'Whale: Wks 1-12 · Tier 2: Wks 1-8 · External Path: Wks 2-14',
  engage:    'Whale: Wks 6-24 · Tier 2: Wks 4-14 · Overlaps with Awareness',
  convert:   'Whale: Wks 16-40+ · Tier 2: Wks 10-20 · Starts once champion is identified',
}

function loadTimelines() {
  try {
    const saved = localStorage.getItem(TIMELINE_KEY)
    return saved ? { ...DEFAULT_TIMELINES, ...JSON.parse(saved) } : DEFAULT_TIMELINES
  } catch { return DEFAULT_TIMELINES }
}

const MAX_STEP = 9
const STEP_LABELS = [
  '▶ Research & Planning',          // 0→1: ICP, Buying Committee, Intelligence, Leadfeeder
  '▶ Data Sources & Pipeline',      // 1→2: Known Contacts, External Enrichment, PLG
  '▶ Outreach Tactics',             // 2→3: Tier 2 outreach + Whale branch
  '▶ Activate Phase 2: Engage',    // 3→4: unlocks Engage, Personalised Video, Events
  '▶ Sales Enablement',            // 4→5: Sales Discovery, Leverage Strengths, Landing Pages
  '▶ Activate Phase 3: Convert',   // 5→6: unlocks Convert, Deal Acceleration
  '▶ Propose & Close',             // 6→7: Propose & Close
  '▶ Conversion & Metrics',        // 7→8: Conversion Outcomes, ABM KPIs
  '▶ View Full Strategy',          // 8→9: complete
]

function applyEdits(edits) {
  return baseTactics.map(t => ({ ...t, ...(edits[t.id] || {}) }))
}

function loadLocalTactics() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return applyEdits(JSON.parse(saved))
  } catch (e) { /* ignore */ }
  return baseTactics
}

export default function App() {
  const [tacticsData, setTacticsData] = useState(loadLocalTactics)
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedTactic, setSelectedTactic] = useState(null)
  const [theme, setTheme] = useState('light')
  const [kateMode] = useState(true) // Kate’s strategy always on
  const [presentationStep, setPresentationStep] = useState(0)
  const [showIntro, setShowIntro] = useState(true)
  const [floorTimelines, setFloorTimelines] = useState(loadTimelines)
  const transformRef = useRef(null)

  const updateFloorTimeline = useCallback((floorId, text) => {
    setFloorTimelines(prev => {
      const next = { ...prev, [floorId]: text }
      try {
        localStorage.setItem(TIMELINE_KEY, JSON.stringify(next))
        // Save to remote — merge with current tactic edits so nothing is lost
        const tacticEdits = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
        saveRemoteEdits({ ...tacticEdits, _timelines: next })
      } catch {}
      return next
    })
  }, [])

  // Derive which phase floors are visible from presentation progress
  const unlockedPhases = [
    1,
    ...(presentationStep >= 4 ? [2] : []),  // Engage unlocks at step 4
    ...(presentationStep >= 6 ? [3] : []),  // Convert unlocks at step 6
  ]

  // Load remote data on mount (overrides local) — handles both tactic edits and floor timelines
  useEffect(() => {
    loadRemoteEdits().then(data => {
      if (!data || !Object.keys(data).length) return
      // Separate tactic edits (numeric keys) from special keys (_timelines etc.)
      const tacticEdits = Object.fromEntries(Object.entries(data).filter(([k]) => !k.startsWith('_')))
      if (Object.keys(tacticEdits).length > 0) {
        setTacticsData(applyEdits(tacticEdits))
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tacticEdits))
      }
      if (data._timelines) {
        setFloorTimelines(prev => ({ ...DEFAULT_TIMELINES, ...data._timelines }))
        localStorage.setItem(TIMELINE_KEY, JSON.stringify(data._timelines))
      }
    })
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
  }, [])

  const advance = useCallback(() => {
    setPresentationStep(prev => Math.min(prev + 1, MAX_STEP))
  }, [])

  const goToTop = useCallback((ref) => {
    const r = ref ?? transformRef.current
    if (!r) return
    // Always use window.innerWidth for consistent centering regardless of call source
    const scale = 1.4
    const posX = Math.max(0, (window.innerWidth - 1000 * scale) / 2)
    // Show Awareness (Ground Floor, now h=500) at top of viewport
    r.setTransform(posX, -1956, scale, 300)
  }, [])

  // ‘Restart’ goes back to the ICP intro; TransformWrapper onInit handles re-centering when it remounts
  const resetPresentation = useCallback(() => {
    setPresentationStep(0)
    setShowIntro(true)
  }, [])

  const beginStrategy = useCallback(() => {
    setShowIntro(false)
  }, [])

  const handleSelectTactic = useCallback((tactic) => {
    // Always show the latest version from tacticsData
    setSelectedTactic(prev => prev?.id === tactic.id ? null : tactic)
  }, [])

  const handleClosePanel = useCallback(() => {
    setSelectedTactic(null)
  }, [])

  const handleUpdateTactic = useCallback((updatedTactic) => {
    setTacticsData(prev => {
      const next = prev.map(t => t.id === updatedTactic.id ? updatedTactic : t)
      // Build diff of edited fields
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
        const base = baseTactics.find(b => b.id === updatedTactic.id)
        const diff = {}
        for (const key of ['name', 'hotspotLabel', 'description', 'targetAudience', 'details', 'exampleUrl', 'exampleLabel']) {
          if (JSON.stringify(updatedTactic[key]) !== JSON.stringify(base[key])) {
            diff[key] = updatedTactic[key]
          }
        }
        if (Object.keys(diff).length > 0) {
          saved[updatedTactic.id] = diff
        } else {
          delete saved[updatedTactic.id]
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
        // Save to remote (async, non-blocking) — include timelines so they are preserved
        const timelines = JSON.parse(localStorage.getItem(TIMELINE_KEY) || '{}')
        saveRemoteEdits({ ...saved, _timelines: timelines })
      } catch (e) { /* ignore */ }
      return next
    })
    setSelectedTactic(updatedTactic)
  }, [])

  const handleZoomIn = useCallback(() => {
    transformRef.current?.zoomIn(0.5)
  }, [])

  const handleZoomOut = useCallback(() => {
    transformRef.current?.zoomOut(0.5)
  }, [])

  const handleReset = useCallback(() => {
    goToTop()
  }, [goToTop])

  const exportEdits = useCallback(() => {
    const data = localStorage.getItem(STORAGE_KEY) || '{}'
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'strategy-map-edits.json'
    a.click()
    URL.revokeObjectURL(url)
  }, [])

  const importEdits = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (ev) => {
        try {
          const edits = JSON.parse(ev.target.result)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(edits))
          setTacticsData(applyEdits(edits))
          setSelectedTactic(null)
          saveRemoteEdits(edits)
        } catch (err) { alert('Invalid file') }
      }
      reader.readAsText(file)
    }
    input.click()
  }, [])

  return (
    <div className="app" data-theme={theme}>
      {showIntro ? (
        <IntroScreen onBegin={beginStrategy} />
      ) : (
        <>
      {/* Header with logo and filter */}
      <div className="header-bar">
        <div className="header-logo">
          <img src="/Logo.png" alt="Tools™" style={{ height: '36px', objectFit: 'contain' }} />
          <div>
          <div className="header-title">Enterprise Builder Strategy</div>
          <div className="header-subtitle">Enterprise Builders · 23 Tactics · 2 Campaigns · 3 Phases</div>
          </div>
        </div>
        {/* FilterBar removed — redundant in presentation mode */}
        <div className="header-right">
          <button className="theme-toggle" onClick={toggleTheme} title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {/* Zoomable/Pannable Canvas */}
      <TransformWrapper
        ref={transformRef}
        initialScale={1.4}
        centerOnInit={false}
        minScale={0.5}
        maxScale={4}
        wheel={{ step: 0.08 }}
        panning={{ velocityDisabled: true }}
        doubleClick={{ disabled: true }}
        onInit={goToTop}
      >
        <TransformComponent
          wrapperStyle={{ width: '100%', height: '100%' }}
          contentStyle={{ width: '100%', height: '100%' }}
        >
          <div className="canvas-container">
            <BlueprintCanvas
              tactics={tacticsData}
              activeFilter={activeFilter}
              selectedTactic={selectedTactic}
              onSelectTactic={handleSelectTactic}
              kateMode={kateMode}
              unlockedPhases={unlockedPhases}
              presentationStep={presentationStep}
              floorTimelines={floorTimelines}
              onUpdateFloorTimeline={updateFloorTimeline}
            />
          </div>
        </TransformComponent>
      </TransformWrapper>

      {/* Zoom Controls */}
      <ZoomControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleReset}
      />


      {/* Help hint */}
      <div className="help-hint">
        Scroll to zoom · Drag to pan · Click hotspots for details
      </div>

      {/* Presentation step control */}
      <div className="presentation-nav">
        <div className="presentation-progress">
          {Array.from({ length: MAX_STEP }, (_, i) => (
            <span
              key={i}
              className={`progress-dot${i < presentationStep ? ' done' : i === presentationStep ? ' active' : ''}`}
            />
          ))}
        </div>
        {presentationStep < MAX_STEP ? (
          <button className="next-step-btn" onClick={advance}>
            {STEP_LABELS[presentationStep]}
          </button>
        ) : (
          <button className="next-step-btn reset" onClick={resetPresentation}>
            ↺ Restart Presentation
          </button>
        )}
      </div>

      {/* Detail Side Panel */}
      <DetailPanel tactic={selectedTactic} onClose={handleClosePanel} onUpdate={handleUpdateTactic} kateMode={kateMode} />
        </>
      )}
    </div>
  )
}
