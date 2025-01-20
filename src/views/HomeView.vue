# App.vue
<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  UserIcon,
  BriefcaseIcon,
  CommandLineIcon,
  ChevronDoubleDownIcon
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
        <div class="hero-gradient" :class="{ 'opacity-20': isInView(0), 'opacity-0': !isInView(0) }">
          <div class="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent"></div>
        </div>

        <div class="hero-container">
          <CommandLineIcon class="hero-icon"
            :class="{ 'translate-y-0 opacity-100 rotate-0': isInView(0), '-translate-y-8 opacity-0 -rotate-12': !isInView(0) }" />

          <h1 class="hero-title"
              :class="{ 'translate-x-0 opacity-100': isInView(0), '-translate-x-12 opacity-0': !isInView(0) }">
            {{ sections[0].title }}
          </h1>

          <h2 class="hero-subtitle"
              :class="{ 'translate-x-0 opacity-100': isInView(0), 'translate-x-12 opacity-0': !isInView(0) }">
            {{ sections[0].subtitle }}
          </h2>

          <p class="hero-description"
             :class="{ 'translate-y-0 opacity-100': isInView(0), 'translate-y-8 opacity-0': !isInView(0) }">
            {{ sections[0].description }}
          </p>
        </div>

        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDoubleDownIcon class="h-6 w-6 text-primary" />
        </div>
      </div>

      <!-- About Section -->
      <div class="section-about" :style="{ height: contentHeight + 'px' }">
        <div class="content-container flex-container">
          <div class="section-half">
            <UserIcon class="section-icon"
                     :class="{ 'translate-x-0 opacity-100 rotate-0': isInView(1), '-translate-x-8 opacity-0 rotate-12': !isInView(1) }" />

            <h2 class="section-title"
                :class="{ 'translate-y-0 opacity-100': isInView(1), '-translate-y-8 opacity-0': !isInView(1) }">
              {{ sections[1].title }}
            </h2>

            <p class="section-description"
               :class="{ 'translate-x-0 opacity-100': isInView(1), '-translate-x-8 opacity-0': !isInView(1) }">
              {{ sections[1].description }}
            </p>
          </div>

          <div class="section-image-container"
               :class="{ 'translate-x-0 opacity-100 scale-100': isInView(1), 'translate-x-12 opacity-0 scale-95': !isInView(1) }">
            <div class="section-gradient"></div>
          </div>
        </div>
      </div>

      <!-- Experience Section -->
      <div class="section-experience" :style="{ height: contentHeight + 'px' }">
        <div class="content-container flex-container-reverse">
          <div class="section-image-container"
               :class="{ 'translate-x-0 opacity-100 scale-100': isInView(2), '-translate-x-12 opacity-0 scale-95': !isInView(2) }">
            <div class="section-gradient-reverse"></div>
          </div>

          <div class="section-half">
            <BriefcaseIcon class="section-icon"
                          :class="{ 'translate-x-0 opacity-100 rotate-0': isInView(2), 'translate-x-8 opacity-0 -rotate-12': !isInView(2) }" />

            <h2 class="section-title"
                :class="{ 'translate-y-0 opacity-100': isInView(2), 'translate-y-8 opacity-0': !isInView(2) }">
              {{ sections[2].title }}
            </h2>

            <p class="section-description"
               :class="{ 'translate-x-0 opacity-100': isInView(2), 'translate-x-8 opacity-0': !isInView(2) }">
              {{ sections[2].description }}
            </p>

            <div class="base-transition delay-500 transform"
                 :class="{ 'translate-y-0 opacity-100 scale-100': isInView(2), 'translate-y-4 opacity-0 scale-95': !isInView(2) }">
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
        <div class="showcase-container" :class="{ 'scale-100': !isInView(3), 'scale-75': isInView(3) }">
          <img src="https://picsum.photos/1920/1080"
               alt="Showcase"
               class="showcase-image"
               :class="{ 'scale-125 blur-sm': !isInView(3), 'scale-100 blur-0': isInView(3) }" />
          <div class="showcase-overlay"
               :class="{ 'opacity-100': !isInView(3), 'opacity-0': isInView(3) }"></div>
        </div>

        <div class="showcase-content"
             :class="{ 'translate-y-0 opacity-100': isInView(3), 'translate-y-8 opacity-0': !isInView(3) }">
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
        <div class="terminal-container"
             :class="{ 'scale-100': !isInView(7), 'scale-50 !bg-opacity-95': isInView(7) }">
          <div class="terminal-content"
               :class="{ 'translate-y-0 opacity-100': isInView(7), 'translate-y-8 opacity-0': !isInView(7) }">
            <div class="terminal-header">
              <div class="terminal-buttons">
                <span class="terminal-button close"></span>
                <span class="terminal-button minimize"></span>
                <span class="terminal-button maximize"></span>
              </div>
              <div class="terminal-title">ssamilg@dev ~ </div>
            </div>
            <div class="terminal-body">
              <div class="typing-text" :class="{ 'start-typing': isInView(7) }">
                <span class="text-primary">$</span> cd /home/ssamilg<br>
                <span class="text-primary">$</span> echo "Hello, World!"<br>
                <span class="text-primary">$</span> npm run dev<br>
                <span class="text-emerald-400">➜</span> Starting development server...<br>
                <span class="text-emerald-400">➜</span> Ready in 69ms<br>
                <span class="text-primary">$</span> _
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Update section styles with backgrounds */
.section-hero {
  @apply section-base bg-gradient-to-b from-base-100 to-base-200;
}

