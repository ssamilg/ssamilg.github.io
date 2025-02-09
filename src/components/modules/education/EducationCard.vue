<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const educationItems = [
  {
    id: 'sau',
    name: t('education.universities.sau.name'),
    logo: 'https://www.sakarya.edu.tr/assets/img/sau-logo-dikey.jpg',
    link: 'https://www.sakarya.edu.tr/',
    department: t('education.universities.sau.department'),
    description: t('education.universities.sau.description'),
    years: t('education.universities.sau.period'),
    technologies: ['C++', 'Java', 'Python', 'Data Structures', 'Algorithms', 'Software Engineering']
  }
];

const openLink = (link) => {
  window.open(link);
};
</script>

<template>
  <div class="experience-section">
    <h1 class="text-4xl font-bold text-base-content mb-4">
      {{ $t('education.title') }}
    </h1>

    <div
      v-for="(education) in educationItems"
      :key="education.id"
      class="experience-item"
    >
      <div class="flex flex-col gap-4">
        <!-- Header -->
        <div class="flex items-center gap-4">
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
              class="text-2xl text-base-content font-semibold cursor-pointer"
              @click="openLink(education.link)"
            >
              {{ education.name }}
            </h2>
            <div class="flex items-center gap-2">
              <h3
                class="text-lg text-primary cursor-pointer"
                @click="openLink(education.link)"
              >
                {{ education.department }}
              </h3>
              <span class="text-sm text-base-content/50">•</span>
              <span class="text-sm text-base-content/50">{{ education.years }}</span>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="text-base-content/80 whitespace-pre-line">
          {{ education.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.experience-item {
  @apply flex flex-wrap md:flex-nowrap items-start transition-all duration-700 ease-out;

  .year {
    @apply basis-full text-center md:text-left md:basis-auto text-primary font-mono md:text-lg w-44 md:pt-6 2xl:text-2xl 2xl:w-48;
  }

  .experience-card {
    @apply basis-full md:basis-auto rounded-2xl p-4 md:p-6 my-2 w-full;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-4px);
    }
  }
}

.card-role {
  @apply basis-auto md:basis-full md:text-2xl font-bold text-primary 2xl:text-3xl;
}

.card-company {
  @apply basis-auto md:basis-full md:text-lg font-semibold text-base-content/80 mb-2 2xl:text-xl;
}

.card-description {
  @apply basis-full md:basis-auto text-sm md:text-base text-base-content/80 2xl:text-lg;
}
</style>