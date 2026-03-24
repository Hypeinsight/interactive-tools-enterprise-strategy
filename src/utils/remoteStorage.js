/*
 * Remote JSON storage via npoint.io (free, CORS-friendly, no auth).
 * All users share the same document — edits are globally visible.
 * Document pre-created at: https://api.npoint.io/09bf1732895677653e13
 */

const DOC_URL = 'https://api.npoint.io/09bf1732895677653e13'

export async function loadRemoteEdits() {
  try {
    const res = await fetch(DOC_URL)
    if (res.ok) {
      const data = await res.json()
      if (data && typeof data === 'object') return data
    }
  } catch (e) {
    console.warn('Failed to load remote edits:', e)
  }
  return {}
}

export async function saveRemoteEdits(edits) {
  try {
    await fetch(DOC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(edits),
    })
  } catch (e) {
    console.warn('Failed to save remote edits:', e)
  }

  // Always keep localStorage as backup
  localStorage.setItem('tools-strategy-map-edits', JSON.stringify(edits))
}
