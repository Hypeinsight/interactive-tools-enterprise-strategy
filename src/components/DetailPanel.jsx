import React, { useState, useEffect } from 'react'
import { KATE_TACTIC_OVERRIDES } from '../data/kateStrategy'
import { TACTIC_PREVIEWS } from '../data/contentPreviews'

function ImageGalleryPreview({ preview, setLightbox }) {
  const [idx, setIdx] = useState(0)
  const img = preview.images[idx]
  return (
    <div className="email-preview-block">
      <div className="detail-section-title" style={{ marginTop: '1.25rem' }}>{preview.label}</div>
      <div className="email-tabs">
        {preview.images.map((im, i) => (
          <button key={i} className={`email-tab${i === idx ? ' active' : ''}`}
            onClick={() => setIdx(i)}>{`Ad ${i + 1}`}</button>
        ))}
      </div>
      <div className="preview-image-link" onClick={() => setLightbox({ src: img.src, caption: img.caption })}
        role="button" tabIndex={0} title="Click to enlarge">
        <img src={img.src} alt={img.caption} className="preview-ad-image" />
        <span className="preview-image-hint">Click to enlarge</span>
      </div>
      {img.caption && <p className="preview-caption">{img.caption}</p>}
      <div className="email-nav">
        <button className="email-nav-btn" onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={idx === 0}>Previous</button>
        <span className="email-nav-count">{idx + 1} of {preview.images.length}</span>
        <button className="email-nav-btn" onClick={() => setIdx(i => Math.min(preview.images.length - 1, i + 1))} disabled={idx === preview.images.length - 1}>Next</button>
      </div>
    </div>
  )
}

function DocumentListPreview({ preview }) {
  return (
    <div className="email-preview-block">
      <div className="detail-section-title" style={{ marginTop: '1.25rem' }}>{preview.label}</div>
      <div className="doc-list">
        {preview.documents.map((doc, i) => (
          <a key={i} href={doc.href} target="_blank" rel="noopener noreferrer" className="doc-item">
            <span className="doc-icon">PDF</span>
            <span className="doc-label">{doc.label}</span>
            <span className="doc-arrow">↗</span>
          </a>
        ))}
      </div>
    </div>
  )
}

function EmailSequencePreview({ preview }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const email = preview.emails[activeIdx]

  return (
    <div className="email-preview-block">
      <div className="detail-section-title" style={{ marginTop: '1.25rem' }}>
        {preview.label}
      </div>

      {/* Step tabs */}
      <div className="email-tabs">
        {preview.emails.map((e, i) => (
          <button
            key={i}
            className={`email-tab${i === activeIdx ? ' active' : ''}`}
            onClick={() => setActiveIdx(i)}
          >
            {e.step}
          </button>
        ))}
      </div>

      {/* Timing badge */}
      <div className="email-timing">{email.timing}</div>

      {/* Mock email card */}
      <div className="email-card">
        <div className="email-card-header">
          <div className="email-field">
            <span className="email-field-label">From</span>
            <span className="email-field-value">{email.from}</span>
          </div>
          <div className="email-field">
            <span className="email-field-label">Subject</span>
            <span className="email-field-value email-subject">{email.subject}</span>
          </div>
        </div>
        <div className="email-card-body">
          <pre className="email-body-text">{email.body}</pre>
        </div>
      </div>

      {/* Prev / Next */}
      <div className="email-nav">
        <button
          className="email-nav-btn"
          onClick={() => setActiveIdx(i => Math.max(0, i - 1))}
          disabled={activeIdx === 0}
        >
          Previous
        </button>
        <span className="email-nav-count">
          {activeIdx + 1} of {preview.emails.length}
        </span>
        <button
          className="email-nav-btn"
          onClick={() => setActiveIdx(i => Math.min(preview.emails.length - 1, i + 1))}
          disabled={activeIdx === preview.emails.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  )
}

function ImageLightbox({ src, caption, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close">&#x2715;</button>
      <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
        <img src={src} alt={caption} className="lightbox-img" />
        {caption && <p className="lightbox-caption">{caption}</p>}
      </div>
    </div>
  )
}

export default function DetailPanel({ tactic, onClose, onUpdate, kateMode }) {
  const isOpen = tactic !== null
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(null)
  const [lightbox, setLightbox] = useState(null)

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
    <>
    {lightbox && <ImageLightbox src={lightbox.src} caption={lightbox.caption} onClose={() => setLightbox(null)} />}
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

              {/* Kate Strategy Note */}
              {kateMode && KATE_TACTIC_OVERRIDES[tactic.id] && (() => {
                const ko = KATE_TACTIC_OVERRIDES[tactic.id]
                return (
                  <div className="kate-note">
                    <div className="kate-note-header">
                      <span
                        className="kate-note-badge"
                        style={{
                          background: `${ko.badgeColor}22`,
                          color: ko.badgeColor,
                          borderColor: `${ko.badgeColor}88`,
                        }}
                      >
                        {ko.badge}
                      </span>
                      <span className="kate-note-label">Kate’s Strategic Note</span>
                    </div>
                    <p className="kate-note-body">{ko.note}</p>
                  </div>
                )
              })()}

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

              {/* Rich Preview: ad image or email sequence */}
              {(() => {
                const preview = TACTIC_PREVIEWS[tactic.id]
                if (!preview || editing) return null

                if (preview.type === 'image') {
                  return (
                    <div className="preview-image-block">
                      <div className="detail-section-title" style={{ marginTop: '1.25rem' }}>Ad Creative</div>
                      <div
                        className="preview-image-link"
                        onClick={() => setLightbox({ src: preview.image, caption: preview.caption })}
                        role="button"
                        tabIndex={0}
                        title="Click to enlarge"
                      >
                        <img
                          src={preview.image}
                          alt={preview.caption}
                          className="preview-ad-image"
                        />
                        <span className="preview-image-hint">Click to enlarge</span>
                      </div>
                      {preview.caption && (
                        <p className="preview-caption">{preview.caption}</p>
                      )}
                    </div>
                  )
                }

                if (preview.type === 'image-gallery') {
                  return <ImageGalleryPreview preview={preview} setLightbox={setLightbox} />
                }

                if (preview.type === 'document-list') {
                  return <DocumentListPreview preview={preview} />
                }

                if (preview.type === 'email-sequence') {
                  return <EmailSequencePreview preview={preview} />
                }

                return null
              })()}

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
    </>  
  )
}
