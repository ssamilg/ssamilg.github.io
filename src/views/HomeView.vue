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
const currentSection = ref(0)
const isScrolling = ref(false)
const contentHeight = ref(0)
const lastWheelTime = ref(0)
const wheelThreshold = 5 // Minimum delta required to trigger scroll
const wheelCooldown = 1000 // Time in ms before accepting next wheel event
const touchStartY = ref(0)
const touchEndY = ref(0)
const touchThreshold = 50 // Minimum swipe distance to trigger section change

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
];

const projects = [
  {
    id: 'featured',
    title: t('projects.featured.iftar_timer.title'),
    description: t('projects.featured.iftar_timer.description'),
    image: new URL('@/assets/images/iftar-timer.png', import.meta.url),
    technologies: ['Vue.js', 'Tailwind'],
    liveUrl: 'https://iftartime.netlify.app/',
    sourceUrl: 'https://github.com/ssamilg/iftar-time-app',
  },
  {
    id: 'weather-forecast-demo',
    title: t('projects.featured.weather_forecast.title'),
    description: t('projects.featured.weather_forecast.description'),
    image: new URL('@/assets/images/weather-forecast.png', import.meta.url),
    technologies: ['Vue', 'Vuetify'],
    liveUrl: 'https://ssg-weather-app.netlify.app/',
    sourceUrl: 'https://github.com/ssamilg/weather-forecast-app'
  },
  {
    id: 'meme-generator-demo',
    title: t('projects.featured.meme_generator.title'),
    description: t('projects.featured.meme_generator.description'),
    image: new URL('@/assets/images/meme-generator.png', import.meta.url),
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
  },
];

const contactInfo = {
  email: 's.samilgokmen@gmail.com',
  github: 'github.com/ssamilg',
  twitter: 'twitter.com/ssamilg',
  linkedin: 'linkedin.com/in/ssamilg',
  location: 'Ankara, Türkiye',
  timezone: 'UTC+3'
}

const descriptions = computed(() => tm('header.descriptions'))

const currentDescriptionIndex = ref(0)
const isDescriptionChanging = ref(false)

const rotateDescription = () => {
  isDescriptionChanging.value = true
  setTimeout(() => {
    currentDescriptionIndex.value = (currentDescriptionIndex.value + 1) % descriptions.value.length
    isDescriptionChanging.value = false
  }, 500) // Half of the transition duration
}

let descriptionInterval

const handleScroll = (e) => {
  e.stopPropagation()
  e.preventDefault()

  if (isScrolling.value) return

  const now = Date.now()
  if (now - lastWheelTime.value < wheelCooldown) return

  // Only trigger if wheel delta exceeds threshold
  if (Math.abs(e.deltaY) < wheelThreshold) return

  const direction = e.deltaY > 0 ? 1 : -1
  lastWheelTime.value = now

  if (direction > 0 && currentSection.value < sections.length - 1) {
    isScrolling.value = true
    scrollToSection(currentSection.value + 1)
  } else if (direction < 0 && currentSection.value > 0) {
    isScrolling.value = true
    scrollToSection(currentSection.value - 1)
  }
}

const handleTransitionEnd = (e) => {
  if (e.propertyName === "transform") {
    isScrolling.value = false
  }
}

const scrollToSection = (index) => {
  currentSection.value = index
}

const isInView = (index) => currentSection.value === index

const updateHeight = () => {
  contentHeight.value = window.innerHeight - 64
}

const handleTouchStart = (e) => {
  touchStartY.value = e.touches[0].clientY
}

const handleTouchMove = (e) => {
  e.preventDefault() // Prevent default scrolling
}

const handleTouchEnd = (e) => {
  if (isScrolling.value) return

  touchEndY.value = e.changedTouches[0].clientY
  const swipeDistance = touchStartY.value - touchEndY.value

  if (Math.abs(swipeDistance) < touchThreshold) return

  const now = Date.now()
  if (now - lastWheelTime.value < wheelCooldown) return

  lastWheelTime.value = now

  if (swipeDistance > 0 && currentSection.value < sections.length - 1) {
    isScrolling.value = true
    scrollToSection(currentSection.value + 1)
  } else if (swipeDistance < 0 && currentSection.value > 0) {
    isScrolling.value = true
    scrollToSection(currentSection.value - 1)
  }
}