.section-about {
  @apply section-base bg-base-200;
}

.section-experience {
  @apply section-base bg-gradient-to-t from-base-100 to-base-200;
}

.section-showcase {
  @apply section-base bg-base-100;
}

.section-parallax {
  @apply section-base bg-base-200;
}

.section-grid {
  @apply section-base bg-gradient-to-t from-base-200 to-base-100;
}

.section-curtain {
  @apply section-base bg-base-100;
}

.section-terminal {
  @apply section-base bg-base-200;
}

/* Base section styles */
.section-base {
  @apply flex items-center justify-center relative overflow-hidden;
}

/* Common container styles */
.content-container {
  @apply max-w-5xl mx-auto px-4;
}

/* Common flex layouts */
.flex-container {
  @apply flex flex-col md:flex-row items-center gap-12;
}

.flex-container-reverse {
  @apply flex flex-col-reverse md:flex-row items-center gap-12;
}

/* Hero specific styles */
.hero-container {
  @apply max-w-4xl mx-auto px-4 text-center z-10;
}

.hero-icon {
  @apply h-16 w-16 mx-auto mb-6 text-primary transition-all duration-1000 transform;
}

.hero-title {
  @apply text-7xl font-bold mb-4 tracking-tight transition-all duration-1000 transform;
}

.hero-subtitle {
  @apply text-3xl text-primary mb-4 font-light transition-all duration-1000 transform;
}

.hero-description {
  @apply text-xl text-base-content/70 max-w-2xl mx-auto transition-all duration-1000 transform;
}

.hero-gradient {
  @apply absolute inset-0 opacity-20 transition-opacity duration-1000;
}

/* About & Experience section styles */
.section-half {
  @apply md:w-1/2 space-y-6;
}

.section-gradient {
  @apply absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-lg;
}

.section-gradient-reverse {
  @apply absolute inset-0 bg-gradient-to-bl from-primary/20 to-transparent rounded-lg;
}

.section-image-container {
  @apply md:w-1/2 relative h-96 transition-all duration-1000 transform;
}

/* Showcase section styles */
.showcase-container {
  @apply absolute inset-0 transition-all duration-1000;
}

.showcase-image {
  @apply w-full h-full object-cover transition-all duration-1000;
}

.showcase-overlay {
  @apply absolute inset-0 bg-base-100/50 transition-opacity duration-1000;
}

.showcase-content {
  @apply relative z-10 max-w-5xl mx-auto px-4 text-center transition-all duration-1000 transform;
}

/* Grid section styles */
.grid-container {
  @apply relative perspective-1000 w-full max-w-5xl mx-auto px-4;
}

.grid-layout {
  @apply grid grid-cols-3 gap-8 transition-all duration-1000;
}

.grid-item {
  @apply aspect-square bg-base-200 rounded-lg shadow-xl transition-all duration-1000;
}

/* Curtain section styles */
.curtain-left {
  @apply absolute inset-y-0 left-0 w-1/2 bg-primary transition-transform duration-1000;
}

.curtain-right {
  @apply absolute inset-y-0 right-0 w-1/2 bg-primary transition-transform duration-1000;
}

/* Common text styles */
.section-title {
  @apply text-5xl font-bold mb-6 transition-all duration-1000;
}

.section-description {
  @apply text-xl text-base-content/70 leading-relaxed transition-all duration-1000;
}

.section-title-light {
  @apply text-5xl font-bold mb-6 text-white;
}

.section-description-light {
  @apply text-xl text-white/70;
}

/* Common icon styles */
.section-icon {
  @apply h-12 w-12 mb-6 text-primary transition-all duration-1000 transform;
}

/* Common transition classes */
.base-transition {
  @apply transition-all duration-1000;
}

/* 3D effect styles */
.perspective-1000 {
  perspective: 1000px;
}

.rotate-x-45 {
  transform: rotateX(45deg);
}

.terminal-container {
  @apply absolute inset-0 bg-black transition-all duration-1000;
}

.terminal-content {
  @apply relative bg-black/95 rounded-lg overflow-hidden transition-all duration-1000 h-full w-full;
  box-shadow: 0 0 30px rgba(0, 255, 0, 0.1);
}

.terminal-header {
  @apply flex items-center px-4 py-4 bg-zinc-800 border-b border-zinc-700;
}

.terminal-buttons {
  @apply flex gap-2;
}

.terminal-button {
  @apply w-6 h-6 rounded-full;
}

.terminal-button.close {
  @apply bg-red-500;
}

.terminal-button.minimize {
  @apply bg-yellow-500;
}

.terminal-button.maximize {
  @apply bg-green-500;
}

.terminal-title {
  @apply text-zinc-400 text-3xl ml-4;
}

.terminal-body {
  @apply p-4 font-mono text-sm;
}

.typing-text {
  @apply text-zinc-300 leading-relaxed opacity-0 text-3xl;
}

.typing-text.start-typing {
  @apply opacity-100;
  animation: typing 2s steps(60, end);
}

@keyframes typing {
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}
</style>

<style>
/* Add at the top of the style section */
:root {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
</style>
