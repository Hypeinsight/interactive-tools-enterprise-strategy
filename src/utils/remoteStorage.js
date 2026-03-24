/*
 * Remote JSON storage via npoint.io (free, CORS-friendly, no auth).
 * All users share the same document — edits are globally visible.
 *
 * On first deploy, the app auto-creates a document and stores its ID
 * in localStorage. To persist across deploys, set VITE_NPOINT_ID in
 * your Render environment variables.
 */

const API = 'https://api.npoint.io'
const LOCAL_KEY = 'tools-strategy-npoint-id'

function getDocId() {
  return import.meta.env.VITE_NPOINT_ID || localStorage.getItem(LOCAL_KEY)
}

function setDocId(id) {
  localStorage.setItem(LOCAL_KEY, id)
}

export async function loadRemoteEdits() {
  const docId = getDocId()
  if (!docId) return {}

  try {
    const res = await fetch(`${API}/${docId}`)
    if (res.ok) {
      return await res.json()
    }
  } catch (e) {
    console.warn('Failed to load remote edits:', e)
  }
  return {}
}

export async function saveRemoteEdits(edits) {
  const docId = getDocId()

  try {
    if (docId) {
      // Update existing document
      await fetch(`${API}/${docId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(edits),
      })
    } else {
      // Create new document
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: JSON.stringify(edits) }),
      })
      if (res.ok) {
        const data = await res.json()
        if (data && data.id) {
          setDocId(data.id)
          console.log('Created remote store:', data.id)
          console.log('Set VITE_NPOINT_ID=' + data.id + ' in Render env vars to persist across deploys')
        }
      }
    }
  } catch (e) {
    console.warn('Failed to save remote edits:', e)
  }

  // Always keep localStorage as backup
  localStorage.setItem('tools-strategy-map-edits', JSON.stringify(edits))
}
