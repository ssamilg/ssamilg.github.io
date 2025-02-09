<script>
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

export default {
  name: 'BiographyCard',
  setup() {
    const { tm } = useI18n();
    const summary = computed(() => tm('biography.summary'));

    return {
      summary
    };
  }
};
</script>

<template>
  <div class="biography-section">
    <h1 class="text-4xl font-bold text-base-content mb-4">
      {{ $t('biography.title') }}
    </h1>

    <div class="bg-base-200/50 p-5 border border-gray-800 rounded">
      <div v-for="(section, index) in summary" :key="index">
        <p class="text-base text-base-content/80 whitespace-pre-line">
          {{ section }}
        </p>

        <div v-if="index !== summary.length - 1" class="mb-4"/>
      </div>
    </div>
  </div>
</template>
