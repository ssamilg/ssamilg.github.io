<script setup>
import { computed } from 'vue';
import { useCVData } from '@/composables/useCVData';

const cv = useCVData();

const educationItems = computed(() => [
  {
    id: 'sau',
    name: cv.value.education.sau.name,
    logo: 'https://yt3.googleusercontent.com/ytc/AIdro_kFqDe2i71WLauwfKC3bi19CMifawLk5IjUriMIJtFr504=s900-c-k-c0x00ffffff-no-rj',
    link: 'https://www.sakarya.edu.tr/',
    department: cv.value.education.sau.department,
    description: cv.value.education.sau.description,
    years: cv.value.education.sau.period,
  }
]);

const openLink = (link) => {
  window.open(link);
};
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold text-base-content mb-4">
      {{ $t('education.title') }}
    </h1>

    <div
      v-for="education in educationItems"
      :key="education.id"
      class="bg-base-200/50 rounded p-6 mb-6"
    >
      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap items-center gap-4">
          <div class="avatar">
            <div class="w-16 h-16 rounded">
              <img
                :src="education.logo"
                :alt="education.name"
                class="cursor-pointer"
                @click="openLink(education.link)"
              />
            </div>
          </div>

          <div>
            <h2
              class="text-2xl text-primary font-semibold cursor-pointer"
              @click="openLink(education.link)"
            >
              {{ education.name }}
            </h2>
            <div class="flex flex-wrap items-center gap-2">
              <h3
                class="text-lg text-base-content cursor-pointer"
                @click="openLink(education.link)"
              >
                {{ education.department }}
              </h3>
              <span class="text-sm text-base-content/50">•</span>
              <span class="text-sm text-base-content/50">{{ education.years }}</span>
            </div>
          </div>
        </div>

        <div class="text-base-content/80 text-sm leading-relaxed whitespace-pre-line">
          {{ education.description }}
        </div>
      </div>
    </div>
  </div>
</template>
