/*
 * Remote JSON storage via jsonblob.com (free, no auth required).
 * All users share the same blob — edits are globally visible.
 *
 * On first deploy, the app auto-creates a blob and stores its ID
 * in localStorage. To share across deploys, set VITE_BLOB_ID in
 * your Render environment variables.
 */

const API = 'https://jsonblob.com/api/jsonBlob'
const LOCAL_BLOB_KEY = 'tools-strategy-blob-id'

// Prefer env var (set in Render), fall back to localStorage
function getBlobId() {
  return import.meta.env.VITE_BLOB_ID || localStorage.getItem(LOCAL_BLOB_KEY)
}

function setBlobId(id) {
  localStorage.setItem(LOCAL_BLOB_KEY, id)
}

export async function loadRemoteEdits() {
  const blobId = getBlobId()
  if (!blobId) return {}

  try {
    const res = await fetch(`${API}/${blobId}`, {
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
    })
    if (res.ok) {
      return await res.json()
    }
  } catch (e) {
    console.warn('Failed to load remote edits:', e)
  }
  return {}
}

export async function saveRemoteEdits(edits) {
  const blobId = getBlobId()

  try {
    if (blobId) {
      // Update existing blob
      await fetch(`${API}/${blobId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(edits),
      })
    } else {
      // Create new blob
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(edits),
      })
      if (res.ok) {
        // Extract blob ID from Location header
        const location = res.headers.get('Location')
        if (location) {
          const newId = location.split('/').pop()
          setBlobId(newId)
          console.log('Created remote blob:', newId)
          console.log('Set VITE_BLOB_ID=' + newId + ' in Render env vars to persist across deploys')
        }
      }
    }
  } catch (e) {
    console.warn('Failed to save remote edits:', e)
  }

  // Always keep localStorage as backup
  localStorage.setItem('tools-strategy-map-edits', JSON.stringify(edits))
}
