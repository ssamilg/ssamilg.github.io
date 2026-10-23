<script setup>
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, te, locale } = useI18n()

const nowEntries = [
  { key: 'vera', url: 'https://veraelektromekanik.com', at: true },
  { key: 'consultant', url: '' },
]

const beforeEntries = [
  { key: 'sensity', url: 'https://sensity.ai/' },
  { key: 'pitcher', url: 'https://www.pitcher.com/' },
  { key: 'reybex', url: 'https://www.reybex.com/en/' },
]

const theme = ref(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light')

const otherLanguage = computed(() => (locale.value === 'en' ? 'Türkçe' : 'English'))

const otherTheme = computed(() => (
  theme.value === 'dark' ? t('placeholder.theme.light') : t('placeholder.theme.dark')
))

const rolesFor = (section, entries) => computed(() => entries.map((entry) => {
  const summaryKey = `placeholder.${section}.items.${entry.key}.summary`
  const role = {
    role: t(`placeholder.${section}.items.${entry.key}.role`),
    place: t(`placeholder.${section}.items.${entry.key}.place`),
    period: t(`placeholder.${section}.items.${entry.key}.period`),
    url: entry.url,
    at: Boolean(entry.at),
    summary: te(summaryKey) ? t(summaryKey) : '',
  }
  return role
}))

const nowRoles = rolesFor('now', nowEntries)
const beforeRoles = rolesFor('before', beforeEntries)

const toggleLanguage = () => {
  const next = locale.value === 'en' ? 'tr' : 'en'
  locale.value = next
  document.documentElement.setAttribute('lang', next)
  localStorage.setItem('locale', next)
}

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

watch(theme, (value) => {
  const root = document.documentElement
  root.classList.toggle('appearance-dark', value === 'dark')
  root.classList.toggle('appearance-light', value === 'light')
  localStorage.setItem('theme', value)
}, { immediate: true })
</script>

<template>
  <div class="page" :class="{ dark: theme === 'dark' }">
    <div class="tools">
      <button type="button" @click="toggleTheme">{{ otherTheme }}</button>
      <button type="button" @click="toggleLanguage">{{ otherLanguage }}</button>
    </div>

    <header class="intro">
      <p class="eyebrow">
        {{ t('placeholder.eyebrowBefore') }}
        <a href="https://veraelektromekanik.com" target="_blank" rel="noreferrer">
          {{ t('placeholder.eyebrowBrand') }}
        </a>
      </p>
      <h1>Şehit Şamil Gökmen</h1>
      <p class="lead">{{ t('placeholder.lead') }}</p>
    </header>

    <section>
      <h2>{{ t('placeholder.now.label') }}</h2>
      <article v-for="item in nowRoles" :key="item.role + item.period" class="job">
        <p class="job-title">
          {{ item.role }}
          <template v-if="item.at && item.place">
            @
            <a v-if="item.url" :href="item.url" target="_blank" rel="noreferrer">{{ item.place }}</a>
            <template v-else>{{ item.place }}</template>
          </template>
        </p>
        <p v-if="item.place && !item.at" class="job-meta">
          <a v-if="item.url" :href="item.url" target="_blank" rel="noreferrer">{{ item.place }}</a>
          <template v-else>{{ item.place }}</template>
        </p>
        <p class="job-period">{{ item.period }}</p>
        <p v-if="item.summary" class="job-summary">{{ item.summary }}</p>
      </article>
    </section>

    <section>
      <h2>{{ t('placeholder.before.label') }}</h2>
      <article v-for="item in beforeRoles" :key="item.role + item.period" class="job">
        <p class="job-title">{{ item.role }}</p>
        <p class="job-meta">
          <template v-if="item.place">
            <a v-if="item.url" :href="item.url" target="_blank" rel="noreferrer">{{ item.place }}</a>
            <template v-else>{{ item.place }}</template>
          </template>
          <span class="job-when"><template v-if="item.place"> · </template>{{ item.period }}</span>
        </p>
      </article>
    </section>

    <section>
      <h2>{{ t('placeholder.contact.label') }}</h2>
      <ul>
        <li>
          <a href="mailto:s.samilgokmen@gmail.com">s.samilgokmen@gmail.com</a>
        </li>
        <li>{{ t('placeholder.contact.location') }}</li>
      </ul>
      <p class="contact-links">
        <a href="https://www.linkedin.com/in/ssamilg/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        <span class="contact-sep">|</span>
        <a href="https://github.com/ssamilg" target="_blank" rel="noreferrer">GitHub ↗</a>
      </p>
    </section>
  </div>
</template>

<style scoped>
.page {
  --page-bg: #f6f5f2;
  --page-fg: #1c1917;
  --page-line: #d6d3d1;
  width: 100%;
  min-height: 100vh;
  padding: 4.5rem 1.5rem 6rem;
  background: var(--page-bg);
  color: var(--page-fg);
  font-family: ui-sans-serif, system-ui, sans-serif;
}

.page.dark {
  --page-bg: #1c1917;
  --page-fg: #f6f5f2;
  --page-line: #44403c;
}

:global(html.appearance-light),
:global(html.appearance-light body) {
  background: #f6f5f2;
  color-scheme: light;
}

:global(html.appearance-dark),
:global(html.appearance-dark body) {
  background: #1c1917;
  color-scheme: dark;
}

.tools {
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  display: flex;
  gap: 1rem;
}

.tools button {
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.intro,
section {
  max-width: 36rem;
  margin: 0 auto;
}

.intro {
  margin-bottom: 4rem;
}

.eyebrow {
  margin: 0 0 0.75rem;
  font-size: 0.95rem;
}

.eyebrow a,
.job-title a,
.job-meta a {
  text-decoration: underline;
  text-underline-offset: 0.18em;
}

h1 {
  margin: 0;
  font-size: clamp(2.4rem, 6vw, 3.5rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1.05;
}

.lead {
  margin: 1.25rem 0 0;
  font-size: 1.15rem;
  line-height: 1.5;
}

section {
  padding-top: 1.75rem;
  margin-top: 1.75rem;
  border-top: 1px solid var(--page-line);
}

h2 {
  margin: 0 0 0.6rem;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.job + .job {
  margin-top: 1.35rem;
}

.job-title,
.job-meta,
.job-period {
  margin: 0;
}

.job-meta,
.job-period {
  margin-top: 0.15rem;
}

.job-when {
  opacity: 0.55;
}

.job-summary {
  position: relative;
  margin: 0.45rem 0 0 0.2rem;
  padding-left: 0.9rem;
  font-size: 0.84rem;
  line-height: 1.45;
  opacity: 0.55;
}

.job-summary::before {
  content: "";
  position: absolute;
  left: 0;
  top: -0.28rem;
  width: 0.55rem;
  height: calc(0.28rem + 0.72em);
  border-left: 1px solid currentColor;
  border-bottom: 1px solid currentColor;
}

.contact-links {
  margin-top: 1.15rem;
}

.contact-sep {
  margin: 0 0.7rem;
}

p,
li {
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.55;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

li + li {
  margin-top: 0.35rem;
}

a {
  color: inherit;
}
</style>
