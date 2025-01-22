# App.vue
<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  UserIcon,
  BriefcaseIcon,
  CommandLineIcon,
  ChevronDoubleDownIcon,
  RocketLaunchIcon,
  BookOpenIcon,
} from '@heroicons/vue/24/outline'

const { t } = useI18n()
const currentSection = ref(0)
const isScrolling = ref(false)
const contentHeight = ref(0)

const sections = [
  {
    id: 'hero',
    title: 'Şehit Şamil Gökmen',
    subtitle: 'Frontend Developer',
    description: 'who believes in the power of clean code and thoughtful design',
    icon: CommandLineIcon
  },
  {
    id: 'about',
    title: 'About Me',
    description: t('biography.sections[0]'),
    icon: UserIcon
  },
  {
    id: 'experience',
    title: 'Experience',
    description: 'Currently working at Sensity AI, focusing on frontend development and modern web technologies.',
    icon: BriefcaseIcon
  },
  {
    id: 'showcase',
    title: 'My Work',
    description: 'A showcase of my recent projects and achievements',
    icon: CommandLineIcon
  },
  {
    id: 'showcase-parallax',
    title: 'Parallax View',
    description: 'Multi-layered project presentation',
    icon: CommandLineIcon
  },
  {
    id: 'showcase-grid',
    title: 'Perspective Grid',
    description: 'Projects in 3D space',
    icon: CommandLineIcon
  },
  {
    id: 'showcase-curtain',
    title: 'Dramatic Reveal',
    description: 'Theatrical project presentation',
    icon: CommandLineIcon
  },
  {
    id: 'terminal',
    title: 'Code is Poetry',
    description: '> Every line of code tells a story_',
    icon: CommandLineIcon
  }
]

const handleScroll = (e) => {
  e.stopPropagation()
  e.preventDefault()

  if (isScrolling.value) return

  const direction = e.deltaY > 0 ? 1 : -1

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

onMounted(() => {
  updateHeight()
  window.addEventListener('resize', updateHeight)
  window.addEventListener('wheel', handleScroll, { passive: false })
})

onUnmounted(() => {
  window.removeEventListener('resize', updateHeight)
  window.removeEventListener('wheel', handleScroll)
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
  description: getTransitionClasses(0),
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
  button: getTransitionClasses(2, { showScale: true })
}))

const showcaseClasses = computed(() => ({
  container: {
    'scale-100': !isInView(3),
    'scale-75': isInView(3)
  },
  image: {
    'scale-125 blur-sm': !isInView(3),
    'scale-100 blur-0': isInView(3)
  },
  overlay: {
    'opacity-100': !isInView(3),
    'opacity-0': isInView(3)
  },
  content: getTransitionClasses(3)
}))

const terminalClasses = computed(() => ({
  container: {
    'scale-100': !isInView(7),
    'scale-50 !bg-opacity-95': isInView(7)
  },
  content: getTransitionClasses(7)
}))

const getTypingClasses = (delay) => ({
  'typing-animation': isInView(7),
  'opacity-0': !isInView(7),
  'opacity-100': isInView(7),
  'transition-delay': `${delay}s`
})
</script>

