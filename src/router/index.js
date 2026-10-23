import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/PlaceholderView.vue')
  },
  {
    path: '/cv',
    redirect: '/'
  },
  {
    path: '/resume',
    redirect: '/'
  },
  {
    path: '/versions',
    name: 'versions',
    component: () => import('../views/VersionsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
