<script>
import { computed } from 'vue';
import VIcon from '@/components/common/VIcon.vue';
import { useCVData } from '@/composables/useCVData';
import {
  CommandLineIcon,
} from '@heroicons/vue/24/outline'

export default {
  name: 'ExperienceCard',
  components: { VIcon },
  setup() {
    const cv = useCVData();

    const experiences = computed(() => [
      {
        id: 0,
        icon: CommandLineIcon,
        role: cv.value.experience.consultant.title,
        desc: cv.value.experience.consultant.desc,
        years: cv.value.experience.consultant.period
      },
      {
        id: 1,
        company: cv.value.experience.sensity.name,
        companyLink: 'https://sensity.ai/',
        companyLogo: 'https://pbs.twimg.com/profile_images/2064734908640112640/fW_gI8cO.jpg',
        role: cv.value.experience.sensity.title,
        desc: cv.value.experience.sensity.desc,
        years: cv.value.experience.sensity.period
      },
      {
        id: 1,
        company: cv.value.experience.pitcher.name,
        companyLink: 'https://www.pitcher.com/',
        companyLogo: 'https://sc-images-prod.s3.eu-central-1.amazonaws.com/logos/1c214b62-b87f-46e7-a982-44f449fe33df_logo.jpg',
        role: cv.value.experience.pitcher.title,
        desc: cv.value.experience.pitcher.desc,
        years: cv.value.experience.pitcher.period
      },
      {
        id: 2,
        company: cv.value.experience.reybex.name,
        companyLink: 'https://www.reybex.com/en/',
        companyLogo: 'https://www.reybex.com/wp-content/uploads/2024/04/Reybex_Logo_Bildmarke_white_RGB-768x768.png',
        role: cv.value.experience.reybex.title,
        desc: cv.value.experience.reybex.desc,
        years: cv.value.experience.reybex.period
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
  <div>
    <h1 class="text-4xl font-bold text-base-content mb-4">
      {{ $t('experience.title') }}
    </h1>

    <div
      v-for="experience in experiences"
      :key="experience.id"
      class="bg-base-200/50 backdrop-blur-sm rounded p-6 mb-6"
    >
      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap items-center gap-4">
          <div class="avatar">
            <div class="w-16 h-16 rounded">
              <img
                v-if="experience.companyLogo"
                :src="experience.companyLogo"
                :alt="experience.company"
                  class="cursor-pointer"
                  @click="openLink(experience.companyLink)"
                />
              <template v-else-if="experience.icon">
                <component :is="experience.icon" height="60px" />
              </template>
            </div>
          </div>

          <div>
            <h2 class="text-2xl text-primary font-semibold">
              {{ experience.role }}
            </h2>
            <div class="flex items-center">
              <h3
                v-if="experience.company"
                class="text-lg text-base-content hover:underline cursor-pointer"
                @click="openLink(experience.companyLink)"
              >
                {{ experience.company }}
              </h3>
              <span v-if="experience.company" class="mx-2 text-sm text-base-content/50">•</span>
              <span class="text-sm text-base-content/50">{{ experience.years }}</span>
            </div>
          </div>
        </div>

        <ul class="list-disc pl-4 text-base-content/80 text-sm leading-relaxed space-y-1.5">
          <li v-for="(item, i) in experience.desc" :key="i" v-html="item"></li>
        </ul>
      </div>
    </div>
  </div>
</template>