onMounted(() => {
  updateHeight()
  window.addEventListener('resize', updateHeight)
  window.addEventListener('wheel', handleScroll, { passive: false })
  window.addEventListener('touchstart', handleTouchStart, { passive: false })
  window.addEventListener('touchmove', handleTouchMove, { passive: false })
  window.addEventListener('touchend', handleTouchEnd, { passive: false })
  descriptionInterval = setInterval(rotateDescription, 5000)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateHeight)
  window.removeEventListener('wheel', handleScroll)
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchmove', handleTouchMove)
  window.removeEventListener('touchend', handleTouchEnd)
  clearInterval(descriptionInterval)
})

// Generic transition classes
const getTransitionClasses = (index, {
  delay = 0,
  showTransform = true,
  direction = 'y',
  amount = 8,
  includeOpacity = true,
  includeRotate = false,
  rotateAmount = 12,
  showScale = false,
  scaleAmount = 100,
  reverse = false
} = {}) => {
  const isVisible = isInView(index)
  const transform = []

  if (showTransform) {
    const translateDir = reverse ? -amount : amount
    transform.push(`translate-${direction}-${isVisible ? '0' : translateDir}`)
  }

  if (includeRotate) {
    const rotateDir = reverse ? -rotateAmount : rotateAmount
    transform.push(`${isVisible ? 'rotate-0' : `rotate-${rotateDir}`}`)
  }

  if (showScale) {
    transform.push(`scale-${isVisible ? scaleAmount : '95'}`)
  }

    return {
    [transform.join(' ')]: !isVisible,
    'opacity-100': isVisible,
    'opacity-0': !isVisible,
    'transition-delay': delay ? `${delay}s` : undefined,
    'show': isVisible
  }
}

// Computed properties for section-specific classes
const heroClasses = computed(() => ({
  title: getTransitionClasses(0, { direction: 'x', reverse: true }),
  subtitle: getTransitionClasses(0, { direction: 'x' }),
  // description: getTransitionClasses(0, { disableOpacity: true }),
  icon: getTransitionClasses(0, { includeRotate: true, reverse: true }),
  gradient: {
    'opacity-20': isInView(0),
    'opacity-0': !isInView(0)
  }
}))

const aboutClasses = computed(() => ({
  title: getTransitionClasses(1, { reverse: true }),
  description: getTransitionClasses(1, { direction: 'x', reverse: true }),
  icon: getTransitionClasses(1, { direction: 'x', includeRotate: true, reverse: true }),
  photo: getTransitionClasses(1, { direction: 'x', showScale: true })
}))

const experienceClasses = computed(() => ({
  title: getTransitionClasses(2),
  description: getTransitionClasses(2, { direction: 'x' }),
  icon: getTransitionClasses(2, { direction: 'x', includeRotate: true }),
  image: getTransitionClasses(2, { direction: 'x', showScale: true, reverse: true }),
  button: getTransitionClasses(2, { showScale: true }),
  card: getTransitionClasses(2, { direction: 'x', showScale: true, reverse: true }),
}))

const experienceCardBackground = (index) => {
  let bgClass = 'bg-primary/90'

  if (index === 0) {
    bgClass = 'bg-primary/90'
  } else if (index === 1) {
    bgClass = 'bg-primary/45'
  } else if (index === 2) {
    bgClass = 'bg-primary/10'
  }

  return bgClass
}

const skillsClasses = computed(() => ({
  title: getTransitionClasses(3, { delay: 0.3 }),
  description: getTransitionClasses(3, { delay: 0.5 }),
  categories: getTransitionClasses(3, { delay: 0.7 })
}))

const currentSkillSectionIndex = ref(0)
const switchSkillSection = (index) => {
  currentSkillSectionIndex.value = index
}

const currentSkillSection = computed(() => skillSections[currentSkillSectionIndex.value])
</script>

