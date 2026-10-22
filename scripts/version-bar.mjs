export const versions = [
  {
    id: 'v0',
    commit: '9e7bbf3',
    base: '/v0/',
    title: 'Tab site',
    period: 'Jan 2023 – Jan 2025',
    summary: 'Centered column with Me, Experience, Blog, and Music tabs.',
  },
  {
    id: 'v0.5',
    commit: '6422154',
    base: '/v0.5/',
    title: 'Document column',
    period: 'Jan 6–19 2025',
    summary: 'Short-lived homepage. Profile, biography, experience, language, and theme.',
  },
  {
    id: 'v1',
    commit: '1f61d3f',
    base: '/v1/',
    title: 'Scroll home',
    period: '2025 – 2026',
    summary: 'Full-viewport home: hero, about, experience, skills, projects, and contact.',
  },
  {
    id: 'v2',
    commit: '1f61d3f',
    base: '/v2/',
    title: 'CV page',
    period: '2026',
    summary: 'Particle hero, skill icons, and the print resume at /v2/resume.',
  },
]

export function versionBar(currentId) {
  const links = versions.map((version) => {
    const current = version.id === currentId ? ' aria-current="page"' : ''
    return `<a href="${version.base}"${current}>${version.id}</a>`
  }).join('')
  const versionsCurrent = currentId === 'index' ? ' aria-current="page"' : ''
  const bar = `<nav id="version-archive-bar"><a href="/versions/"${versionsCurrent}>Versions</a>${links}</nav>
<style>
  #version-archive-bar {
    position: fixed;
    z-index: 2147483647;
    left: 12px;
    bottom: 12px;
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 6px 12px;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.92);
    color: #f8fafc;
    font: 12px/1.2 ui-sans-serif, system-ui, sans-serif;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
  }
  #version-archive-bar a { color: inherit; text-decoration: none; opacity: 0.72; }
  #version-archive-bar a[aria-current="page"] { opacity: 1; font-weight: 700; }
</style>`
  return bar
}

export function applyVersionBar(html, currentId) {
  const start = html.indexOf('<nav id="version-archive-bar">')
  const styleEnd = start === -1 ? -1 : html.indexOf('</style>', start)
  const stripped = start === -1 || styleEnd === -1
    ? html
    : `${html.slice(0, start)}${html.slice(styleEnd + '</style>'.length)}`
  const withBar = stripped.replace('</body>', `${versionBar(currentId)}\n  </body>`)
  return withBar
}
