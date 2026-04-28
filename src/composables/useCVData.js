import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  CodeBracketIcon,
  PaintBrushIcon,
  CpuChipIcon,
  CircleStackIcon,
  WrenchScrewdriverIcon
} from '@heroicons/vue/24/outline'
import cvData from '../i18n/cv'

const SKILL_ITEMS = {
  coding: {
    categoryIcon: CodeBracketIcon,
    items: [
      { name: 'JavaScript', icon: 'js' },
      { name: 'TypeScript', icon: 'ts' },
      { name: 'Vue.js', icon: 'vuejs' },
      { name: 'React', icon: 'reactjs' },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'Node.js', icon: 'nodejs' }
    ]
  },
  styling: {
    categoryIcon: PaintBrushIcon,
    items: [
      { name: 'Tailwind', icon: 'tailwind' },
      { name: 'SCSS', icon: 'sass' },
      { name: 'Bootstrap', icon: 'bootstrap5' },
      { name: 'Vuetify', icon: 'vuetify' },
    ]
  },
  build: {
    categoryIcon: CpuChipIcon,
    items: [
      { name: 'Vite', icon: 'vite' },
      { name: 'Webpack', icon: 'webpack' },
      { name: 'Vitest', icon: 'vitest' },
      { name: 'Jest', icon: 'jest' },
    ]
  },
  deployment: {
    categoryIcon: CircleStackIcon,
    items: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub Actions', icon: 'github' },
      { name: 'GitLab', icon: 'gitlab' },
      { name: 'Jenkins', icon: 'jenkins' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Netlify', icon: 'netlify' }
    ]
  },
  ai: {
    categoryIcon: WrenchScrewdriverIcon,
    items: [
      { name: 'Cursor', icon: 'cursor' },
      { name: 'Bolt', icon: 'bolt' },
      { name: 'Sentry', icon: 'sentry' },
      { name: 'Firebase', icon: 'firebase' }
    ]
  }
}

export function useCVData() {
  const { locale } = useI18n()
  return computed(() => {
    const localeData = cvData[locale.value] ?? cvData.en
    return {
      ...localeData,
      skills: localeData.skills.map(cat => ({
        ...cat,
        categoryIcon: SKILL_ITEMS[cat.id]?.categoryIcon ?? null,
        items: SKILL_ITEMS[cat.id]?.items ?? []
      }))
    }
  })
}
