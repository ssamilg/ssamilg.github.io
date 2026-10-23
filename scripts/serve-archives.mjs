import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const previewRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../version-preview')

const mounts = [
  { prefix: '/v0.5', dir: 'v0.5' },
  { prefix: '/v0', dir: 'v0' },
  { prefix: '/v1', dir: 'v1' },
  { prefix: '/v2', dir: 'v2' },
]

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.map': 'application/json',
}

function contentType(filePath) {
  const type = types[path.extname(filePath).toLowerCase()] || 'application/octet-stream'
  return type
}

function resolveArchive(urlPath) {
  const mount = mounts.find((item) => urlPath === item.prefix || urlPath.startsWith(`${item.prefix}/`))
  const root = mount ? path.join(previewRoot, mount.dir) : ''
  const relative = mount ? urlPath.slice(mount.prefix.length).replace(/^\//, '') : ''
  const candidate = mount ? path.normalize(path.join(root, relative || 'index.html')) : ''
  const insideRoot = mount && (candidate.startsWith(`${root}${path.sep}`) || candidate === root)
  const rootExists = mount ? fs.existsSync(root) : false
  const fileExists = insideRoot && rootExists && fs.existsSync(candidate) && fs.statSync(candidate).isFile()
  const indexPath = mount ? path.join(root, 'index.html') : ''
  const assetRequest = path.extname(urlPath) !== ''
  let result = { kind: 'miss', location: '', filePath: '' }
  if (mount && urlPath === mount.prefix) {
    result = { kind: 'redirect', location: `${mount.prefix}/`, filePath: '' }
  } else if (fileExists) {
    result = { kind: 'file', location: '', filePath: candidate }
  } else if (rootExists && !assetRequest && fs.existsSync(indexPath)) {
    result = { kind: 'file', location: '', filePath: indexPath }
  } else if (rootExists && assetRequest) {
    result = { kind: 'missing', location: '', filePath: '' }
  }
  return result
}

export function versionArchives() {
  const plugin = {
    name: 'version-archives',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const urlPath = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
        const resolved = resolveArchive(urlPath)
        if (resolved.kind === 'redirect') {
          response.writeHead(302, { Location: resolved.location })
          response.end()
        } else if (resolved.kind === 'missing') {
          response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
          response.end('Not found')
        } else if (resolved.kind === 'file') {
          response.writeHead(200, {
            'Content-Type': contentType(resolved.filePath),
            'Cache-Control': 'no-cache',
          })
          response.end(fs.readFileSync(resolved.filePath))
        } else {
          next()
        }
      })
    },
  }
  return plugin
}
