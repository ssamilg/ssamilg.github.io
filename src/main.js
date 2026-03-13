import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Particles from '@tsparticles/vue3'
import { loadFull } from 'tsparticles'

import i18n from './i18n'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(Particles, {
  init: async (engine) => {
    await loadFull(engine)
  }
})

app.mount('#app')
