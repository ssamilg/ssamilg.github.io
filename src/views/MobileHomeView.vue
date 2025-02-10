<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  UserIcon,
  BriefcaseIcon,
  CommandLineIcon,
  ChevronDoubleDownIcon,
  RocketLaunchIcon,
  BookOpenIcon,
  WrenchScrewdriverIcon,
  CodeBracketIcon,
  PaintBrushIcon,
  CpuChipIcon,
  ServerIcon,
  CircleStackIcon,
  WrenchIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/vue/24/outline'
import VIcon from '@/components/common/VIcon.vue'

const { t, tm } = useI18n()
const descriptions = computed(() => tm('header.descriptions'))
const currentDescriptionIndex = ref(0)
const isDescriptionChanging = ref(false)

const sections = [
  {
    id: 'hero',
    title: 'Şehit Şamil Gökmen',
    subtitle: t('header.subtitle'),
    description: t('header.description'),
    icon: CommandLineIcon
  },
  {
    id: 'about',
    title: t('about.title'),
    description: t('about.description'),
    icon: UserIcon
  },
  {
    id: 'experience',
    title: t('experience.title'),
    description: t('experience.description'),
    icon: BriefcaseIcon
  },
  {
    id: 'skills',
    title: t('skills.title'),
    description: t('skills.description'),
    icon: WrenchScrewdriverIcon
  },
  {
    id: 'projects',
    title: t('projects.title'),
    description: t('projects.description'),
    icon: CommandLineIcon
  },
  {
    id: 'contact',
    title: t('contact.title'),
    description: t('contact.description'),
    icon: EnvelopeIcon
  }
]

const experienceItems = [
  {
    id: 'sensity',
    name: 'experience.companies.sensity.name',
    period: 'experience.companies.sensity.period',
    role: 'experience.roles.frontend',
    description: 'experience.companies.sensity.description',
    delay: 0.3
  },
  {
    id: 'pitcher',
    name: 'experience.companies.pitcher.name',
    period: 'experience.companies.pitcher.period',
    role: 'experience.roles.software',
    description: 'experience.companies.pitcher.description',
    delay: 0.6
  },
  {
    id: 'reybex',
    name: 'experience.companies.reybex.name',
    period: 'experience.companies.reybex.period',
    role: 'experience.roles.frontend',
    description: 'experience.companies.reybex.description',
    delay: 0.9
  }
]

const projects = [
  {
    id: 'featured',
    title: t('projects.featured.iftar_timer.title'),
    description: t('projects.featured.iftar_timer.description'),
    image: '/images/iftar-timer.png',
    technologies: ['Vue.js', 'Tailwind'],
    liveUrl: 'https://iftartime.netlify.app/',
    sourceUrl: 'https://github.com/ssamilg/iftar-time-app',
  },
  {
    id: 'weather-forecast-demo',
    title: t('projects.featured.weather_forecast.title'),
    description: t('projects.featured.weather_forecast.description'),
    image: '/images/weather-forecast.png',
    technologies: ['Vue', 'Vuetify'],
    liveUrl: 'https://ssg-weather-app.netlify.app/',
    sourceUrl: 'https://github.com/ssamilg/weather-forecast-app'
  },
  {
    id: 'meme-generator-demo',
    title: t('projects.featured.meme_generator.title'),
    description: t('projects.featured.meme_generator.description'),
    image: '/images/meme-generator.png',
    technologies: ['Next.js'],
    liveUrl: 'https://meme-generator-ssamilg.vercel.app/',
    sourceUrl: 'https://github.com/ssamilg/meme-generator'
  }
]

