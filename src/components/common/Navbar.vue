<script setup>
import { ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { ArrowDownTrayIcon, CommandLineIcon, DocumentIcon } from '@heroicons/vue/24/outline';
import { useDownloadCV } from '@/composables/useDownloadCV';

const { locale, t } = useI18n();
const theme = ref('ssg_dark');
const router = useRouter();
const route = useRoute();
const { triggerDownload } = useDownloadCV();
const isMenuOpen = ref(false);

const closeMenu = () => {
  isMenuOpen.value = false;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const toggleTheme = () => {
  theme.value = theme.value === 'ssg_dark' ? 'ssg_light' : 'ssg_dark';
  document.documentElement.setAttribute('data-theme', theme.value);
  localStorage.setItem('theme', theme.value);
};

const toggleLanguage = () => {
  locale.value = locale.value === 'en' ? 'tr' : 'en';

  // Only refresh if on home page
  if (route.path === '/') {
    window.location.reload();
  }
};

const handleDownloadCV = () => {
  triggerDownload();
};

const toggleRoute = () => {
  const newRoute = route.path === '/' ? '/cv' : '/';
  router.push(newRoute);
};

// Handle locale changes
watch(locale, (newLocale) => {
  document.querySelector('html').setAttribute('lang', newLocale);
  localStorage.setItem('locale', newLocale);
});

onMounted(() => {
  // Get saved theme and locale
  const savedTheme = localStorage.getItem('theme') || 'ssg_dark';
  const savedLocale = localStorage.getItem('locale') || 'en';

  theme.value = savedTheme;
  locale.value = savedLocale;

  document.documentElement.setAttribute('data-theme', savedTheme);
  document.querySelector('html').setAttribute('lang', savedLocale);

  // Add click event listener to close menu when clicking outside
  document.addEventListener('click', (event) => {
    const dropdown = document.querySelector('.dropdown');
    const isClickInside = dropdown?.contains(event.target);

    if (!isClickInside && isMenuOpen.value) {
      closeMenu();
    }
  });
});
</script>

<template>
  <div class="navbar bg-base-200/50 backdrop-blur fixed top-0 z-50">
    <div class="navbar-start">
      <div class="dropdown lg:hidden">
        <label tabindex="0" class="btn btn-ghost" @click.stop="toggleMenu">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </label>
        <ul v-if="isMenuOpen" tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
          <li><router-link to="/" @click="closeMenu">{{ $t('routes.home') }}</router-link></li>
          <li><router-link to="/cv" @click="closeMenu">{{ $t('routes.cv') }}</router-link></li>
          <li v-if="route.path === '/cv'">
            <a @click="handleDownloadCV(); closeMenu()" class="flex items-center gap-2">
              <ArrowDownTrayIcon class="w-4 h-4" />
              {{ $t('actions.downloadCV') }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Route Switcher -->
      <div class="hidden lg:flex items-center">
        <label class="swap swap-flip flex items-center gap-1 px-2 rounded-lg hover:bg-base-300/50 transition-colors duration-300 cursor-pointer relative">
          <input
            type="checkbox"
            :checked="route.path === '/cv'"
            @change="toggleRoute"
            class="hidden"
          />

          <!-- Home State -->
          <div class="swap-off absolute inset-0 flex items-center transition-transform duration-300 ease-in-out">
            <div class="flex items-center gap-2 py-2 px-2">
              <CommandLineIcon class="w-5 h-5" />
              <span class="font-medium">{{ $t('routes.home') }}</span>
            </div>

            <span class="text-base-content/30 mx-1">/</span>

            <div class="flex items-center gap-2 py-2 px-2 opacity-40 hover:opacity-60 scale-90">
              <DocumentIcon class="w-5 h-5" />
              <span class="font-medium">{{ $t('routes.cv') }}</span>
            </div>
          </div>

          <!-- CV State -->
          <div class="swap-on absolute inset-0 flex items-center transition-transform duration-300 ease-in-out">
            <div class="flex items-center gap-2 py-2 px-2">
              <DocumentIcon class="w-5 h-5" />
              <span class="font-medium">{{ $t('routes.cv') }}</span>
            </div>

            <span class="text-base-content/30 mx-1">/</span>

            <div class="flex items-center gap-2 py-2 px-2 opacity-40 hover:opacity-60 scale-90">
              <CommandLineIcon class="w-5 h-5" />
              <span class="font-medium">{{ $t('routes.home') }}</span>
            </div>
          </div>

          <!-- Invisible element to maintain container size -->
          <div class="opacity-0 pointer-events-none flex items-center">
            <div class="flex items-center gap-2 py-2 px-2">
              <div class="w-5 h-5" />
              <span class="font-medium">{{ $t('routes.home') }}</span>
            </div>
            <span class="mx-1">/</span>
            <div class="flex items-center gap-2 py-2 px-2">
              <div class="w-5 h-5" />
              <span class="font-medium">{{ $t('routes.cv') }}</span>
            </div>
          </div>
        </label>
      </div>
    </div>

    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li v-if="route.path === '/cv'">
          <a @click="handleDownloadCV" class="flex items-center gap-2">
            <ArrowDownTrayIcon class="w-4 h-4" />
            {{ $t('actions.downloadCV') }}
          </a>
        </li>
      </ul>
    </div>

    <div class="navbar-end">
      <div class="flex gap-4">
        <!-- Language Switcher -->
        <label class="swap swap-rotate">
          <input
            type="checkbox"
            :checked="locale === 'tr'"
            @change="toggleLanguage"
          />

          <!-- EN icon -->
          <div class="swap-off w-8 h-8 flex items-center justify-center font-bold">
            EN
          </div>

          <!-- TR icon -->
          <div class="swap-on w-8 h-8 flex items-center justify-center font-bold">
            TR
          </div>
        </label>

        <!-- Theme Switcher -->
        <label class="swap swap-rotate">
          <input
            type="checkbox"
            :checked="theme === 'ssg_light'"
            @change="toggleTheme"
          />

          <!-- sun icon -->
          <svg
            class="swap-on h-8 w-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          <!-- moon icon -->
          <svg
            class="swap-off h-8 w-8 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
              d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
    </div>
  </div>
</template>