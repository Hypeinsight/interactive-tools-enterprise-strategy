import React, { useState, useEffect } from 'react'

export default function DetailPanel({ tactic, onClose, onUpdate }) {
  const isOpen = tactic !== null
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(null)

  // Reset edit state when tactic changes
  useEffect(() => {
    setEditing(false)
    setDraft(null)
  }, [tactic?.id])

  const startEdit = () => {
    setDraft({
      name: tactic.name,
      hotspotLabel: tactic.hotspotLabel,
      description: tactic.description,
      targetAudience: tactic.targetAudience,
      details: [...tactic.details],
      exampleUrl: tactic.exampleUrl || '',
      exampleLabel: tactic.exampleLabel || '',
    })
    setEditing(true)
  }

  const cancelEdit = () => {
    setEditing(false)
    setDraft(null)
  }

  const saveEdit = () => {
    if (!draft || !tactic) return
    const updated = {
      ...tactic,
      name: draft.name,
      hotspotLabel: draft.hotspotLabel,
      description: draft.description,
      targetAudience: draft.targetAudience,
      details: draft.details.filter(d => d.trim() !== ''),
      exampleUrl: draft.exampleUrl.trim() || undefined,
      exampleLabel: draft.exampleLabel.trim() || undefined,
    }
    onUpdate(updated)
    setEditing(false)
    setDraft(null)
  }

  const updateDetail = (index, value) => {
    setDraft(d => {
      const next = [...d.details]
      next[index] = value
      return { ...d, details: next }
    })
  }

  const addDetail = () => {
    setDraft(d => ({ ...d, details: [...d.details, ''] }))
  }

  const removeDetail = (index) => {
    setDraft(d => ({ ...d, details: d.details.filter((_, i) => i !== index) }))
  }

  return (
    <div className={`detail-overlay${isOpen ? ' open' : ''}`}>
      <div className="detail-backdrop" onClick={onClose} />
      <div className="detail-panel">
        {tactic && (
          <>
            <div className="detail-header">
              <div>
                <div className={`detail-phase-badge ${tactic.phase}`}>
                  <span className={`detail-phase-dot ${tactic.phase}`} />
                  {tactic.phaseLabel}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {!editing ? (
                  <button className="detail-edit-btn" onClick={startEdit} title="Edit this tactic">
                    ✎
                  </button>
                ) : (
                  <>
                    <button className="detail-save-btn" onClick={saveEdit}>Save</button>
                    <button className="detail-cancel-btn" onClick={cancelEdit}>Cancel</button>
                  </>
                )}
                <button className="detail-close" onClick={onClose} aria-label="Close panel">
                  ✕
                </button>
              </div>
            </div>

            <div className="detail-body" style={{ position: 'relative' }}>
              <div className="detail-tactic-number">
                {String(tactic.id).padStart(2, '0')}
              </div>

              {editing ? (
                <input
                  className="detail-edit-input detail-edit-name"
                  value={draft.name}
                  onChange={e => setDraft(d => ({ ...d, name: e.target.value }))}
                  placeholder="Tactic name"
                />
              ) : (
                <h2 className="detail-name">{tactic.name}</h2>
              )}
              {editing ? (
                <input
                  className="detail-edit-input detail-edit-sublabel"
                  value={draft.hotspotLabel}
                  onChange={e => setDraft(d => ({ ...d, hotspotLabel: e.target.value }))}
                  placeholder="Hotspot label"
                />
              ) : (
                <div className="detail-hotspot-label">{tactic.hotspotLabel}</div>
              )}
              <div className={`detail-divider ${tactic.phase}`} />

              {/* Description */}
              <div className="detail-section-title">Description</div>
              {editing ? (
                <textarea
                  className="detail-edit-textarea"
                  value={draft.description}
                  onChange={e => setDraft(d => ({ ...d, description: e.target.value }))}
                  rows={4}
                />
              ) : (
                <p className="detail-description">{tactic.description}</p>
              )}

              {/* Target Audience */}
              <div className="detail-section-title">Target Audience</div>
              {editing ? (
                <input
                  className="detail-edit-input"
                  value={draft.targetAudience}
                  onChange={e => setDraft(d => ({ ...d, targetAudience: e.target.value }))}
                />
              ) : (
                <div className="detail-audience">
                  <div className="detail-audience-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM2 14a6 6 0 0112 0H2z" fill="#fff"/>
                    </svg>
                  </div>
                  <span className="detail-audience-text">{tactic.targetAudience}</span>
                </div>
              )}

              {/* Details */}
              <div className="detail-section-title">Key Execution Details</div>
              {editing ? (
                <div className="detail-edit-details">
                  {draft.details.map((detail, i) => (
                    <div key={i} className="detail-edit-detail-row">
                      <input
                        className="detail-edit-input"
                        value={detail}
                        onChange={e => updateDetail(i, e.target.value)}
                        placeholder={`Detail ${i + 1}`}
                      />
                      <button className="detail-edit-remove" onClick={() => removeDetail(i)} title="Remove">×</button>
                    </div>
                  ))}
                  <button className="detail-edit-add" onClick={addDetail}>+ Add detail</button>
                </div>
              ) : (
                <ul className="detail-details-list">
                  {tactic.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              )}

              {/* URL / Link */}
              {editing ? (
                <div style={{ marginTop: '1.25rem' }}>
                  <div className="detail-section-title">Link URL (optional)</div>
                  <input
                    className="detail-edit-input"
                    value={draft.exampleUrl}
                    onChange={e => setDraft(d => ({ ...d, exampleUrl: e.target.value }))}
                    placeholder="https://..."
                  />
                  {draft.exampleUrl.trim() && (
                    <>
                      <div className="detail-section-title" style={{ marginTop: '0.75rem' }}>Button Label</div>
                      <input
                        className="detail-edit-input"
                        value={draft.exampleLabel}
                        onChange={e => setDraft(d => ({ ...d, exampleLabel: e.target.value }))}
                        placeholder="e.g. View Example"
                      />
                    </>
                  )}
                </div>
              ) : (
                tactic.exampleUrl && (
                  <a
                    href={tactic.exampleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail-example-link"
                  >
                    {tactic.exampleLabel || 'View Link'}
                    <span style={{ marginLeft: '0.4rem', fontSize: '0.85em' }}>↗</span>
                  </a>
                )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
