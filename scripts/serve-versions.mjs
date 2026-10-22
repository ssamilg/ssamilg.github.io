import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const previewRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../version-preview')
const port = Number(process.env.PORT || 4173)

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

function resolveFile(urlPath) {
  const mount = mounts.find((item) => urlPath === item.prefix || urlPath.startsWith(`${item.prefix}/`))
  let filePath = path.join(previewRoot, 'index.html')
  let missing = false
  if (mount) {
    const relative = urlPath.slice(mount.prefix.length).replace(/^\//, '')
    const root = path.join(previewRoot, mount.dir)
    const candidate = path.normalize(path.join(root, relative || 'index.html'))
    const insideRoot = candidate.startsWith(`${root}${path.sep}`) || candidate === root
    const fileExists = insideRoot && fs.existsSync(candidate) && fs.statSync(candidate).isFile()
    const assetRequest = path.extname(urlPath) !== ''
    if (fileExists) {
      filePath = candidate
    } else if (assetRequest) {
      missing = true
    } else {
      filePath = path.join(root, 'index.html')
    }
  } else if (urlPath === '/versions' || urlPath === '/versions/' || urlPath === '/versions/index.html') {
    filePath = path.join(previewRoot, 'index.html')
  } else if (urlPath !== '/' && urlPath !== '/index.html') {
    const candidate = path.normalize(path.join(previewRoot, urlPath))
    const insidePreview = candidate.startsWith(`${previewRoot}${path.sep}`)
    const fileExists = insidePreview && fs.existsSync(candidate) && fs.statSync(candidate).isFile()
    if (fileExists) {
      filePath = candidate
    } else if (path.extname(urlPath) !== '') {
      missing = true
    }
  }
  return { filePath, missing }
}

function redirectTarget(urlPath) {
  const mount = mounts.find((item) => urlPath === item.prefix)
  let target = mount ? `${mount.prefix}/` : ''
  if (urlPath === '/versions') {
    target = '/versions/'
  }
  return target
}

const server = http.createServer((request, response) => {
  const urlPath = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
  const redirect = redirectTarget(urlPath)
  if (redirect) {
    response.writeHead(302, { Location: redirect })
    response.end()
  } else {
    const resolved = resolveFile(urlPath)
    if (resolved.missing) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      response.end('Not found')
    } else {
      const body = fs.readFileSync(resolved.filePath)
      response.writeHead(200, {
        'Content-Type': contentType(resolved.filePath),
        'Cache-Control': 'no-cache',
      })
      response.end(body)
    }
  }
})

server.listen(port, () => {
  console.log(`Version preview at http://localhost:${port}/`)
})
