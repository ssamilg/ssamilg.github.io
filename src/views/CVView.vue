<script>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import html2pdf from 'html2pdf.js';
import VIcon from '@/components/common/VIcon.vue';
import BiographyCard from '@/components/modules/biography/BiographyCard.vue';
import ExperienceCard from '@/components/modules/experience/ExperienceCard.vue';

export default {
  name: 'CVView',
  components: {
    VIcon,
    BiographyCard,
    ExperienceCard,
  },
  setup() {
    const { t } = useI18n();
    const contentRef = ref(null);

    const exportToPDF = async () => {
      // ... existing PDF export code
    };

    const socialLinks = computed(() => [
      {
        icon: 'github_light',
        link: 'https://github.com/ssamilg',
        title: 'GitHub'
      },
      {
        icon: 'linkedin',
        link: 'https://www.linkedin.com/in/ssamilg/',
        title: 'LinkedIn'
      },
      {
        icon: 'X',
        link: 'https://twitter.com/ssamilg/',
        title: 'Twitter'
      },
      {
        icon: 'instagram',
        link: 'https://instagram.com/ssamilg/',
        title: 'Instagram'
      }
    ]);

    return {
      contentRef,
      exportToPDF,
      socialLinks,
    };
  }
}
</script>

<template>
  <div id="cv">
    <!-- Add ref to the content we want to export -->
    <div ref="contentRef">
      <div class="flex justify-center">
        <div class="basis-full md:basis-3/4 lg:basis-2/4 wrapper">
          <div class="header">
            <div class="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              <div class="avatar mb-4 md:mb-0">
                <div class="w-40 md:w-48 rounded ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="https://pbs.twimg.com/profile_images/1674901389888090112/kgexvPzN_400x400.jpg" alt="profile_photo"/>
                </div>
              </div>

              <div class="flex flex-col items-center md:items-start">
                <h1 class="text-4xl md:text-5xl font-bold text-center md:text-left mb-2 px-4 md:px-0">
                  {{ $t('header.title') }}
                </h1>
                <p class="text-lg md:text-xl text-base-content/70 mb-4 text-center md:text-left px-4 md:px-0">
                  {{ $t('header.role') }}
                </p>

                <!-- Add class for targeting social buttons -->
                <div class="flex gap-4 social-buttons">
                  <a
                    v-for="social in socialLinks"
                    :key="social.icon"
                    :href="social.link"
                    :title="social.title"
                    class="btn btn-ghost border-gray-800 bg-base-200/50"
                  >
                    <VIcon :icon="social.icon" height="32px"/>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="content">
            <div class="flex mt-8">
              <BiographyCard/>
            </div>

            <div class="flex mt-8">
              <ExperienceCard/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#cv {
  width: 100%;

  .wrapper {
    @apply pt-8 pb-16 px-6 md:px-8;
  }
}
</style>