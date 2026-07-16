// Public base for images served from Vercel Blob.
// Heavy originals live in Blob (see scripts/upload-blob.mjs); small UI assets
// stay under /public. Keep this host in sync with next.config.ts remotePatterns.
const BLOB_BASE = 'https://ihqjnw85vtcbnacu.public.blob.vercel-storage.com'

export function blobUrl(path: string): string {
  return `${BLOB_BASE}/${path.replace(/^\//, '')}`
}
