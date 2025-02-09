<script setup>
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import html2pdf from 'html2pdf.js';
import VIcon from '@/components/common/VIcon.vue';
import BiographyCard from '@/components/modules/biography/BiographyCard.vue';
import ExperienceCard from '@/components/modules/experience/ExperienceCard.vue';
import EducationCard from '@/components/modules/education/EducationCard.vue';
import { useDownloadCV } from '@/composables/useDownloadCV';

const { t } = useI18n();
const contentRef = ref(null);
const { downloadCounter } = useDownloadCV();

const exportToPDF = async () => {
  const originalElement = contentRef.value;
  const element = originalElement.cloneNode(true);

  try {
    element.setAttribute('data-theme', 'ssg_pdf');

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

    // Replace social links with contact info
    const socialButtonsContainer = element.querySelector('.social-links-container');
    if (socialButtonsContainer) {
      const contactInfo = document.createElement('div');
      contactInfo.className = 'flex flex-col gap-1.5 mt-2 text-sm text-base-content/70';

      const contactDetails = [
        { text: 's.samilgokmen@gmail.com' },
        { text: 'Ankara, Türkiye' },
        { text: 'github.com/ssamilg' },
        { text: 'linkedin.com/in/ssamilg' }
      ];

      contactDetails.forEach(detail => {
        const item = document.createElement('div');
        item.textContent = detail.text;
        contactInfo.appendChild(item);
      });

      // Replace social buttons with contact info
      socialButtonsContainer.innerHTML = '';
      socialButtonsContainer.appendChild(contactInfo);
    }

    // Remove biography section
    const bioSection = element.querySelector('.biography-section');
    if (bioSection) {
      bioSection.remove();
    }

    const exportBtn = element.querySelector('.export-btn');
    if (exportBtn) {
      exportBtn.remove();
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

// Watch for download counter changes
watch(downloadCounter, async (newValue, oldValue) => {
  if (newValue > oldValue) {
    await exportToPDF();
  }
});

const socialLinks = computed(() => [
  {
    icon: 'github',
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
  },
  {
    icon: 'email',
    link: 'mailto:s.samilgokmen@gmail.com',
    title: 'Email'
  }
]);
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
                  {{ $t('header.subtitle') }}
                </p>

                <!-- Add class for targeting social buttons -->
                <div class="social-links-container">
                  <div class="social-links-grid">
                    <a
                      v-for="social in socialLinks"
                      :key="social.icon"
                      :href="social.link"
                      :title="social.title"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="social-link-item"
                    >
                      <VIcon :icon="social.icon" height="20px" class="social-icon"/>
                      <span class="social-title">{{ social.title }}</span>
                    </a>
                  </div>
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

            <div class="flex mt-8">
              <EducationCard/>
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

// PDF page break controls
.content {
  > div {
    @apply break-inside-avoid-page;
  }
}

.experience-item, .education-item {
  @apply break-inside-avoid-page mb-8;
}

.header {
  @apply break-inside-avoid-page mb-8;
}

.social-links-container {
  @apply mt-4 md:mt-2 break-inside-avoid;
}

.social-links-grid {
  @apply flex flex-wrap gap-3;
}

.social-link-item {
  @apply flex items-center gap-2 px-3 py-2 rounded-lg
         bg-base-200/50 text-base-content/70
         hover:bg-base-300 hover:text-base-content
         transition-colors duration-200;

  .social-icon {
    @apply flex-shrink-0;
  }

  .social-title {
    @apply text-sm font-medium;
  }
}
</style>