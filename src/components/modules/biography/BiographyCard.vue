<script>
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

export default {
  name: 'BiographyCard',
  setup() {
    const { tm } = useI18n();

    const sections = computed(() => tm('biography.sections'));

    return {
      sections
    }
  }
};
</script>

<template>
  <div class="biography-section">
    <h1 class="text-4xl font-bold text-base-content mb-4">
      {{ $t('biography.title') }}
    </h1>

    <div class="bg-base-200/50 p-5 border border-gray-800 rounded">
      <div v-for="(section, index) in sections" :key="index">
        <p class="text-base text-base-content/80">
          {{ section }}
        </p>

        <div v-if="index !== sections.length - 1"
             class="divider text-base-content/30">o</div>
      </div>
    </div>
  </div>
</template>