const skillSections = [
  {
    id: "dev",
    name: t('skills.sections.development.title'),
    color: "text-blue-500",
    background: "bg-blue-900/10",
    categories: [
      {
        id: "coding",
        name: t('skills.sections.development.categories.coding'),
        skills: [
          { name: "JavaScript", icon: "js" },
          { name: "Vue.js", icon: "vuejs" },
          { name: "React", icon: "reactjs" },
          { name: "Node.js", icon: "nodejs" },
          { name: "Next.js", icon: "nextjs" }
        ]
      },
      {
        id: "styling",
        name: t('skills.sections.development.categories.styling'),
        skills: [
          { name: "HTML5", icon: "html5" },
          { name: "CSS3", icon: "css3" },
          { name: "Tailwind", icon: "tailwind" },
          { name: "SCSS", icon: "sass" },
          { name: "Bootstrap", icon: "bootstrap5" }
        ]
      },
      {
        id: "build-testing",
        name: t('skills.sections.development.categories.build_testing'),
        skills: [
          { name: "Vite", icon: "vite" },
          { name: "Webpack", icon: "webpack" },
          { name: "Jest", icon: "jest" },
          { name: "Vitest", icon: "vitest" },
          { name: "ESLint", icon: "eslint" },
          { name: "Prettier", icon: "prettier" }
        ]
      }
    ]
  },
  {
    id: "cicd",
    name: t('skills.sections.tools.title'),
    color: "text-green-500",
    background: "bg-green-900/10",
    categories: [
      {
        id: "vc",
        name: t('skills.sections.tools.categories.version_control'),
        skills: [
          { name: "Git", icon: "git" },
          { name: "GitHub", icon: "github" },
          { name: "GitLab", icon: "gitlab" }
        ]
      },
      {
        id: "ci-cd",
        name: t('skills.sections.tools.categories.ci_cd'),
        skills: [
          { name: "Jenkins", icon: "jenkins" },
          { name: "GitHub Actions", icon: "github" },
          { name: "Surge", icon: "surge" },
          { name: "Vercel", icon: "vercel" },
          { name: "Netlify", icon: "netlify" }
        ]
      },
      {
        id: "other-tools",
        name: t('skills.sections.tools.categories.other_tools'),
        skills: [
          { name: "Docker", icon: "docker" },
          { name: "Sentry", icon: "sentry" },
          { name: "Firebase", icon: "firebase" },
          { name: "Postman", icon: "postman" },
          { name: "MongoDB", icon: "mongodb" }
        ]
      }
    ]
  }
]

const contactInfo = {
  email: 's.samilgokmen@gmail.com',
  github: 'github.com/ssamilg',
  twitter: 'twitter.com/ssamilg',
  linkedin: 'linkedin.com/in/ssamilg',
  location: 'Ankara, Türkiye',
  timezone: 'UTC+3'
}

const rotateDescription = () => {
  isDescriptionChanging.value = true
  setTimeout(() => {
    currentDescriptionIndex.value = (currentDescriptionIndex.value + 1) % descriptions.value.length
    isDescriptionChanging.value = false
  }, 500)
}

let descriptionInterval

// Add new refs for animation
const sectionRefs = ref([])
const observedSections = ref(new Set())

onMounted(() => {
  descriptionInterval = setInterval(rotateDescription, 5000)

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observedSections.value.add(entry.target.dataset.section)
          sectionRefs.value = [...sectionRefs.value]
        }
      })
    },
    {
      threshold: 0.1
    }
  )

  // Observe all sections
  document.querySelectorAll('.section').forEach((section) => {
    observer.observe(section)
  })

  return () => observer.disconnect()
})

const isVisible = (sectionId) => {
  return observedSections.value.has(sectionId)
}

onUnmounted(() => {
  if (descriptionInterval) {
    clearInterval(descriptionInterval)
  }
})
</script>

