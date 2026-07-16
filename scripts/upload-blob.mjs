// One-off helper to upload local images to Vercel Blob, preserving the
// `img/<folder>/<file>` path so URLs are predictable.
//
// Usage (token is read from .env.local):
//   node --env-file=.env.local scripts/upload-blob.mjs <localDir> <blobPrefix> [glob]
// Example:
//   node --env-file=.env.local scripts/upload-blob.mjs public/img/room img/room 'prestige_*'

import { readFile, readdir } from 'node:fs/promises'
import { basename, join } from 'node:path'

import { put } from '@vercel/blob'

const [, , localDir, blobPrefix, pattern = '*'] = process.argv

if (!localDir || !blobPrefix) {
  console.error('usage: upload-blob.mjs <localDir> <blobPrefix> [glob]')
  process.exit(1)
}

const token = process.env.BLOB_READ_WRITE_TOKEN
if (!token) {
  console.error('missing BLOB_READ_WRITE_TOKEN (run with --env-file=.env.local)')
  process.exit(1)
}

// Minimal glob: supports a single leading/trailing `*`.
const toRegExp = (glob) =>
  new RegExp('^' + glob.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$')
const match = toRegExp(pattern)

const files = (await readdir(localDir)).filter((f) => match.test(f)).sort()
if (files.length === 0) {
  console.error(`no files matching "${pattern}" in ${localDir}`)
  process.exit(1)
}

console.error(`uploading ${files.length} file(s) from ${localDir} -> ${blobPrefix}/`)

const results = {}
for (const file of files) {
  const body = await readFile(join(localDir, file))
  const { url } = await put(`${blobPrefix}/${file}`, body, {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    token,
  })
  results[basename(file)] = url
  console.error(`  ok  ${file}`)
}

// Machine-readable map (filename -> public URL) on stdout.
console.log(JSON.stringify(results, null, 2))
