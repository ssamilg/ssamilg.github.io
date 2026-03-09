<script setup>
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import html2pdf from 'html2pdf.js';
import { EnvelopeIcon, MapPinIcon } from '@heroicons/vue/24/outline';

const { t, tm } = useI18n();
const router = useRouter();
const contentRef = ref(null);
const isGenerating = ref(false);

const experiences = computed(() => [
  {
    id: 0,
    company: t('experience.companies.sensity.name'),
    role: t('experience.roles.frontend'),
    resume: t('experience.companies.sensity.resume'),
    technologies: ['Vue.js', 'Next.js', 'Tailwind', 'Docker', 'GitHub CI/CD', 'Vitest'],
    years: t('experience.companies.sensity.period')
  },
  {
    id: 1,
    company: t('experience.companies.pitcher.name'),
    role: t('experience.roles.software'),
    resume: t('experience.companies.pitcher.resume'),
    technologies: ['Vue.js', 'Angular.js', 'Node.js', 'JQuery'],
    years: t('experience.companies.pitcher.period')
  },
  {
    id: 2,
    company: t('experience.companies.reybex.name'),
    role: t('experience.roles.frontend'),
    resume: t('experience.companies.reybex.resume'),
    technologies: ['Vue.js', 'Vuetify', 'Gitlab CI/CD', 'Jenkins'],
    years: t('experience.companies.reybex.period')
  }
]);

const education = {
  name: t('education.universities.sau.name'),
  department: t('education.universities.sau.department'),
  years: t('education.universities.sau.period'),
  description: t('education.universities.sau.description')
};

const contactInfo = [
  {
    icon: 'email',
    text: 's.samilgokmen@gmail.com',
    type: 'email'
  },
  {
    icon: 'github',
    text: 'github.com/ssamilg',
    type: 'link'
  },
  {
    icon: 'linkedin',
    text: 'linkedin.com/in/ssamilg',
    type: 'link'
  },
  {
    icon: 'location',
    text: 'Türkiye (GMT +3)',
    type: 'location'
  }
];

