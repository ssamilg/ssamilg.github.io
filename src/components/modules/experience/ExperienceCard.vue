<script>
import VIcon from '@/components/common/VIcon.vue';

export default {
  name: 'ExperienceCard',
  components: { VIcon },
  data() {
    return {
      experiences: [
        {
          id: 0,
          company: 'Sensity AI',
          companyLink: 'https://sensity.ai/',
          companyLogo: 'https://pbs.twimg.com/profile_images/1288045838024007682/EKo6Gp7c_400x400.jpg',
          // companyLogo: 'https://sensity.ai/wp-content/uploads/2024/04/sensity-logo-square.png',
          role: 'Frontend Developer',
          description: 'Leading frontend development for Sensity\'s JavaScript-based products and SDK solutions. Driving platform improvements through modern development practices and architectural enhancements.',
          technologies: ['Vue.js', 'Tailwind', 'Docker', 'GitHub CI/CD', 'Vitest']
        },
        {
          id: 1,
          company: 'Pitcher AG',
          companyLink: 'https://www.pitcher.com/',
          companyLogo: 'https://play-lh.googleusercontent.com/9RgJbmjOoVNULZKi--OUvjxUr1isDGO7LBcpGna5pY59H-FDHouKrD0MnXi9OVMOViI',
          // companyLogo: 'https://sc-images-prod.s3.eu-central-1.amazonaws.com/logos/1c214b62-b87f-46e7-a982-44f449fe33df_logo.jpg',
          role: 'Software Engineer',
          description: 'Architected cross-platform interfaces for iOS, Android, and Windows. Modernized legacy applications while ensuring consistent user experience across platforms.',
          technologies: ['Vue.js', 'Vuetify']
        },
        {
          id: 2,
          company: 'reybex ERP',
          companyLink: 'https://www.reybex.com/en/',
          companyLogo: 'https://www.reybex.com/wp-content/uploads/2024/04/Reybex_Logo_Bildmarke_white_RGB-768x768.png',
          // companyLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHNBjVDiCtbTCKSc4slfyAO7ID-KIXQoPAtw&s',
          role: 'Frontend Developer',
          description: 'Core frontend developer for reybex 2.0, building modern interfaces for complex ERP modules. Specialized in creating intuitive user experiences for enterprise software.',
          technologies: ['Vue.js', 'Vuetify', 'Gitlab CI/CD', 'Jenkins']
        },
      ]
    };
  },
  methods: {
    openLink(link) {
      window.open(link);
    },
  },
};
</script>

<template>
  <div class="pb-4 px-2 md:px-8">
    <h1 class="text-4xl font-bold text-base-content mb-4">Experience</h1>

    <div v-for="(experience, index) in experiences"
          :key="experience.id"
          class="experience-item">
      <div class="flex flex-col gap-4">
        <!-- Header -->
        <div class="flex items-center gap-4">
          <div class="avatar">
            <div class="w-16 h-16 rounded bg-base-300">
              <img
                :src="experience.companyLogo"
                :alt="experience.company"
                class="cursor-pointer"
                @click="openLink(experience.companyLink)"
              />
            </div>
          </div>

          <div>
            <h2 class="text-2xl text-base-content">
              {{ experience.role }}
            </h2>
            <h3
              class="text-lg text-primary hover:underline cursor-pointer"
              @click="openLink(experience.companyLink)"
            >
              {{ experience.company }}
            </h3>
          </div>
        </div>

        <!-- Description -->
        <p class="text-base-content/70">
          {{ experience.description }}
        </p>

        <!-- Technologies -->
        <div class="flex flex-wrap gap-2">
          <div
            v-for="technology in experience.technologies"
            :key="technology"
            class="badge p-4 text-base-content/80 bg-base-200 hover:bg-base-300 cursor-default"
          >
            {{ technology }}
          </div>
        </div>
      </div>

      <div v-if="index !== experiences.length - 1" class="divider"/>
    </div>
  </div>
</template>
