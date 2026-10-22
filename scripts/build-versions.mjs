import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { applyVersionBar, versionBar, versions } from './version-bar.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const worktreesRoot = path.join(root, '.version-worktrees')
const previewRoot = path.join(root, 'version-preview')

const homeRouter = `import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
`

const cvRouter = `import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/cv'
  },
  {
    path: '/cv',
    name: 'cv',
    component: () => import('../views/CVView.vue')
  },
  {
    path: '/resume',
    name: 'resume',
    component: () => import('../views/ResumeView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
`

function run(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      env: process.env,
    })
    child.on('error', reject)
    child.on('exit', (code) => {
      const error = code === 0 ? null : new Error(`${command} exited with ${code} in ${cwd}`)
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

function patchFile(filePath, replacements) {
  const next = replacements.reduce((text, [from, to]) => {
    if (!text.includes(from)) {
      throw new Error(`Missing patch target in ${filePath}`)
    }
    return text.replace(from, to)
  }, fs.readFileSync(filePath, 'utf8'))
  fs.writeFileSync(filePath, next)
}

async function prepareWorktree(name, commit) {
  const dir = path.join(worktreesRoot, name)
  fs.mkdirSync(worktreesRoot, { recursive: true })
  if (!fs.existsSync(path.join(dir, '.git'))) {
    await run('git', ['worktree', 'add', '--detach', dir, commit], root)
  }
  await run('git', ['reset', '--hard', commit], dir)
  await run('git', ['clean', '-fd', '-e', 'node_modules'], dir)
  return dir
}

async function install(dir) {
  const viteBin = path.join(dir, 'node_modules/vite/bin/vite.js')
  if (!fs.existsSync(viteBin)) {
    try {
      await run('npm', ['ci', '--no-audit', '--no-fund'], dir)
    } catch (error) {
      fs.rmSync(path.join(dir, 'node_modules'), { recursive: true, force: true })
      await run('npm', ['install', '--no-audit', '--no-fund'], dir)
    }
  }
}

async function viteBuild(dir, base) {
  const viteBin = path.join(dir, 'node_modules/vite/bin/vite.js')
  await run(process.execPath, [viteBin, 'build', '--base', base, '--emptyOutDir'], dir)
}

function publish(dir, id) {
  const source = path.join(dir, 'dist')
  const target = path.join(previewRoot, id)
  fs.rmSync(target, { recursive: true, force: true })
  fs.cpSync(source, target, { recursive: true })
  const indexPath = path.join(target, 'index.html')
  const html = applyVersionBar(fs.readFileSync(indexPath, 'utf8'), id)
  fs.writeFileSync(indexPath, html)
  const assetPattern = /\.(js|css|png|jpe?g|svg|ico|webp|woff2?)$/
  const missing = [...html.matchAll(/(?:src|href)="(\/[^"]+)"/g)]
    .map((match) => match[1])
    .filter((assetPath) => assetPattern.test(assetPath))
    .filter((assetPath) => !fs.existsSync(path.join(previewRoot, assetPath.slice(1))))
  if (missing.length) {
    throw new Error(`Published ${id} is missing ${missing.join(', ')}`)
  }
}

function patchHome(dir) {
  fs.writeFileSync(path.join(dir, 'src/router/index.js'), homeRouter)
  patchFile(path.join(dir, 'src/components/common/Navbar.vue'), [
    [
      "window.open('/resume', '_blank');",
      "window.open('/v2/resume', '_blank');",
    ],
    [
      `const toggleRoute = () => {
  const newRoute = route.path === '/' ? '/cv' : '/';
  router.push(newRoute);
};`,
      `const toggleRoute = () => {
  window.location.assign('/v2/');
};`,
    ],
  ])
  patchFile(path.join(dir, 'src/views/HomeView.vue'), [
    [
      "image: '/images/iftar-timer.png',",
      'image: `${import.meta.env.BASE_URL}images/iftar-timer.png`,',
    ],
    [
      "image: '/images/weather-forecast.png',",
      'image: `${import.meta.env.BASE_URL}images/weather-forecast.png`,',
    ],
    [
      "image: '/images/meme-generator.png',",
      'image: `${import.meta.env.BASE_URL}images/meme-generator.png`,',
    ],
    ['<router-link\n                to="/cv"', '<a\n                href="/v2/"'],
    ['</router-link>', '</a>'],
  ])
}

function patchCv(dir) {
  fs.writeFileSync(path.join(dir, 'src/router/index.js'), cvRouter)
  patchFile(path.join(dir, 'src/components/common/Navbar.vue'), [
    [
      "window.open('/resume', '_blank');",
      "window.open('/v2/resume', '_blank');",
    ],
    [
      `const toggleRoute = () => {
  const newRoute = route.path === '/' ? '/cv' : '/';
  router.push(newRoute);
};`,
      `const toggleRoute = () => {
  const onCv = route.path === '/cv' || route.path === '/resume';
  if (onCv) {
    window.location.assign('/v1/');
  } else {
    router.push('/cv');
  }
};`,
    ],
    [
      ':checked="route.path === \'/cv\'"',
      ':checked="route.path === \'/cv\' || route.path === \'/resume\'"',
    ],
  ])
}

function writeIndex() {
  const cards = versions.map((version) => `<a class="card" href="${version.base}">
      <span class="id">${version.id}</span>
      <span class="period">${version.period}</span>
      <strong>${version.title}</strong>
      <p>${version.summary}</p>
    </a>`).join('\n    ')
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Site versions</title>
  <style>
    :root { color-scheme: dark; }
    body {
      margin: 0;
      min-height: 100vh;
      background: #0f172a;
      color: #f8fafc;
      font: 16px/1.5 ui-sans-serif, system-ui, sans-serif;
    }
    main { max-width: 720px; margin: 0 auto; padding: 64px 24px; }
    h1 { font-size: 32px; margin: 0 0 8px; }
    .lede { margin: 0 0 32px; color: #cbd5e1; }
    .list { display: grid; gap: 12px; }
    .card {
      display: grid;
      gap: 4px;
      padding: 16px 18px;
      border-radius: 12px;
      background: #1e293b;
      color: inherit;
      text-decoration: none;
    }
    .card:hover { background: #334155; }
    .id { font-weight: 700; color: #93c5fd; }
    .period { color: #94a3b8; font-size: 13px; }
    p { margin: 0; color: #e2e8f0; }
  </style>
</head>
<body>
  <main>
    <h1>Site versions</h1>
    <p class="lede">Earlier versions of this site. The current site stays at the root.</p>
    <div class="list">
    <a class="card" href="/">
      <span class="id">Now</span>
      <span class="period">Current site</span>
      <strong>Live</strong>
      <p>The site as it is published today.</p>
    </a>
    ${cards}
    </div>
  </main>
  ${versionBar('index')}
</body>
</html>
`
  fs.writeFileSync(path.join(previewRoot, 'index.html'), html)
}

async function buildHistorical(dir, version) {
  await install(dir)
  await viteBuild(dir, version.base)
  publish(dir, version.id)
}

async function buildCurrent(dir, selectedIds) {
  await install(dir)
  if (selectedIds.includes('v1')) {
    patchHome(dir)
    await viteBuild(dir, '/v1/')
    publish(dir, 'v1')
  }
  if (selectedIds.includes('v2')) {
    await run('git', ['reset', '--hard', '1f61d3f'], dir)
    await run('git', ['clean', '-fd', '-e', 'node_modules'], dir)
    patchCv(dir)
    await viteBuild(dir, '/v2/')
    publish(dir, 'v2')
  }
  fs.rmSync(path.join(dir, 'node_modules'), { recursive: true, force: true })
}

async function ensureHistory() {
  const shallowFile = path.join(root, '.git/shallow')
  if (fs.existsSync(shallowFile)) {
    await run('git', ['fetch', '--unshallow', 'origin'], root)
  }
}

async function main() {
  const indexOnly = process.argv.includes('--index-only')
  if (indexOnly) {
    fs.mkdirSync(previewRoot, { recursive: true })
    writeIndex()
    console.log(`Version index written in ${previewRoot}`)
  } else {
    await buildSelected()
  }
}

async function buildSelected() {
  await ensureHistory()
  const requested = process.argv.slice(2)
  const known = versions.map((version) => version.id)
  const unknown = requested.filter((id) => !known.includes(id))
  if (unknown.length) {
    throw new Error(`Unknown version: ${unknown.join(', ')}`)
  }
  const selected = requested.length ? versions.filter((version) => requested.includes(version.id)) : versions
  if (!requested.length) {
    fs.rmSync(previewRoot, { recursive: true, force: true })
  }
  fs.mkdirSync(previewRoot, { recursive: true })
  const historical = selected.filter((version) => version.id === 'v0' || version.id === 'v0.5')
  for (const version of historical) {
    const dir = await prepareWorktree(version.id, version.commit)
    await buildHistorical(dir, version)
    fs.rmSync(path.join(dir, 'node_modules'), { recursive: true, force: true })
  }
  const currentIds = selected.map((version) => version.id).filter((id) => id === 'v1' || id === 'v2')
  if (currentIds.length) {
    const headDir = await prepareWorktree('head', '1f61d3f')
    await buildCurrent(headDir, currentIds)
  }
  writeIndex()
  console.log(`Preview ready in ${previewRoot}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
