<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const entries = [
  { id: 'v0', href: '/v0/' },
  { id: 'v0.5', href: '/v0.5/' },
  { id: 'v1', href: '/v1/' },
  { id: 'v2', href: '/v2/' },
]

const onVersions = computed(() => route.name === 'versions')
</script>

<template>
  <nav id="version-archive-bar">
    <a href="/versions" :aria-current="onVersions ? 'page' : undefined">Versions</a>
    <a v-for="entry in entries" :key="entry.id" :href="entry.href">{{ entry.id }}</a>
  </nav>
</template>

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

#version-archive-bar a {
  color: inherit;
  text-decoration: none;
  opacity: 0.72;
}

#version-archive-bar a[aria-current="page"] {
  opacity: 1;
  font-weight: 700;
}
</style>
