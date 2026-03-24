import React from 'react'

export default function ZoomControls({ onZoomIn, onZoomOut, onReset }) {
  return (
    <div className="zoom-controls">
      <button className="zoom-btn" onClick={onZoomIn} aria-label="Zoom in" title="Zoom in">+</button>
      <button className="zoom-btn" onClick={onZoomOut} aria-label="Zoom out" title="Zoom out">−</button>
      <button className="zoom-btn reset" onClick={onReset} aria-label="Reset view" title="Reset view">⟲</button>
    </div>
  )
}