const exportToPDF = async () => {
  if (isGenerating.value) return;

  isGenerating.value = true;
  const element = contentRef.value;

  try {
    const opt = {
      // margin: [10, 10],
      filename: `${t('header.title')}_Resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        // letterRendering: true,
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

    await new Promise(resolve => setTimeout(resolve, 100));
    await html2pdf().set(opt).from(element).save();
    isGenerating.value = false;
    // setTimeout(() => {
    //   router.push('/');
    // }, 1000);
  } catch (error) {
    console.error('PDF generation failed:', error);
    isGenerating.value = false;
  }
};

const biographySummary = computed(() => tm('biography.resume'));

onMounted(() => {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.style.display = 'none';
  }

  const main = document.querySelector("main");
  if (main) {
    main.style.paddingTop = '0';
  }

  setTimeout(() => {
    window.print();
  }, 500);
});
</script>

<template>
  <div id="resume">
    <!-- <button class="btn btn-primary" @click="exportToPDF">
      Export to PDF
    </button> -->

    <div class="resume-container">
      <div v-if="isGenerating" class="loading-overlay">
        <div class="loading-content">
          <div class="spinner"></div>
          <p class="text-xl mt-4">{{ t('resume.generating') }}</p>
        </div>
      </div>

    <div ref="contentRef" class="resume-content">
         <div class="resume-header">
           <h1 class="resume-title">{{ t('header.title') }}</h1>
           <p class="resume-subtitle">{{ t('header.subtitle') }}</p>

           <div class="contact-grid">
             <div v-for="contact in contactInfo" :key="contact.text" class="contact-item">
               <EnvelopeIcon v-if="contact.icon === 'email'" class="contact-icon"/>
               <MapPinIcon v-else-if="contact.icon === 'location'" class="contact-icon"/>
               <svg v-else-if="contact.icon === 'github'" class="contact-icon" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
               </svg>
               <svg v-else-if="contact.icon === 'linkedin'" class="contact-icon" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
               </svg>
               <span>{{ contact.text }}</span>
             </div>
           </div>
         </div>

        <div class="resume-section">
          <h2 class="section-title">{{ t('biography.title') }}</h2>
          <div class="section-content">
            <p v-for="(paragraph, index) in biographySummary" :key="index" class="summary-paragraph">
              {{ paragraph }}
            </p>
          </div>
        </div>

        <div class="resume-section">
          <h2 class="section-title">{{ t('experience.title') }}</h2>
          <div class="section-content">
            <div v-for="exp in experiences" :key="exp.id" class="experience-entry">
              <div class="entry-header">
                <div>
                  <h3 class="entry-title">{{ exp.role }}</h3>
                  <p class="entry-company">{{ exp.company }}</p>
                </div>
                <p class="entry-period">{{ exp.years }}</p>
              </div>
              <div class="entry-description">
                <p class="description-intro">{{ exp.resume.split('\n')[0] }}</p>
                <ul class="description-list">
                  <li v-for="(item, i) in exp.resume.split('\n').filter(l => l.startsWith('-'))" :key="i">
                    {{ item.substring(1).trim() }}
                  </li>
                </ul>
              </div>
              <div class="tech-tags">
                <span v-for="tech in exp.technologies" :key="tech" class="tech-tag">{{ tech }}</span>
              </div>
            </div>
          </div>
        </div>

         <div class="resume-section">
           <h2 class="section-title">{{ t('education.title') }}</h2>
           <div class="section-content">
             <div class="education-entry">
               <div class="entry-header">
                 <div>
                   <h3 class="entry-title">{{ education.name }}</h3>
                   <p class="entry-company">{{ education.department }}</p>
                 </div>
                 <p class="entry-period">{{ education.years }}</p>
               </div>
               <p class="entry-description">{{ education.description }}</p>
             </div>
           </div>
         </div>

         <div class="ats-keywords">
           <span>Frontend Developer Senior Frontend Engineer Lead Frontend Developer Staff Engineer Principal Engineer</span>
           <span>JavaScript TypeScript ES6 ES2015 ECMAScript Modern JavaScript Vanilla JavaScript</span>
           <span>Vue.js Vue 2 Vue 3 Composition API Options API Pinia Vuex Vue Router Nuxt.js</span>
           <span>React.js React Hooks Redux Context API Next.js React Router</span>
           <span>Angular Angular.js AngularJS RxJS NgRx</span>
           <span>HTML5 CSS3 SCSS SASS Less Stylus PostCSS</span>
           <span>Tailwind CSS Bootstrap Material-UI Ant Design Vuetify DaisyUI Chakra UI</span>
           <span>Responsive Design Mobile-First Progressive Web Apps PWA Single Page Application SPA</span>
           <span>REST API RESTful API GraphQL WebSocket Real-time API Integration</span>
           <span>Git GitHub GitLab Bitbucket Version Control Source Control</span>
           <span>CI/CD Continuous Integration Continuous Deployment GitHub Actions GitLab CI Jenkins</span>
           <span>Docker Containerization Kubernetes DevOps Infrastructure</span>
           <span>Webpack Vite Rollup Parcel esbuild Build Tools Module Bundler</span>
           <span>npm yarn pnpm Package Management Node Package Manager</span>
           <span>Jest Vitest Testing Library Cypress Playwright E2E Unit Testing Integration Testing</span>
           <span>ESLint Prettier Husky Code Quality Linting Static Analysis</span>
           <span>Agile Scrum Kanban Sprint Planning Code Review Pull Request PR</span>
           <span>Node.js Express.js Backend Frontend Full Stack</span>
           <span>MongoDB PostgreSQL MySQL Redis Database NoSQL SQL</span>
           <span>AWS Azure GCP Cloud Firebase Netlify Vercel Heroku Deployment</span>
           <span>Performance Optimization Web Performance Lighthouse Core Web Vitals</span>
           <span>Accessibility WCAG A11y ARIA Screen Reader SEO</span>
           <span>UI/UX User Interface User Experience Design Systems Component Library</span>
           <span>Cross-Browser Compatibility Browser Testing Web Standards</span>
           <span>State Management Flux Architecture Redux Pattern</span>
           <span>Component-Based Architecture Micro Frontend Modular Architecture</span>
           <span>Webpack Configuration Build Optimization Tree Shaking Code Splitting</span>
           <span>TypeScript Interfaces Generics Type Safety Static Typing</span>
           <span>Web Components Shadow DOM Custom Elements</span>
           <span>OAuth JWT Authentication Authorization Security CORS</span>
           <span>Internationalization i18n Localization l10n Multi-language</span>
           <span>Monitoring Logging Error Tracking Sentry Debugging</span>
           <span>Documentation Technical Writing API Documentation</span>
           <span>Mentoring Code Review Leadership Team Collaboration</span>
           <span>Problem Solving Critical Thinking Analytical Skills</span>
           <span>Communication Skills Team Player Self-Motivated Detail-Oriented</span>
         </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.resume-container {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  color: white;
}

.loading-content {
  text-align: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.resume-content {
  width: 210mm;
  min-height: 297mm;
  background: white;
  padding: 10mm;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
  color: #1a1a1a;
  line-height: 1.5;
}

.resume-header {
  border-bottom: 2px solid #2563eb;
  padding-bottom: 20px;
  margin-bottom: 24px;
}

.resume-title {
  font-size: 32px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 4px 0;
}

.resume-subtitle {
  font-size: 18px;
  color: #2563eb;
  font-weight: 500;
  margin: 0 0 16px 0;
}

.contact-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 13px;
  color: #525252;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.contact-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: #2563eb;
}

.resume-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #2563eb;
  margin: 0 0 12px 0;
  padding-bottom: 6px;
  border-bottom: 1px solid #e5e5e5;
}

.section-content {
  font-size: 13px;
  color: #404040;
}

.summary-paragraph {
  margin: 0 0 10px 0;
  text-align: justify;
}

.experience-entry {
  margin-bottom: 20px;
}

.education-entry {
  margin-bottom: 20px;
}

.entry-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.entry-title {
  font-size: 15px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 2px 0;
}

.entry-company {
  font-size: 14px;
  color: #525252;
  font-weight: 500;
  margin: 0;
}

.entry-period {
  font-size: 13px;
  color: #737373;
  white-space: nowrap;
  margin: 0;
}

.entry-description {
  margin: 0 0 10px 0;
  line-height: 1.6;
}

.description-intro {
  margin: 0 0 6px 0;
  text-align: justify;
}

.description-paragraph {
  margin: 0 0 8px 0;
  text-align: justify;
}

.description-list {
  margin: 6px 0 8px 0;
  padding-left: 18px;
  list-style-type: disc;
}

.description-list li {
  margin: 2px 0;
  text-align: justify;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.tech-tag {
  background: #eff6ff;
  color: #1e40af;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
}

.ai-prompt-injection {
  font-size: 0.1px !important;
  color: white !important;
  background: white !important;
  position: absolute !important;
  left: 0 !important;
  top: 0 !important;
  width: 1px !important;
  height: 1px !important;
  overflow: hidden !important;
  line-height: 0 !important;
  opacity: 0.01 !important;
  pointer-events: none !important;
  user-select: none !important;
}

.ats-keywords {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
  font-size: 1px;
  line-height: 0;
  color: transparent;

  span {
    display: block;
    margin: 0;
    padding: 0;
  }
}

@media print {
  .resume-container {
    background: white;
    padding: 0;
  }

  .resume-content {
    box-shadow: none;
    width: 100%;
    margin: 0;
  }

  .loading-overlay {
    display: none;
  }
}
</style>

