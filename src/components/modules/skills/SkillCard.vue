<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCVData } from '@/composables/useCVData';

const { t } = useI18n();
const cv = useCVData();
const skills = computed(() => cv.value.skills);

const iconPath = (icon) => new URL(`/src/assets/icons/${icon}.svg`, import.meta.url).href;
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold text-base-content mb-4">
      {{ t('skills.title') }}
    </h1>

    <div class="bg-base-200/50 backdrop-blur-sm rounded p-6 flex flex-col gap-5">
      <div v-for="category in skills" :key="category.id">
        <h3 class="text-xs font-semibold text-primary uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <component :is="category.categoryIcon" v-if="category.categoryIcon" class="w-4 h-4" />
          {{ category.label }}
        </h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="item in category.items"
            :key="item.name"
            class="skill-item"
          >
            <img v-if="item.icon" :src="iconPath(item.icon)" :alt="item.name" class="w-4 h-4 shrink-0" />
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skill-item {
  @apply px-4 py-2 rounded-lg bg-base-300/50 backdrop-blur-sm text-base-content/80 text-sm whitespace-nowrap inline-flex items-center gap-2;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    @apply bg-base-300/70 text-base-content;
    transform: scale(1.05);
    filter: brightness(1.1);
  }
}
</style>
