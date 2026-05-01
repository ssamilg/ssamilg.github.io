<script>
import { computed } from 'vue';
import { useCVData } from '@/composables/useCVData';

export default {
  name: 'BiographyCard',
  setup() {
    const cv = useCVData();
    const summary = computed(() => cv.value.about.cv);

    return {
      summary
    };
  }
};
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold text-base-content mb-4">
      {{ $t('biography.title') }}
    </h1>

    <p class="text-base text-base-content/80 whitespace-pre-line" v-html="summary"></p>
  </div>
</template>
