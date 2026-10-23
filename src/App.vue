<script>
import Navbar from '@/components/common/Navbar.vue'
import VersionBar from '@/components/common/VersionBar.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    VersionBar
  }
}
</script>

<template>
  <Navbar />
  <main class="w-full pt-16"> <!-- Add padding-top to account for fixed navbar -->
    <router-view />
  </main>
  <VersionBar />
</template>

<style>
#app {
  min-height: 100vh;
}
</style>
