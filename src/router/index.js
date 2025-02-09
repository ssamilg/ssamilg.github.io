import { createRouter, createWebHistory } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'

const isMobile = ref(false)
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768 // lg breakpoint in Tailwind
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => {
      if (isMobile.value) {
        return import('../views/MobileHomeView.vue')
      }
      return import('../views/HomeView.vue')
    }
  },
  {
    path: '/cv',
    name: 'cv',
    component: () => import('../views/CVView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Check mobile on initial load and window resize
if (typeof window !== 'undefined') {
  checkMobile()
  window.addEventListener('resize', checkMobile)
}

export default router
