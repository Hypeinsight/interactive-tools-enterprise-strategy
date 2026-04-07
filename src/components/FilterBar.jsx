import React from 'react'

const FILTERS = [
  { key: 'all', label: 'Show All' },
  { key: 'awareness', label: 'Awareness' },
  { key: 'engage', label: 'Engage' },
  { key: 'convert', label: 'Convert' },
  { key: 'generic', label: 'Generic Ads' },
]

export default function FilterBar({ activeFilter, onFilterChange }) {
  return (
    <div className="filter-bar">
      {FILTERS.map(f => (
        <button
          key={f.key}
          className={`filter-pill${activeFilter === f.key ? ' active' : ''}`}
          data-phase={f.key}
          onClick={() => onFilterChange(f.key)}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
