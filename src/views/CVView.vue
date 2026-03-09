<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import VIcon from '@/components/common/VIcon.vue';
import BiographyCard from '@/components/modules/biography/BiographyCard.vue';
import ExperienceCard from '@/components/modules/experience/ExperienceCard.vue';
import EducationCard from '@/components/modules/education/EducationCard.vue';

const { t } = useI18n();

const socialLinks = computed(() => [
  {
    icon: 'github',
    link: 'https://github.com/ssamilg',
    label: 'ssamilg',
    title: 'GitHub'
  },
  {
    icon: 'linkedin',
    link: 'https://www.linkedin.com/in/ssamilg/',
    label: 'ssamilg',
    title: 'LinkedIn'
  },
  {
    icon: 'X',
    link: 'https://twitter.com/ssamilg/',
    label: '@ssamilg',
    title: 'Twitter'
  },
  {
    icon: 'instagram',
    link: 'https://instagram.com/ssamilg/',
    label: '@ssamilg',
    title: 'Instagram'
  },
  {
    icon: 'email',
    link: 'mailto:s.samilgokmen@gmail.com',
    label: 's.samilgokmen@gmail.com',
    title: t('contact.actions.email')
  }
]);

const particlesOptions = {
  fullScreen: { enable: false },
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  particles: {
    color: { value: '#3B82F6' },
    links: {
      color: '#3B82F6',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1.5
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: 'none',
      random: true,
      straight: false,
      outModes: { default: 'out' }
    },
    number: {
      density: { enable: true, area: 800 },
      value: 150
    },
    opacity: {
      value: 0.7
    },
    size: {
      value: { min: 1, max: 5 }
    }
  },
  detectRetina: true
};
</script>

<template>
  <div id="cv" class="w-full">
    <!-- Hero -->
    <section
      class="relative w-full bg-base-100 min-h-[40vh] flex items-center justify-center
             -mt-16 pt-16 overflow-hidden"
    >
      <vue-particles
        id="hero-particles"
        :options="particlesOptions"
        class="absolute inset-0 z-0"
      />

      <div class="relative z-10 w-full max-w-6xl mx-auto px-6">
        <div class="bg-primary/5 backdrop-blur-sm p-10 rounded">
          <div class="flex flex-col md:flex-row items-center gap-6">
            <div class="avatar flex-shrink-0">
              <div class="w-36 md:w-60 rounded-lg">
                <img
                  src="https://pbs.twimg.com/profile_images/1674901389888090112/kgexvPzN_400x400.jpg"
                  alt="profile_photo"
                />
              </div>
            </div>

            <div class="flex flex-col items-center md:items-start gap-3 flex-1">
              <div>
                <h1 class="text-4xl md:text-5xl font-bold text-base-content text-center md:text-left">
                  {{ $t('header.title') }}
                </h1>
                <p class="text-lg md:text-3xl text-primary font-medium mt-2 text-center md:text-left">
                  {{ $t('header.subtitle') }}
                </p>
              </div>

              <div class="flex flex-wrap gap-2 mt-4">
                <a
                  v-for="social in socialLinks"
                  :key="social.icon"
                  :href="social.link"
                  :title="social.title"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2 px-3 py-1.5 rounded-full
                         border border-base-300 bg-base-200/40
                         text-base-content/60 text-sm
                         hover:border-primary/50 hover:bg-base-200 hover:text-base-content
                         transition-all duration-200"
                >
                  <VIcon :icon="social.icon" height="16px" class="flex-shrink-0" />
                  <span class="w-px h-3.5 bg-base-content/20 flex-shrink-0" />
                  <span class="font-mono text-xs tracking-tight">{{ social.label }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Me -->
    <section class="w-full bg-base-200/50 py-20">
      <div class="max-w-6xl mx-auto px-6">
        <BiographyCard />
      </div>
    </section>

    <!-- Experience & Education -->
     <div class="section-experience relative">
       <section class="max-w-6xl mx-auto px-6 py-20">
         <ExperienceCard />
         <div class="mt-10">
           <EducationCard />
         </div>
       </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#cv {
  .section-experience::before {
    @apply absolute inset-0 opacity-[0.05] z-0;
    content: '';
    --blueprint-line: 1.5px;
    --blueprint-small-line: 0.75px;
    --blueprint-size: 50px;
    --blueprint-small-size: 10px;
    --blueprint-color: theme('colors.primary');

    background-image:
      linear-gradient(var(--blueprint-color) var(--blueprint-line), transparent var(--blueprint-line)),
      linear-gradient(90deg, var(--blueprint-color) var(--blueprint-line), transparent var(--blueprint-line)),
      linear-gradient(var(--blueprint-color) var(--blueprint-small-line), transparent var(--blueprint-small-line)),
      linear-gradient(90deg, var(--blueprint-color) var(--blueprint-small-line), transparent var(--blueprint-small-line));
    background-size:
      var(--blueprint-size) var(--blueprint-size),
      var(--blueprint-size) var(--blueprint-size),
      var(--blueprint-small-size) var(--blueprint-small-size),
      var(--blueprint-small-size) var(--blueprint-small-size);
    background-position:
      calc(-1 * var(--blueprint-line)) calc(-1 * var(--blueprint-line)),
      calc(-1 * var(--blueprint-line)) calc(-1 * var(--blueprint-line)),
      calc(-1 * var(--blueprint-small-line)) calc(-1 * var(--blueprint-small-line)),
      calc(-1 * var(--blueprint-small-line)) calc(-1 * var(--blueprint-small-line));

      @screen 2xl {
      --blueprint-line: 2px;
      --blueprint-small-line: 1px;
      --blueprint-size: 75px;
      --blueprint-small-size: 15px;
    }
  }
}
</style>