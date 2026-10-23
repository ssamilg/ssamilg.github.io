<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const otherLanguage = computed(() => (locale.value === 'en' ? 'Türkçe' : 'English'))

const toggleLanguage = () => {
  const next = locale.value === 'en' ? 'tr' : 'en'
  locale.value = next
  document.documentElement.setAttribute('lang', next)
  localStorage.setItem('locale', next)
}

const entries = computed(() => [
  {
    href: '/v0/',
    mark: 'v0',
    period: t('versionsPage.items.v0.period'),
    title: t('versionsPage.items.v0.title'),
    body: t('versionsPage.items.v0.body'),
    current: false,
  },
  {
    href: '/v0.5/',
    mark: 'v0.5',
    period: t('versionsPage.items.v05.period'),
    title: t('versionsPage.items.v05.title'),
    body: t('versionsPage.items.v05.body'),
    current: false,
  },
  {
    href: '/v1/',
    mark: 'v1',
    period: t('versionsPage.items.v1.period'),
    title: t('versionsPage.items.v1.title'),
    body: t('versionsPage.items.v1.body'),
    current: false,
  },
  {
    href: '/v2/',
    mark: 'v2',
    period: t('versionsPage.items.v2.period'),
    title: t('versionsPage.items.v2.title'),
    body: t('versionsPage.items.v2.body'),
    current: false,
  },
  {
    href: '/',
    mark: t('versionsPage.items.now.mark'),
    period: t('versionsPage.items.now.period'),
    title: t('versionsPage.items.now.title'),
    body: t('versionsPage.items.now.body'),
    current: true,
  },
])
</script>

<template>
  <div class="versions-page bg-base-100 text-base-content">
    <button type="button" class="language" @click="toggleLanguage">
      {{ otherLanguage }}
    </button>
    <div class="mx-auto max-w-3xl px-6 pb-28 pt-12 md:pt-20">
      <p class="font-mono text-xs uppercase tracking-[0.22em] text-primary">
        {{ t('versionsPage.eyebrow') }}
      </p>
      <h1 class="mt-4 max-w-xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
        {{ t('versionsPage.title') }}
      </h1>
      <p class="mt-6 max-w-xl text-lg leading-relaxed text-base-content/70">
        {{ t('versionsPage.intro') }}
      </p>

      <ol class="version-list mt-16">
        <li v-for="entry in entries" :key="entry.href">
          <a
            :href="entry.href"
            class="version-entry group"
            :class="{ 'version-entry-current': entry.current }"
          >
            <span class="version-mark">{{ entry.mark }}</span>
            <span class="version-copy">
              <span class="version-period">{{ entry.period }}</span>
              <span class="version-heading">
                <span class="version-title">{{ entry.title }}</span>
                <span class="version-open">{{ t('versionsPage.open') }}</span>
              </span>
              <span class="version-body">{{ entry.body }}</span>
            </span>
          </a>
        </li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
.versions-page {
  min-height: calc(100vh - 4rem);
  background-image:
    linear-gradient(hsl(var(--p) / 0.08) 1px, transparent 1px),
    linear-gradient(90deg, hsl(var(--p) / 0.08) 1px, transparent 1px);
  background-size: 48px 48px;
  background-position: -1px -1px;
}

.language {
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 20;
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

.version-list {
  @apply relative m-0 list-none p-0;
}

.version-list::before {
  content: '';
  @apply absolute bottom-10 top-10 hidden w-px bg-primary/50 md:block;
  left: calc(5.5rem + 1rem);
}

.version-entry {
  @apply relative grid gap-3 border-b border-base-content/10 py-8 md:grid-cols-[5.5rem_1fr] md:gap-8;
}

.version-entry-current {
  @apply -mx-4 border-primary/30 bg-base-200/70 px-4;
}

.version-mark {
  @apply relative z-[1] font-mono text-sm text-primary;
}

.version-copy {
  @apply flex flex-col;
}

.version-period {
  @apply font-mono text-xs uppercase tracking-[0.16em] text-base-content/45;
}

.version-heading {
  @apply mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1;
}

.version-title {
  @apply text-2xl font-semibold tracking-tight md:text-3xl;
}

.version-body {
  @apply mt-3 max-w-xl text-base leading-relaxed text-base-content/75;
}

.version-open {
  @apply shrink-0 text-sm font-medium text-primary;
}

.version-entry:focus-visible {
  @apply outline-none;
}

.version-entry:focus-visible .version-title {
  @apply text-primary;
}
</style>
