import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { applyVersionBar, stripVersionBar, versions } from './version-bar.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const previewRoot = path.join(root, 'version-preview')
const distRoot = path.join(root, 'dist')

function copyVersion(id) {
  const source = path.join(previewRoot, id)
  const target = path.join(distRoot, id)
  fs.rmSync(target, { recursive: true, force: true })
  fs.cpSync(source, target, { recursive: true })
  const indexPath = path.join(target, 'index.html')
  const html = applyVersionBar(fs.readFileSync(indexPath, 'utf8'), id)
  fs.writeFileSync(indexPath, html)
}

function main() {
  const missing = versions.filter((version) => !fs.existsSync(path.join(previewRoot, version.id, 'index.html')))
  if (missing.length || !fs.existsSync(path.join(distRoot, 'index.html'))) {
    throw new Error('Run the site build and version build before assembling')
  }
  versions.forEach((version) => copyVersion(version.id))
  fs.rmSync(path.join(distRoot, 'versions'), { recursive: true, force: true })
  const liveIndex = path.join(distRoot, 'index.html')
  fs.writeFileSync(liveIndex, stripVersionBar(fs.readFileSync(liveIndex, 'utf8')))
  console.log('Versions assembled into dist')
}

main()