<template>
  <!-- Dots navigation -->
  <div class="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
    <div class="flex flex-col gap-4">
      <button
        v-for="(section, index) in sections"
        :key="section.id"
        @click="scrollToSection(index)"
        class="w-3 h-3 rounded-full transition-all duration-300"
        :class="[
          currentSection === index
            ? 'bg-primary scale-125'
            : 'bg-base-content/30 hover:bg-base-content/50'
        ]"
      />
    </div>
  </div>

  <!-- Main scroll container -->
  <div class="overflow-hidden relative" :style="{ height: contentHeight + 'px' }">
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
          <div class="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent"></div>
        </div>

        <div class="hero-blueprint"></div>

        <div class="hero-container">
          <CommandLineIcon class="hero-icon"
            :class="heroClasses.icon" />

          <h1 class="hero-title" :class="heroClasses.title">
            {{ sections[0].title }}
          </h1>

          <h2 class="hero-subtitle" :class="heroClasses.subtitle">
            {{ sections[0].subtitle }}
          </h2>

          <p class="hero-description" :class="heroClasses.description">
            {{ sections[0].description }}
          </p>
        </div>

        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDoubleDownIcon class="h-6 w-6 text-primary" />
        </div>
      </div>

      <!-- About Section -->
      <div class="section-about" :style="{ height: contentHeight + 'px' }">
        <div class="content-container">
          <!-- Header -->
          <div class="flex items-center gap-4 mb-12">
            <UserIcon class="section-icon" :class="aboutClasses.icon" />
            <h2 class="section-title !mb-0" :class="aboutClasses.title">
              {{ sections[1].title }}
            </h2>
          </div>

          <!-- Photo and Content -->
          <div class="relative">
            <!-- Polaroid Photo -->
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

            <!-- Biography Paragraphs -->
            <div class="biography-content">
              <div class="biography-item text-left" :class="getTransitionClasses(1, { delay: 0.3 })">
                <RocketLaunchIcon class="biography-icon" />
                <p class="biography-text">{{ $tm('biography.sections')[0] }}</p>
              </div>

              <!-- First arrow with hover tilt -->
              <img
                src="@/assets/icons/curve-arrow.svg"
                class="curved-arrow left-arrow"
                :class="[
                  getTransitionClasses(1, { delay: 0.6 }),
                  { 'opacity-60 hover:opacity-100': isInView(1) }
                ]"
                alt="curve arrow"
              />

              <div class="biography-item text-right ml-auto" :class="getTransitionClasses(1, { delay: 0.9 })">
                <BriefcaseIcon class="biography-icon" />
                <p class="biography-text">{{ $tm('biography.sections')[1] }}</p>
              </div>

              <!-- Second arrow with hover tilt -->
              <img
                src="@/assets/icons/curve-arrow.svg"
                class="curved-arrow right-arrow"
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
          </div>
        </div>
      </div>

      <!-- Experience Section -->
      <div class="section-experience" :style="{ height: contentHeight + 'px' }">
        <div class="content-container flex-container-reverse">
          <div class="section-image-container" :class="experienceClasses.image">
            <div class="section-gradient-reverse"></div>
          </div>

          <div class="section-half">
            <BriefcaseIcon class="section-icon"
                          :class="experienceClasses.icon" />

            <h2 class="section-title" :class="experienceClasses.title">
              {{ sections[2].title }}
            </h2>

            <p class="section-description" :class="experienceClasses.description">
              {{ sections[2].description }}
            </p>

            <div class="base-transition delay-500 transform" :class="experienceClasses.button">
              <router-link to="/cv" class="btn btn-outline btn-lg group relative overflow-hidden">
                <span class="relative z-10">See Full Experience</span>
                <div class="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Showcase Section -->
      <div class="section-showcase" :style="{ height: contentHeight + 'px' }">
        <div class="showcase-container" :class="showcaseClasses.container">
          <img src="https://picsum.photos/1920/1080"
               alt="Showcase"
               class="showcase-image"
               :class="showcaseClasses.image" />
          <div class="showcase-overlay" :class="showcaseClasses.overlay"></div>
        </div>

        <div class="showcase-content" :class="showcaseClasses.content">
          <h2 class="section-title-light">{{ sections[3].title }}</h2>
          <p class="section-description-light">{{ sections[3].description }}</p>
        </div>
      </div>

      <!-- Parallax Section -->
      <div class="section-parallax" :style="{ height: contentHeight + 'px' }">
        <div class="showcase-container"
             :style="{ transform: `translateY(${isInView(4) ? '0' : '100px'}) scale(${isInView(4) ? '1' : '1.5'})` }">
          <img src="https://picsum.photos/1920/1080?1"
               alt="Background"
               class="showcase-image opacity-50" />
        </div>
        <div class="showcase-container delay-200"
             :style="{ transform: `translateY(${isInView(4) ? '0' : '50px'}) scale(${isInView(4) ? '1' : '1.2'})` }">
          <img src="https://picsum.photos/1920/1080?2"
               alt="Middle"
               class="showcase-image opacity-70" />
        </div>
        <div class="showcase-content delay-400"
             :style="{ transform: `translateY(${isInView(4) ? '0' : '25px'})` }">
          <h2 class="section-title-light">{{ sections[4].title }}</h2>
          <p class="section-description-light">{{ sections[4].description }}</p>
        </div>
      </div>

      <!-- Grid Section -->
      <div class="section-grid" :style="{ height: contentHeight + 'px' }">
        <div class="grid-container">
          <div class="grid-layout" :class="{ 'rotate-x-45': isInView(5) }">
            <div v-for="i in 6" :key="i"
                 class="grid-item"
                 :style="{ transitionDelay: `${i * 100}ms` }"
                 :class="{ 'translate-y-0 opacity-100': isInView(5), 'translate-y-20 opacity-0': !isInView(5) }">
              <img :src="`https://picsum.photos/400/400?${i}`"
                   :alt="`Project ${i}`"
                   class="showcase-image rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      <!-- Curtain Section -->
      <div class="section-curtain" :style="{ height: contentHeight + 'px' }">
        <div class="curtain-left" :class="{ '-translate-x-full': isInView(6) }"></div>
        <div class="curtain-right" :class="{ 'translate-x-full': isInView(6) }"></div>
        <div class="showcase-content">
          <img src="https://picsum.photos/1920/1080?3"
               alt="Revealed Content"
               class="showcase-image rounded-lg shadow-2xl delay-500"
               :class="{ 'scale-100 opacity-100': isInView(6), 'scale-90 opacity-0': !isInView(6) }" />
        </div>
      </div>

      <!-- Terminal Section -->
      <div class="section-terminal" :style="{ height: contentHeight + 'px' }">
        <div class="terminal-container" :class="terminalClasses.container">
          <div class="terminal-content" :class="terminalClasses.content">
            <div class="terminal-header">
              <div class="terminal-buttons">
                <span class="terminal-button close"></span>
                <span class="terminal-button minimize"></span>
                <span class="terminal-button maximize"></span>
              </div>
              <div class="terminal-title">ssamilg@dev ~ </div>
            </div>
            <div class="terminal-body">
              <div class="typing-container">
                <div v-for="(line, index) in terminalLines"
                     :key="index"
                     class="typing-line"
                     :class="getTypingClasses(index * 2)">
                  <span :class="line.prefix.class">{{ line.prefix.text }}</span>
                  {{ line.content }}
                </div>
              </div>
            </div>
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
      background-image:
        linear-gradient(var(--blueprint-color) 1.5px, transparent 1.5px),
        linear-gradient(90deg, var(--blueprint-color) 1.5px, transparent 1.5px),
        linear-gradient(var(--blueprint-color) 0.75px, transparent 0.75px),
        linear-gradient(90deg, var(--blueprint-color) 0.75px, transparent 0.75px);
      background-size: 50px 50px, 50px 50px, 10px 10px, 10px 10px;
      background-position: -1.5px -1.5px, -1.5px -1.5px, -0.75px -0.75px, -0.75px -0.75px;
      --blueprint-color: theme('colors.primary');
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

  &-showcase {
    @apply section-base bg-base-100;
  }

  &-parallax {
    @apply section-base bg-base-200;
  }

  &-grid {
    @apply section-base bg-gradient-to-t from-base-200 to-base-100;
  }

  &-curtain {
    @apply section-base bg-base-100;
  }

  &-terminal {
    @apply section-base bg-base-200;
  }

  &-title {
    @apply text-5xl font-bold mb-6 transition-all duration-1000;

    &-light {
      @apply text-5xl font-bold mb-6 text-white;
    }
  }

  &-description {
    @apply text-xl text-base-content/70 leading-relaxed transition-all duration-1000;

    &-light {
      @apply text-xl text-white/70;
    }
  }

  &-icon {
    @apply h-12 w-12 mb-6 text-primary transition-all duration-1000 transform;
  }

  &-half {
    @apply md:w-1/2 space-y-6;
  }

  &-gradient {
    @apply absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-lg;

    &-reverse {
      @apply absolute inset-0 bg-gradient-to-bl from-primary/20 to-transparent rounded-lg;
    }
  }

  &-image-container {
    @apply md:w-1/2 relative h-96 transition-all duration-1000 transform;
  }
}

