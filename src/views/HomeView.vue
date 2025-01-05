<script>
import { ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import html2pdf from 'html2pdf.js';
import VIcon from '@/components/common/VIcon.vue';
import VTabPanelCard from '@/components/common/VTabPanelCard.vue';
import BlogCard from '@/components/modules/blog/BlogCard.vue';
import BiographyCard from '@/components/modules/biography/BiographyCard.vue';
import ExperienceCard from '@/components/modules/experience/ExperienceCard.vue';
import MusicCard from '../components/modules/music/MusicCard.vue';

export default {
  name: 'Home',
  components: {
    VIcon,
    VTabPanelCard,
    BlogCard,
    MusicCard,
    BiographyCard,
    ExperienceCard,
  },
  setup() {
    const { locale, t } = useI18n();
    const theme = ref('ssg_dark');
    const contentRef = ref(null);

    const toggleTheme = () => {
      theme.value = theme.value === 'ssg_dark' ? 'ssg_light' : 'ssg_dark';
      document.documentElement.setAttribute('data-theme', theme.value);
      localStorage.setItem('theme', theme.value);
    };

    // Handle locale changes
    watch(locale, (newLocale) => {
      document.querySelector('html').setAttribute('lang', newLocale);
      localStorage.setItem('locale', newLocale);
    });

    const exportToPDF = async () => {
      const originalElement = contentRef.value;
      const element = originalElement.cloneNode(true);

      try {
        element.setAttribute('data-theme', 'ssg_light');

        // Remove company logo containers completely
        const companyHeaders = element.querySelectorAll('.experience-item .flex.items-center.gap-4');
        companyHeaders.forEach(header => {
          // Remove avatar div
          const avatar = header.querySelector('.avatar');
          if (avatar) {
            avatar.remove();
          }

          // Remove gap class from header since we don't need it anymore
          header.classList.remove('gap-4');
        });

        // Transform social buttons into a list
        const socialButtonsContainer = element.querySelector('.social-buttons');
        if (socialButtonsContainer) {
          const socialList = document.createElement('div');
          socialList.className = 'flex flex-col gap-2 mt-4';

          const socialButtons = socialButtonsContainer.querySelectorAll('.btn');
          socialButtons.forEach(btn => {
            const listItem = document.createElement('div');
            listItem.className = 'flex items-center gap-2 text-primary';

            const icon = btn.querySelector('img');
            if (icon) {
              const iconClone = icon.cloneNode(true);
              iconClone.style.height = '20px';
              listItem.appendChild(iconClone);
            }

            const text = document.createElement('span');
            text.textContent = btn.getAttribute('href');
            text.style.fontSize = '14px';

            listItem.appendChild(text);
            socialList.appendChild(listItem);
          });

          // Replace buttons with list
          socialButtonsContainer.innerHTML = '';
          socialButtonsContainer.appendChild(socialList);
        }

        // Remove biography section
        const bioSection = element.querySelector('.content > div:first-child');
        if (bioSection) {
          bioSection.remove();
        }

        // Remove margin from experience section after bio removal
        const experienceSection = element.querySelector('.content > div');
        if (experienceSection) {
          experienceSection.classList.remove('mt-8');
        }

        // Remove centering classes and adjust wrapper for PDF
        const contentWrapper = element.querySelector('.wrapper').parentElement.parentElement;
        contentWrapper.className = '';

        const innerWrapper = element.querySelector('.wrapper').parentElement;
        innerWrapper.className = '';

        const wrapper = element.querySelector('.wrapper');
        if (wrapper) {
          wrapper.style.paddingLeft = '0';
          wrapper.style.paddingRight = '0';
        }

        const opt = {
          margin: [10, 10],
          filename: `${t('header.title')}_CV.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            logging: false,
            imageTimeout: 0,
            removeContainer: true
          },
          jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
          }
        };

        await new Promise(resolve => setTimeout(resolve, 500));
        await html2pdf().set(opt).from(element).save();
      } catch (error) {
        console.error('PDF generation failed:', error);
        alert(t('errors.pdfGeneration'));
      }
    };

    onMounted(() => {
      // Get saved theme and locale
      const savedTheme = localStorage.getItem('theme') || 'ssg_dark';
      const savedLocale = localStorage.getItem('locale') || 'en';

      theme.value = savedTheme;
      locale.value = savedLocale;

      document.documentElement.setAttribute('data-theme', savedTheme);
      document.querySelector('html').setAttribute('lang', savedLocale);
    });

    return {
      theme,
      toggleTheme,
      locale,
      contentRef,
      exportToPDF,
      socialLinks: [
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
      ]
    };
  }
}
</script>

<template>
  <div id="home">
    <div class="flex justify-between p-4">
      <div class="flex gap-4">
        <!-- Language Switcher -->
        <select
          v-model="locale"
          class="select select-ghost select-sm"
        >
          <option value="en">English</option>
          <option value="tr">Türkçe</option>
        </select>

        <!-- PDF Export Button -->
        <button
          class="btn btn-ghost btn-sm normal-case gap-2"
          @click="exportToPDF"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          {{ $t('actions.downloadCV') }}
        </button>
      </div>

      <!-- Theme Switcher -->
      <label class="swap swap-rotate">
         <!-- this hidden checkbox controls the state -->
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
#home {
  width: 100%;

  .wrapper {
    @apply pt-8 pb-16 px-6 md:px-8;
  }
}
</style>