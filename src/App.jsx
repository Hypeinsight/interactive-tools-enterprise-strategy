import React, { useState, useRef, useCallback, useEffect } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import BlueprintCanvas from './components/BlueprintCanvas'
import DetailPanel from './components/DetailPanel'
import FilterBar from './components/FilterBar'
import ZoomControls from './components/ZoomControls'
import baseTactics from './data/tactics.json'
import { loadRemoteEdits, saveRemoteEdits } from './utils/remoteStorage'

const STORAGE_KEY = 'tools-strategy-map-edits'

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
  const [theme, setTheme] = useState('dark')
  const transformRef = useRef(null)

  // Load remote edits on mount (overrides local)
  useEffect(() => {
    loadRemoteEdits().then(edits => {
      if (edits && Object.keys(edits).length > 0) {
        setTacticsData(applyEdits(edits))
        localStorage.setItem(STORAGE_KEY, JSON.stringify(edits))
      }
    })
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'dark' ? 'light' : 'dark')
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
        // Save to remote (async, non-blocking)
        saveRemoteEdits(saved)
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
    transformRef.current?.resetTransform()
  }, [])

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
      {/* Header with logo and filter */}
      <div className="header-bar">
        <div className="header-logo">
          <img src="/Logo.png" alt="Tools™" style={{ height: '36px', objectFit: 'contain' }} />
          <div>
            <div className="header-title">Enterprise Marketing Strategy</div>
            <div className="header-subtitle">Interactive Blueprint — 21 Tactics · 3 Phases</div>
          </div>
        </div>
        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <button className="theme-toggle" onClick={toggleTheme} title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <button className="theme-toggle" onClick={exportEdits} title="Export edits">⬇</button>
        <button className="theme-toggle" onClick={importEdits} title="Import edits">⬆</button>
      </div>

      {/* Zoomable/Pannable Canvas */}
      <TransformWrapper
        ref={transformRef}
        initialScale={1}
        minScale={0.5}
        maxScale={4}
        centerOnInit={true}
        wheel={{ step: 0.08 }}
        panning={{ velocityDisabled: true }}
        doubleClick={{ disabled: true }}
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

      {/* Detail Side Panel */}
      <DetailPanel tactic={selectedTactic} onClose={handleClosePanel} onUpdate={handleUpdateTactic} />
    </div>
  )
}