/* Container styles */
.content-container {
  @apply w-4/5 mx-auto px-4;
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
    @apply max-w-4xl mx-auto px-4 text-center z-20;
  }

  &-icon {
    @apply h-16 w-16 mx-auto mb-6 text-primary transition-all duration-1000 transform;
  }

  &-title {
    @apply text-7xl font-bold mb-4 tracking-tight transition-all duration-1000 transform;
  }

  &-subtitle {
    @apply text-3xl text-primary mb-4 font-light transition-all duration-1000 transform;
  }

  &-description {
    @apply text-xl text-base-content/70 max-w-2xl mx-auto transition-all duration-1000 transform;
  }

  &-gradient {
    @apply absolute inset-0 opacity-20 transition-opacity duration-1000 z-10;
  }

  &-blueprint {
    display: none;
  }
}

/* Showcase styles */
.showcase {
  &-container {
    @apply absolute inset-0 transition-all duration-1000;
  }

  &-image {
    @apply w-full h-full object-cover transition-all duration-1000;
  }

  &-overlay {
    @apply absolute inset-0 bg-base-100/50 transition-opacity duration-1000;
  }

  &-content {
    @apply relative z-10 max-w-5xl mx-auto px-4 text-center transition-all duration-1000 transform;
  }
}

/* Grid styles */
.grid {
  &-container {
    @apply relative perspective-1000 w-full max-w-5xl mx-auto px-4;
  }

  &-layout {
    @apply grid grid-cols-3 gap-8 transition-all duration-1000;
  }

  &-item {
    @apply aspect-square bg-base-200 rounded-lg shadow-xl transition-all duration-1000;
  }
}

