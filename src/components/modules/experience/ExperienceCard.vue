<script>
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import VIcon from '@/components/common/VIcon.vue';

export default {
  name: 'ExperienceCard',
  components: { VIcon },
  setup() {
    const { t, locale } = useI18n();

    // Make experiences reactive to locale changes
    const experiences = computed(() => [
      {
        id: 0,
        company: t('experience.companies.sensity.name'),
        companyLink: 'https://sensity.ai/',
        companyLogo: 'https://pbs.twimg.com/profile_images/1288045838024007682/EKo6Gp7c_400x400.jpg',
        // companyLogo: 'https://sensity.ai/wp-content/uploads/2024/04/sensity-logo-square.png',
        role: t('experience.roles.frontend'),
        description: t('experience.companies.sensity.description'),
        detail: t('experience.companies.sensity.detail'),
        technologies: ['Vue.js', 'Next.js', 'Tailwind', 'Docker', 'GitHub CI/CD', 'Vitest'],
        years: t('experience.companies.sensity.period')
      },
      {
        id: 1,
        company: t('experience.companies.pitcher.name'),
        companyLink: 'https://www.pitcher.com/',
        companyLogo: 'https://sc-images-prod.s3.eu-central-1.amazonaws.com/logos/1c214b62-b87f-46e7-a982-44f449fe33df_logo.jpg',
        // companyLogo: 'https://play-lh.googleusercontent.com/9RgJbmjOoVNULZKi--OUvjxUr1isDGO7LBcpGna5pY59H-FDHouKrD0MnXi9OVMOViI',
        role: t('experience.roles.software'),
        description: t('experience.companies.pitcher.description'),
        detail: t('experience.companies.pitcher.detail'),
        technologies: ['Vue.js', 'Angular.js', 'Node.js', 'JQuery'],
        years: t('experience.companies.pitcher.period')
      },
      {
        id: 2,
        company: t('experience.companies.reybex.name'),
        companyLink: 'https://www.reybex.com/en/',
        // companyLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHNBjVDiCtbTCKSc4slfyAO7ID-KIXQoPAtw&s',
        companyLogo: 'https://www.reybex.com/wp-content/uploads/2024/04/Reybex_Logo_Bildmarke_white_RGB-768x768.png',
        role: t('experience.roles.frontend'),
        description: t('experience.companies.reybex.description'),
        detail: t('experience.companies.reybex.detail'),
        technologies: ['Vue.js', 'Vuetify', 'Gitlab CI/CD', 'Jenkins'],
        years: t('experience.companies.reybex.period')
      }
    ]);

    const openLink = (link) => {
      window.open(link);
    };

    return {
      experiences,
      openLink
    }
  }
};
</script>

<template>
  <div class="experience-section">
    <h1 class="text-4xl font-bold text-base-content mb-4">
      {{ $t('experience.title') }}
    </h1>

    <div
      v-for="(experience, index) in experiences"
      :key="experience.id"
      class="experience-item"
    >
      <div class="flex flex-col gap-4">
        <!-- Header -->
        <div class="flex items-center gap-4">
          <div class="avatar">
            <div class="w-16 h-16 rounded">
              <img
                :src="experience.companyLogo"
                :alt="experience.company"
                class="cursor-pointer"
                @click="openLink(experience.companyLink)"
              />
            </div>
          </div>

          <div>
            <h2 class="text-2xl text-base-content font-semibold">
              {{ experience.role }}
            </h2>
            <div class="flex items-center gap-2">
              <h3
                class="text-lg text-primary hover:underline cursor-pointer"
                @click="openLink(experience.companyLink)"
              >
                {{ experience.company }}
              </h3>
              <span class="text-sm text-base-content/50">•</span>
              <span class="text-sm text-base-content/50">{{ experience.years }}</span>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="text-base-content/80 whitespace-pre-line">
          {{ experience.detail }}
        </div>

        <!-- Technologies -->
        <div class="flex flex-wrap gap-2">
          <div
            v-for="technology in experience.technologies"
            :key="technology"
            class="badge badge-ghost p-4 text-base-content/90 bg-base-200 hover:bg-base-300 cursor-default"
          >
            {{ technology }}
          </div>
        </div>
      </div>

      <div v-if="index !== experiences.length - 1" class="divider"/>
    </div>
  </div>
</template>