<template>
  <!-- Main container with natural scroll -->
  <div class="mobile-container h-full">
    <!-- Hero Section -->
    <section class="section section-hero h-[calc(100vh-64px)] flex items-center justify-center" data-section="hero">
      <div class="hero-container" :class="{ 'fade-in': isVisible('hero') }">
        <CommandLineIcon class="hero-icon" />
        <h1 class="hero-title">{{ sections[0].title }}</h1>
        <h2 class="hero-subtitle">{{ t('header.subtitle') }}</h2>
        <p class="hero-description"
          :class="{
            'opacity-0 -translate-y-4': isDescriptionChanging,
            'opacity-100 translate-y-0': !isDescriptionChanging
          }"
        >
          {{ descriptions[currentDescriptionIndex] }}
        </p>
      </div>
      <div class="bounce-arrow">
        <ChevronDoubleDownIcon class="h-5 w-5" />
      </div>
    </section>

    <!-- About Section -->
    <section class="section section-about" data-section="about">
      <div class="fade-in-section" :class="{ 'fade-in': isVisible('about') }">
        <div class="">
          <div class="flex items-center gap-4 mb-8">
            <UserIcon class="section-icon" />
            <h2 class="section-title">{{ sections[1].title }}</h2>
          </div>
          <div class="biography-content">
            <div class="biography-item">
              <RocketLaunchIcon class="biography-icon" />
              <p class="biography-text">{{ $tm('biography.sections')[0] }}</p>
            </div>
            <div class="biography-item">
              <BriefcaseIcon class="biography-icon" />
              <p class="biography-text">{{ $tm('biography.sections')[1] }}</p>
            </div>
            <div class="biography-item">
              <BookOpenIcon class="biography-icon" />
              <p class="biography-text">{{ $tm('biography.sections')[2] }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Section -->
    <section class="section section-experience" data-section="experience">
      <div class="fade-in-section" :class="{ 'fade-in': isVisible('experience') }">
        <div class="">
          <div class="flex items-center gap-4 mb-8">
            <BriefcaseIcon class="section-icon" />
            <h2 class="section-title">{{ sections[2].title }}</h2>
          </div>
          <div class="experience-container">
            <div
              v-for="(item, index) in experienceItems"
              :key="item.id"
              class="experience-item mt-4"
            >
              <div class="year font-mono text-primary text-lg">{{ $t(item.period) }}</div>
              <div class="experience-card" :class="[
                index === 0 ? 'bg-primary/90' :
                index === 1 ? 'bg-primary/45' :
                'bg-primary/10'
              ]">
                <h3 class="card-role text-lg font-bold">{{ $t(item.role) }}</h3>
                <h4 class="card-company">{{ $t(item.name) }}</h4>
                <p class="card-description text-sm mt-2">{{ $t(item.description) }}</p>
              </div>
            </div>

            <router-link
              to="/cv"
              class="w-full justify-center text-center relative z-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 flex items-center gap-2 text-sm font-medium mt-2"
            >
              {{ t('experience.actions.view_full') }}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="section section-skills" data-section="skills">
      <div class="fade-in-section" :class="{ 'fade-in': isVisible('skills') }">
        <div class="">
          <div class="flex items-center gap-4 mb-8">
            <WrenchScrewdriverIcon class="section-icon" />
            <h2 class="section-title">{{ sections[3].title }}</h2>
          </div>
          <div class="skills-container">
            <div v-for="section in skillSections" :key="section.id" class="mt-4">
              <h3 :class="[section.color, 'text-2xl font-bold mb-4 flex items-center gap-2']">
                <CodeBracketIcon v-if="section.id === 'dev'" class="w-6 h-6" />
                <WrenchIcon v-if="section.id === 'cicd'" class="w-6 h-6" />
                {{ section.name }}
              </h3>
              <div class="skill-category" :class="[section.background]">
                <div v-for="category in section.categories" :key="category.id" class="mb-6">
                  <h4 class="text-lg font-semibold mb-3" :class="section.color">{{ category.name }}</h4>
                  <div class="flex flex-wrap gap-2">
                    <div v-for="skill in category.skills" :key="skill.name" class="skill-item">
                      <div class="flex items-center gap-2">
                        <VIcon v-if="skill.icon" :icon="skill.icon" height="1.25rem" />
                        {{ skill.name }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section class="section section-projects" data-section="projects">
      <div class="fade-in-section" :class="{ 'fade-in': isVisible('projects') }">
        <div class="">
          <div class="flex items-center gap-4 mb-8">
            <CommandLineIcon class="section-icon" />
            <h2 class="section-title">{{ sections[4].title }}</h2>
          </div>
          <div class="projects-grid">
            <div v-for="project in projects" :key="project.id" class="project-card mb-6">
              <img :src="project.image" :alt="project.title" class="project-image">
              <div class="project-content">
                <h3 class="project-title">{{ project.title }}</h3>
                <p class="project-description">{{ project.description }}</p>
                <div class="project-tech">
                  <span v-for="tech in project.technologies" :key="tech" class="tech-tag">
                    {{ tech }}
                  </span>
                </div>
                <div class="project-links">
                  <a :href="project.liveUrl" target="_blank" class="project-link">
                    {{ t('projects.actions.live_demo') }}
                  </a>
                  <a :href="project.sourceUrl" target="_blank" class="project-link">
                    {{ t('projects.actions.source_code') }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="section section-contact" data-section="contact">
      <div class="fade-in-section" :class="{ 'fade-in': isVisible('contact') }">
        <div class="">
          <div class="flex items-center gap-4 mb-4">
            <EnvelopeIcon class="section-icon" />
            <h2 class="section-title">{{ sections[5].title }}</h2>
          </div>

          <p class="text-base-content/70 my-4">
            {{ sections[5].description }}
          </p>

          <div class="contact-grid">
            <div class="contact-card mb-6">
              <h3 class="text-xl font-bold mb-4 text-primary">{{ t('contact.actions.get_in_touch') }}</h3>
              <div class="space-y-4">
                <a :href="`mailto:${contactInfo.email}`" class="contact-link">
                  <EnvelopeIcon class="w-6 h-6" />
                  <span>{{ contactInfo.email }}</span>
                </a>
                <div class="contact-link">
                  <MapPinIcon class="w-6 h-6" />
                  <span>{{ contactInfo.location }}</span>
                </div>
                <div class="contact-link">
                  <ClockIcon class="w-6 h-6" />
                  <span>{{ contactInfo.timezone }}</span>
                </div>
              </div>
            </div>
            <div class="contact-card">
              <h3 class="text-xl font-bold mb-4 text-primary">{{ t('contact.actions.social_links') }}</h3>
              <div class="space-y-4">
                <a :href="`https://${contactInfo.github}`" target="_blank" class="contact-link">
                  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>{{ contactInfo.github }}</span>
                </a>
                <a :href="`https://${contactInfo.linkedin}`" target="_blank" class="contact-link">
                  <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>{{ contactInfo.linkedin }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.mobile-container {
  // @apply pb-8;
}

.section {
  @apply px-4 pb-8 relative;

  &::before {
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
  }

  &-hero {
    @apply bg-gradient-to-b from-base-100 to-base-200;
  }

  &-about {
    @apply bg-base-200;
  }

  &-experience {
    @apply bg-gradient-to-t from-base-100 to-base-200;
  }

  &-skills {
    @apply bg-gradient-to-b from-base-100 to-base-200;
  }

  &-projects {
    @apply bg-gradient-to-b from-base-200 to-base-100;
  }

  &-contact {
    @apply bg-base-100;
  }
}

.hero-container {
  @apply text-center;
}

.hero-icon {
  @apply h-12 w-12 mx-auto mb-4 text-primary;
}

.hero-title {
  @apply text-4xl font-bold mb-3;
}

.hero-subtitle {
  @apply text-xl text-primary mb-3;
}

.hero-description {
  @apply text-base text-base-content/70 transition-all duration-500;
}

.section-title {
  @apply text-3xl font-bold;
}

.section-icon {
  @apply h-8 w-8 text-primary;
}

.biography-item {
  @apply flex items-start gap-3 mb-6;
}

.biography-icon {
  @apply w-6 h-6 text-primary flex-shrink-0;
}

.biography-text {
  @apply text-base text-base-content/80;
}

.experience-card {
  @apply rounded-xl p-4 transition-transform duration-300;

  &:hover {
    transform: translateY(-2px);
  }
}

.skill-category {
  @apply rounded-xl p-4 bg-opacity-50;
}

.skill-item {
  @apply px-3 py-1.5 rounded-lg bg-base-300/50 text-sm;
}

.project-card {
  @apply bg-base-200 rounded-xl overflow-hidden;
}

.project-image {
  @apply w-full h-48 object-cover;
}

.project-content {
  @apply p-4;
}

.project-title {
  @apply text-xl font-bold mb-2;
}

.project-description {
  @apply text-base-content/70 text-sm mb-4;
}

.tech-tag {
  @apply inline-block px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs mr-2 mb-2;
}

.project-links {
  @apply flex gap-4 mt-4;
}

.project-link {
  @apply text-primary/80 hover:text-primary text-sm flex items-center gap-1;
}

.contact-card {
  @apply bg-base-200/50 rounded-xl p-6;
}

.contact-link {
  @apply flex items-center gap-3 text-base-content/80 hover:text-primary transition-colors duration-300;
}

.bounce-arrow {
  @apply absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce text-primary;
}

.year {
  @apply font-mono text-primary text-lg w-full text-center mb-2;
}

// Add new animation styles
.fade-in-section {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  will-change: opacity, transform;

  &.fade-in {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-container {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  will-change: opacity, transform;

  &.fade-in {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>