/* Curtain styles */
.curtain {
  &-left {
    @apply absolute inset-y-0 left-0 w-1/2 bg-primary transition-transform duration-1000;
  }

  &-right {
    @apply absolute inset-y-0 right-0 w-1/2 bg-primary transition-transform duration-1000;
  }
}

/* Terminal styles */
.terminal {
  &-container {
    @apply absolute inset-0 bg-black transition-all duration-1000;
  }

  &-content {
    @apply relative bg-black/95 rounded-lg overflow-hidden transition-all duration-1000 h-full w-full;
    box-shadow: 0 0 30px rgba(0, 255, 0, 0.1);
  }

  &-header {
    @apply flex items-center px-4 py-4 bg-zinc-800 border-b border-zinc-700;
  }

  &-buttons {
    @apply flex gap-2;
  }

  &-button {
    @apply w-6 h-6 rounded-full;

    &.close {
      @apply bg-red-500;
    }

    &.minimize {
      @apply bg-yellow-500;
    }

    &.maximize {
      @apply bg-green-500;
    }
  }

  &-title {
    @apply text-zinc-400 text-3xl ml-4;
  }

  &-body {
    @apply p-8 font-mono text-3xl leading-relaxed;
  }
}

/* Typing animation styles */
.typing {
  &-container {
    @apply space-y-4;
  }

  &-line {
    @apply text-zinc-300;
    transition: opacity 0.5s ease;
  }

  &-animation {
    animation: typing 1.5s steps(30, end) forwards;
    animation-delay: var(--typing-delay);
  }
}

/* Utility classes */
.base-transition {
  @apply transition-all duration-1000;
}

.perspective-1000 {
  perspective: 1000px;
}

.rotate-x-45 {
  transform: rotateX(45deg);
}

/* Animations */
@keyframes typing {
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}

/* Polaroid styles */
.polaroid-container {
  @apply absolute -right-16 top-4 z-10 transition-all duration-500;
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
  @apply max-w-2xl space-y-10 pt-4 relative;
}

.biography-item {
  @apply flex items-start gap-4 transition-all duration-1000;
  max-width: 85%;

  &.text-right {
    @apply flex-row-reverse;
  }
}

.biography-icon {
  @apply w-8 h-8 flex-shrink-0 text-primary mt-1;
}

.biography-text {
  @apply text-lg text-base-content/80 leading-relaxed;
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

/* Add these styles to your existing SCSS */
.curved-arrow {
  @apply absolute w-24 transition-all duration-300;

  &.left-arrow {
    @apply -left-4 top-[15%] scale-y-[-1] rotate-[15deg];
    transform-origin: center;

    &:hover {
      @apply rotate-[22deg] scale-y-[-1] scale-105;
    }
  }

  &.right-arrow {
    @apply -right-4 top-[50%] rotate-[160deg];
    transform-origin: center;

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
</style>

<style>
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500&display=swap');

:root {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>