<template>
  <!-- Dots navigation -->
  <div class="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
    <div class="flex flex-col gap-4">
      <button
        v-for="(section, index) in sections"
        :key="section.id"
        @click="scrollToSection(index)"
        class="group relative w-3 h-3 2xl:w-5 2xl:h-5 transition-all duration-300"
      >
        <div class="w-3 h-3 2xl:w-5 2xl:h-5 rounded-full transition-all duration-300"
             :class="[
               currentSection === index
                 ? 'bg-primary scale-125'
                 : 'bg-base-content/30 group-hover:bg-base-content/50'
             ]"
        />
        <!-- Tooltip -->
        <div class="absolute right-full top-1/2 -translate-y-1/2 mr-4 px-3 py-1.5 rounded-lg bg-base-300/80 backdrop-blur-sm
                    text-sm font-medium text-base-content whitespace-nowrap opacity-0 -translate-x-2
                    transition-all duration-300 pointer-events-none
                    group-hover:opacity-100 group-hover:translate-x-0 2xl:text-3xl">
          {{ section.title }}
          <div class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-base-300/80" />
        </div>
      </button>
    </div>
  </div>

  <!-- Main scroll container -->
  <div class="overflow-hidden relative touch-pan-y" :style="{ height: contentHeight + 'px' }">
    <div
      @transitionend="handleTransitionEnd"
      :style="{
           transform: `translateY(-${currentSection * contentHeight}px)`,
           transition: 'transform 1s ease'
      }"
    >
      <!-- Hero Section -->
      <div class="section-hero" :style="{ height: contentHeight + 'px' }">
        <div class="hero-gradient" :class="heroClasses.gradient">
          <div class="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        </div>

        <div class="hero-blueprint"></div>

        <div class="hero-container">
          <CommandLineIcon class="hero-icon" :class="heroClasses.icon" />

          <h1 class="hero-title" :class="heroClasses.title">
            {{ sections[0].title }}
          </h1>

          <h2 class="hero-subtitle" :class="heroClasses.subtitle">
            {{ t('header.subtitle') }}
          </h2>

          <p class="hero-description"
            :class="[
              heroClasses.description,
              {
                'opacity-0 -translate-y-4': isDescriptionChanging,
                'opacity-100 translate-y-0': !isDescriptionChanging
              }
            ]"
          >
            {{ descriptions[currentDescriptionIndex] }}
          </p>
        </div>

        <div class="bounce-arrow">
          <ChevronDoubleDownIcon class="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        </div>
      </div>

      <!-- About Section -->
      <div class="section-about" :style="{ height: contentHeight + 'px' }">
        <div class="content-container flex justify-center">
          <div class="basis-full 2xl:basis-1/2">
            <!-- Header -->
            <div class="flex items-center gap-4 md:mb-12">
              <UserIcon class="section-icon" :class="aboutClasses.icon" />
              <h2 class="section-title !mb-0" :class="aboutClasses.title">
                {{ sections[1].title }}
              </h2>
            </div>

            <!-- Photo and Content -->
            <div class="flex">
              <!-- Biography Paragraphs -->
              <div class="biography-content">
                <div class="biography-item text-left" :class="getTransitionClasses(1, { delay: 0.3 })">
                  <RocketLaunchIcon class="biography-icon" />
                  <p class="biography-text">{{ $tm('biography.sections')[0] }}</p>
                </div>

                <!-- First arrow with hover tilt -->
                <img
                  src="@/assets/icons/curve-arrow.svg"
                  class="curved-arrow left-arrow hidden md:block"
                  :class="[
                    getTransitionClasses(1, { delay: 0.6 }),
                    { 'opacity-60 hover:opacity-100': isInView(1) }
                  ]"
                  alt="curve arrow"
                />

                <div class="biography-item md:text-right md:ml-auto md:flex-row-reverse" :class="getTransitionClasses(1, { delay: 0.9 })">
                  <BriefcaseIcon class="biography-icon" />
                  <p class="biography-text">{{ $tm('biography.sections')[1] }}</p>
                </div>

                <!-- Second arrow with hover tilt -->
                <img
                  src="@/assets/icons/curve-arrow.svg"
                  class="curved-arrow right-arrow hidden md:block"
                  :class="[
                    getTransitionClasses(1, { delay: 1.2 }),
                    { 'opacity-60 hover:opacity-100': isInView(1) }
                  ]"
                  alt="curve arrow"
                />

                <div class="biography-item text-left" :class="getTransitionClasses(1, { delay: 1.5 })">
                  <BookOpenIcon class="biography-icon" />
                  <p class="biography-text">{{ $tm('biography.sections')[2] }}</p>
                </div>
              </div>

              <!-- Polaroid Photo -->
              <div class="hidden md:block relative">
                <div class="polaroid-container" :class="aboutClasses.photo">
                  <div class="polaroid">
                    <div class="photo-wrapper">
                      <img src="@/assets/images/ssg1.jpeg" alt="ssg_about" class="photo">
                    </div>
                    <div class="photo-caption">Efes, 2023</div>
                    <div class="photo-pin">
                      <div class="pin-head"></div>
                      <div class="pin-leg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Experience Section -->
      <div class="section-experience" :style="{ height: contentHeight + 'px' }">
        <div class="content-container">
          <div class="experience-container">
              <div class="flex md:hidden 2xl:flex items-center gap-4 mb-4">
                <BriefcaseIcon class="section-icon" :class="experienceClasses.icon" />
                <h2 class="section-title !mb-0" :class="experienceClasses.title">
                  {{ sections[2].title }}
                </h2>
              </div>
            <div
              v-for="(item, index) in experienceItems"
              :key="item.id"
              class="experience-item"
              :class="[
                experienceClasses.card,
                {
                  'translate-x-full opacity-0': !isInView(2),
                  'translate-x-0 opacity-100': isInView(2),
                  'ml-0 md:ml-[20%]': index === 1,
                  'ml-0 md:ml-[40%]': index === 2,
                },
              ]"
              :style="{
                transitionDelay: `${0.2 * index}s`
              }"
            >
              <div class="year">{{ $t(item.period) }}</div>
              <div class="experience-card" :class="experienceCardBackground(index)">
                <div class="flex flex-wrap">
                  <h2 class="card-role mr-4 md:mr-0">{{ $t(item.role) }}</h2>
                  <h3 class="card-company">{{ $t(item.name) }}</h3>
                  <p class="card-description">{{ $t(item.description) }}</p>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between 2xl:justify-end">
              <div class="hidden md:flex 2xl:hidden items-center gap-4">
                <BriefcaseIcon class="section-icon" :class="experienceClasses.icon" />
                <h2 class="section-title !mb-0" :class="experienceClasses.title">
                  {{ sections[2].title }}
                </h2>
              </div>

              <router-link
                to="/cv"
                class=" w-full justify-center md:w-auto text-center relative z-2 px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 flex items-center gap-2 text-sm font-medium"
              >
                {{ t('experience.actions.view_full') }}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills Section -->
      <div class="section-skills" :style="{ height: contentHeight + 'px' }">
        <div class="content-container flex items-center justify-center">
          <div class="basis-full md:hidden">
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center gap-4">
                <WrenchScrewdriverIcon class="section-icon" />
                <h2 class="section-title !mb-0">
                  {{ sections[3].title }}
                </h2>
              </div>
            </div>

            <div class="flex">
              <div class="basis-full">
                <h3 :class="[currentSkillSection.color, 'text-2xl font-bold flex items-center gap-2']">
                  <CodeBracketIcon v-if="currentSkillSection.id === 'dev'" class="w-7 h-7" />
                  <WrenchIcon v-if="currentSkillSection.id === 'cicd'" class="w-7 h-7" />
                  {{ currentSkillSection.name }}
                </h3>
                <div class="skill-category"
                     :class="[currentSkillSection.background]"
                     :style="{
                       transform: isInView(3) ? 'scale(1)' : 'scale(0.95)',
                       opacity: isInView(3) ? '1' : '0',
                       transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                     }">
                  <div class="space-y-6">
                    <div v-for="(category) in currentSkillSection.categories"
                         :key="category.id"
                         class="subcategory">
                      <h4 class="text-lg font-semibold mb-4 flex items-center gap-2" :class="currentSkillSection.color">
                        <CodeBracketIcon v-if="category.id === 'coding'" class="w-5 h-5" />
                        <PaintBrushIcon v-if="category.id === 'styling'" class="w-5 h-5" />
                        <CpuChipIcon v-if="category.id === 'build-testing'" class="w-5 h-5" />
                        <ServerIcon v-if="category.id === 'vc'" class="w-5 h-5" />
                        <CircleStackIcon v-if="category.id === 'ci-cd'" class="w-5 h-5" />
                        <WrenchScrewdriverIcon v-if="category.id === 'other-tools'" class="w-5 h-5" />
                        {{ category.name }}
                      </h4>
                      <div class="flex flex-wrap gap-2">
                        <div v-for="(skill) in category.skills"
                             :key="skill.name"
                             class="skill-item inline-flex items-center">
                          <div class="flex items-center gap-2 cursor-default">
                            <VIcon v-if="skill.icon" :icon="skill.icon" height="1.5rem" class="w-5 h-5" />
                            {{ skill.name }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex">
              <div class="basis-full">
                <!-- dot navigation -->
                <div class="flex items-center justify-center gap-2 relative z-2 mt-4">
                  <div
                    v-for="(section, index) in skillSections"
                    :key="section.id"
                    class="h-3 w-3 rounded-full"
                    :class="[
                      currentSkillSectionIndex === index
                        ? 'bg-primary scale-150'
                        : 'bg-base-content/30 group-hover:bg-base-content/50'
                    ]"
                    @click="switchSkillSection(index)"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="hidden md:block basis-auto">
            <!-- Header -->
            <div class="flex items-center justify-between mb-8">
              <div class="flex items-center gap-4">
                <WrenchScrewdriverIcon class="section-icon" />
                <h2 class="section-title !mb-0">
                  {{ sections[3].title }}
                </h2>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-8 h-[80%]">
              <div
                v-for="(section) in skillSections"
                :key="section.id"
                class="space-y-4 hidden md:block"
              >
                <h3 :class="[section.color, 'text-2xl font-bold flex items-center gap-2 2xl:text-3xl']">
                  <CodeBracketIcon v-if="section.id === 'dev'" class="w-7 h-7" />
                  <WrenchIcon v-if="section.id === 'cicd'" class="w-7 h-7" />
                  {{ section.name }}
                </h3>
                <div class="skill-category"
                     :class="[section.background]"
                     :style="{
                       transform: isInView(3) ? 'scale(1)' : 'scale(0.95)',
                       opacity: isInView(3) ? '1' : '0',
                       transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                     }">
                  <div class="space-y-6">
                    <div v-for="(category) in section.categories"
                         :key="category.id"
                         class="subcategory">
                      <h4 class="text-lg font-semibold mb-4 flex items-center gap-2 2xl:text-2xl" :class="section.color">
                        <CodeBracketIcon v-if="category.id === 'coding'" class="w-5 h-5" />
                        <PaintBrushIcon v-if="category.id === 'styling'" class="w-5 h-5" />
                        <CpuChipIcon v-if="category.id === 'build-testing'" class="w-5 h-5" />
                        <ServerIcon v-if="category.id === 'vc'" class="w-5 h-5" />
                        <CircleStackIcon v-if="category.id === 'ci-cd'" class="w-5 h-5" />
                        <WrenchScrewdriverIcon v-if="category.id === 'other-tools'" class="w-5 h-5" />
                        {{ category.name }}
                      </h4>
                      <div class="flex flex-wrap gap-2">
                        <div v-for="(skill) in category.skills"
                             :key="skill.name"
                             class="skill-item inline-flex items-center">
                          <div class="flex items-center gap-2 cursor-default 2xl:text-xl">
                            <VIcon v-if="skill.icon" :icon="skill.icon" height="1.5rem" class="w-5 h-5" />
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
        </div>
      </div>

      <!-- Projects Section -->
      <div class="section-projects" :style="{ height: contentHeight + 'px' }">
        <div class="content-container flex flex-col justify-center h-full md:h-[90%]">
          <!-- Header -->
          <div class="flex items-center justify-between mb-8"
               :class="{ 'opacity-0': !isInView(4), 'opacity-100': isInView(4) }"
               style="transition: opacity 0.5s ease 0.5s"
          >
            <div class="flex items-center gap-4">
              <CommandLineIcon class="section-icon" />
              <h2 class="section-title !mb-0">
                {{ sections[4].title }}
              </h2>
            </div>
          </div>

          <!-- Project Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 h-full md:gap-8 md:h-[calc(100%-8rem)] relative perspective-1000">
            <!-- Featured Project -->
            <div
              class="md:col-span-2 md:row-span-2 transform-gpu group"
              :style="{
                transform: isInView(4) ? 'rotateX(0deg) translateY(0)' : 'rotateX(45deg) translateY(100px)',
                opacity: isInView(4) ? '1' : '0',
                transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                transformOrigin: 'center bottom'
              }"
            >
              <div class="relative h-full bg-base-200 rounded-xl overflow-hidden">
                <!-- Project Image -->
                <img
                  :src="projects[0].image"
                  :alt="projects[0].title"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                >
                <!-- Dark Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                <!-- Project Content -->
                <div class="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3
                    class="text-xl md:text-4xl font-bold text-white mb-4 transition-all duration-500"
                    :class="[isInView(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
                    style="transition-delay: 0.4s"
                  >
                    {{ projects[0].title }}
                  </h3>
                  <p
                    class="hidden md:block text-xl text-white/80 mb-6 transition-all duration-500"
                    :class="[isInView(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
                    style="transition-delay: 0.6s"
                  >
                    {{ projects[0].description }}
                  </p>

                  <!-- Tech Stack -->
                  <div
                    class="flex gap-3 mb-6 transition-all duration-500"
                    :class="[isInView(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
                    style="transition-delay: 0.8s"
                  >
                    <span
                      v-for="tech in projects[0].technologies"
                      :key="tech"
                      class="px-4 py-2 rounded-lg bg-white/10 text-white/90 text-sm backdrop-blur-sm transition-all duration-300 group-hover:bg-primary/20 group-hover:text-white"
                    >
                      {{ tech }}
                    </span>
                  </div>

                  <!-- Links -->
                  <div
                    class="flex gap-6 transition-all duration-500"
                    :class="[isInView(4) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
                    style="transition-delay: 1s"
                  >
                    <a
                      :href="projects[0].liveUrl"
                      class="text-white/70 hover:text-primary transition-all duration-300 flex items-center gap-2 group-hover:translate-x-2"
                      target="_blank"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                      {{ t('projects.actions.live_demo') }}
                    </a>
                    <a
                      :href="projects[0].sourceUrl"
                      class="text-white/70 hover:text-primary transition-all duration-300 flex items-center gap-2 group-hover:translate-x-2"
                      target="_blank"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      {{ t('projects.actions.source_code') }}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Other Projects -->
            <div
              v-for="(project, index) in projects.slice(1)"
              :key="project.id"
              class="transform-gpu group"
              :style="{
                transform: isInView(4) ? 'rotateX(0deg) translateY(0)' : 'rotateX(45deg) translateY(100px)',
                opacity: isInView(4) ? '1' : '0',
                transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: `${0.2 + (index * 0.2)}s`,
                transformOrigin: 'center bottom'
              }"
            >
              <div class="relative h-[100%] bg-base-200 rounded-xl overflow-hidden">
                <!-- Project Image -->
                <img
                  :src="project.image"
                  :alt="project.title"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                >
                <!-- Dark Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent transition-opacity duration-500 group-hover:opacity-95"/>

                <!-- Project Content -->
                <div class="absolute inset-0 p-6 flex flex-col justify-end transform transition-all duration-500">
                  <h3 class="text-xl font-bold text-white mb-3 transition-colors duration-300">{{ project.title }}</h3>

                  <!-- Tech Stack -->
                  <div class="flex gap-2 mb-4">
                    <span
                      v-for="tech in project.technologies"
                      :key="tech"
                      class="px-3 py-1 rounded-lg bg-white/10 text-white/90 text-xs backdrop-blur-sm transition-all duration-300 group-hover:bg-primary/20 group-hover:text-white"
                    >
                      {{ tech }}
                    </span>
                  </div>

                  <!-- Links -->
                  <div class="flex gap-4">
                    <a
                      :href="project.liveUrl"
                      class="text-white/70 hover:text-primary transition-all duration-300 flex items-center gap-2 text-sm group-hover:translate-x-2 cursor-pointer"
                      target="_blank"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                      {{ t('projects.actions.live_demo') }}
                    </a>
                    <a
                      :href="project.sourceUrl"
                      class="text-white/70 hover:text-primary transition-all duration-300 flex items-center gap-2 text-sm group-hover:translate-x-2 cursor-pointer"
                      target="_blank"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      {{ t('projects.actions.source_code') }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Section -->
      <div class="section-contact" :style="{ height: contentHeight + 'px' }">
        <div class="content-container">
          <div class="max-w-4xl mx-auto">
            <!-- Header -->
            <div class="flex items-center gap-4 mb-12"
                 :class="[isInView(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
                 style="transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1)">
              <EnvelopeIcon class="section-icon" />
              <h2 class="section-title !mb-0">Contact</h2>
            </div>

            <!-- Contact Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
              <!-- Left Column: Contact Info -->
              <div class="space-y-8">
                <div class="contact-card"
                     :class="[isInView(5) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8']"
                     style="transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s">
                  <h3 class="text-2xl font-bold mb-6 text-primary">{{ t('contact.actions.get_in_touch') }}</h3>
                  <div class="space-y-6">
                    <!-- Email -->
                    <a href="mailto:contact@ssamilg.dev"
                       class="contact-link group">
                      <EnvelopeIcon class="w-6 h-6" />
                      <span class="contact-text">{{ contactInfo.email }}</span>
                    </a>

                    <!-- Location -->
                    <div class="contact-link">
                      <MapPinIcon class="w-6 h-6" />
                      <span class="contact-text">{{ contactInfo.location }}</span>
                    </div>

                    <!-- Timezone -->
                    <div class="contact-link">
                      <ClockIcon class="w-6 h-6" />
                      <span class="contact-text">{{ contactInfo.timezone }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Column: Social Links -->
              <div class="space-y-8">
                <div class="contact-card"
                     :class="[isInView(5) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8']"
                     style="transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s">
                  <h3 class="text-2xl font-bold mb-6 text-primary">{{ t('contact.actions.social_links') }}</h3>
                  <div class="space-y-6">
                    <!-- GitHub -->
                    <a href="https://github.com/ssamilg"
                       target="_blank"
                       rel="noopener noreferrer"
                       class="contact-link group">
                      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span class="contact-text">{{ contactInfo.github }}</span>
                    </a>

                    <!-- LinkedIn -->
                    <a href="https://linkedin.com/in/ssamilg"
                       target="_blank"
                       rel="noopener noreferrer"
                       class="contact-link group">
                      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      <span class="contact-text">{{ contactInfo.linkedin }}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Message -->
            <p class="text-xl text-base-content/70 text-center mt-12 max-w-2xl mx-auto"
               :class="[isInView(5) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
               style="transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s">
              {{ sections[5].description }}
            </p>
            <p class="text-sm text-base-content/70 absolute bottom-2 right-[50%] translate-x-[50%]">
              {{ t('footer.copyright') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* Base section styles */
.section {
  &-base {
    @apply flex items-center justify-center relative overflow-hidden;

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

        @screen 2xl {
        --blueprint-line: 2px;
        --blueprint-small-line: 1px;
        --blueprint-size: 75px;
        --blueprint-small-size: 15px;
      }
    }
  }

  &-hero {
    @apply section-base bg-gradient-to-b from-base-100 to-base-200 relative;
  }

  &-about {
    @apply section-base bg-base-200;
  }

  &-experience {
    @apply section-base bg-gradient-to-t from-base-100 to-base-200;
  }

  &-skills {
    @apply section-base bg-gradient-to-b from-base-100 to-base-200;
  }

  &-projects {
    @apply section-base bg-gradient-to-b from-base-200 to-base-100;
  }

  &-contact {
    @apply section-base bg-base-100;
  }

  &-title {
    @apply text-5xl font-bold mb-6 transition-all duration-1000;

    &-light {
      @apply text-5xl font-bold mb-6 text-white;
    }
  }

  &-icon {
    @apply h-12 w-12 mb-6 text-primary transition-all duration-1000 transform;
  }

  &-projects {
    @apply section-base bg-base-100;
  }
}

/* Container styles */
.content-container {
  @apply w-full mx-4 md:w-4/5 md:mx-auto 2xl:w-5/6;
}

.flex-container {
  @apply flex flex-col md:flex-row items-center gap-12;

  &-reverse {
    @apply flex flex-col-reverse md:flex-row items-center gap-12;
  }
}

/* Hero styles */
.hero {
  &-container {
    @apply max-w-4xl mx-auto px-6 sm:px-4 text-center z-20;

    @screen 2xl {
      @apply max-w-6xl;
    }
  }

  &-icon {
    @apply h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 sm:mb-6 text-primary transition-all duration-1000 transform;

    @screen 2xl {
      @apply h-20 w-20 mb-8;
    }
  }

  &-title {
    @apply text-4xl sm:text-5xl md:text-7xl font-bold mb-3 sm:mb-4 tracking-tight transition-all duration-1000 transform;

    @media (max-width: 640px) {
      font-size: clamp(2rem, 8vw, 2.5rem);
      line-height: 1.2;
    }

    @screen 2xl {
      @apply text-8xl mb-6;
    }
  }

  &-subtitle {
    @apply text-xl sm:text-2xl md:text-3xl text-primary mb-3 sm:mb-4 font-light transition-all duration-1000 transform;

    @screen 2xl {
      @apply text-4xl mb-6;
    }
  }

  &-description {
    @apply text-base sm:text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto transition-all duration-500 transform px-4;

    @media (max-width: 640px) {
      font-size: clamp(0.875rem, 4vw, 1rem);
      line-height: 1.6;
    }

    @screen 2xl {
      @apply text-2xl max-w-3xl;
      line-height: 1.5;
    }
  }

  &-gradient {
    @apply absolute inset-0 opacity-20 transition-opacity duration-1000 z-10;
  }

  &-blueprint {
    display: none;
  }
}

/* Utility classes */
.base-transition {
  @apply transition-all duration-1000;
}

.perspective-1000 {
  perspective: 1000px;
}

/* Polaroid styles */
.polaroid-container {
  @apply absolute left-12 top-0 z-10 transition-all duration-500;
  transform: rotate(3deg);

  &:hover {
    transform: rotate(0deg) scale(1.02);
    .photo-wrapper {
      filter: brightness(1.1) contrast(1.1);
    }
  }
}

.polaroid {
  @apply relative bg-white p-6 shadow-xl;
  width: 360px;
  transform-origin: center;
}

.photo-wrapper {
  @apply relative overflow-hidden transition-all duration-500;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  .photo {
    @apply w-full h-full object-cover object-[center_65%];
    transform: scale(1.1);
    transform-origin: 0 150%;
  }
}

.photo-pin {
  @apply absolute left-1/2 -top-4 -translate-x-1/2;

  .pin-head {
    @apply w-4 h-4 rounded-full bg-primary shadow-lg;
  }

  .pin-leg {
    @apply w-0.5 h-4 bg-primary/50 mx-auto;
  }
}

.photo-caption {
  @apply text-center text-base-content/70;
  font-family: 'Caveat', cursive;
  font-size: 2rem;
  transform: rotate(0deg);
  color: theme('colors.primary');
}

/* Biography content styles */
.biography-content {
  @apply max-w-2xl space-y-6 md:space-y-10 pt-4 relative 2xl:max-w-5xl;
}

.biography-item {
  @apply flex items-start md:gap-4 transition-all duration-1000 max-w-[85%] 2xl:max-w-5xl;
}

.biography-icon {
  @apply mr-2 md:mr-0 w-8 h-8 flex-shrink-0 text-primary mt-1;
}

.biography-text {
  @apply text-sm md:text-lg text-base-content/80 leading-relaxed 2xl:text-2xl;
}

/* Update section styles */
.section-about {
  @apply section-base bg-base-200 py-16;
}

.section-icon {
  @apply mb-0;
}

.section-title {
  @apply text-4xl;
}

.curved-arrow {
  @apply absolute w-24 transition-all duration-300;

  &.left-arrow {
    @apply -left-4 top-[15%] scale-y-[-1] rotate-[15deg];
    transform-origin: center;

    @screen 2xl {
      @apply -left-24 top-[15%] rotate-[30deg];
    }

    &:hover {
      @apply rotate-[22deg] scale-y-[-1] scale-105;
    }
  }

  &.right-arrow {
    @apply -right-4 top-[50%] rotate-[160deg];
    transform-origin: center;

    @screen 2xl {
      @apply -right-14 top-[50%] rotate-[140deg];
    }

    &:hover {
      @apply rotate-[165deg] scale-105;
    }
  }
}

.biography-item {
  @apply opacity-0 translate-y-8;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);

  &.text-right {
    @apply translate-x-8;
  }

  &.text-left {
    @apply -translate-x-8;
  }

  &.show {
    @apply opacity-100 translate-y-0 translate-x-0;
  }
}

.experience-container {
  @apply max-w-5xl 2xl:max-w-7xl mx-auto;
}

.experience-item {
  @apply flex flex-wrap md:flex-nowrap items-start transition-all duration-700 ease-out;

  .year {
    @apply basis-full text-center md:text-left md:basis-auto text-primary font-mono md:text-lg w-44 md:pt-6 2xl:text-2xl 2xl:w-48 ;
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
  @apply basis-auto md:basis-full md:text-2xl font-bold text-primary-content 2xl:text-3xl;
}

.card-company {
  @apply basis-auto md:basis-full md:text-lg font-semibold text-primary-content/80 mb-2 2xl:text-xl;
}

.card-description {
  @apply basis-full md:basis-auto text-sm md:text-base text-primary-content/80 2xl:text-lg;
}

.section-projects {
  @apply section-base bg-base-100;
  perspective: 2000px;

  .content-container {
    @apply py-8 md:py-0;
  }

  .projects-grid {
    height: calc(100% - 8rem); // Account for header height
    @apply grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 relative;
  }
}

.skills-map {
  @apply relative;

  svg {
    @apply transition-transform duration-500;
  }
}

.skill-category {
  @apply bg-base-200/50 backdrop-blur-sm rounded-xl py-4 px-8 relative border border-base-300 opacity-0;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  transform: scale(0.95);
}

.skill-item {
  @apply px-4 py-2 rounded-lg bg-base-300/50 backdrop-blur-sm text-base-content/80 text-sm whitespace-nowrap;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    @apply bg-base-300/70 text-base-content;
    transform: scale(1.05);
    filter: brightness(1.1);
  }
}

.contact-card {
  @apply bg-base-200/50 backdrop-blur-sm rounded-xl p-8 border border-base-300;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
}

.contact-link {
  @apply flex items-center gap-4 text-base-content/80 transition-all duration-300;

  &.group:hover {
    @apply text-primary transform -translate-y-0.5;
  }
}

.contact-text {
  @apply text-lg font-medium;
}

.hero-description {
  @apply text-xl text-base-content/70 max-w-2xl mx-auto transition-all duration-500 transform;
}

.bounce-arrow {
  @apply absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce;

  svg {
    @apply h-5 w-5 sm:h-6 sm:w-6 text-primary;

    @screen 2xl {
      @apply h-8 w-8;
    }
  }

  @screen 2xl {
    @apply bottom-12;
  }
}
</style>

<style>
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500&display=swap');

:root {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>
