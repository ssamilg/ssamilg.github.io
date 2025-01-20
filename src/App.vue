<script>
import Navbar from '@/components/common/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<template>
  <Navbar />
  <main class="w-full pt-16"> <!-- Add padding-top to account for fixed navbar -->
    <router-view />
  </main>
</template>

<style>
#app {
  min-height: 100vh;
}
</style>
