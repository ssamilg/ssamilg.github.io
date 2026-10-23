<script>
import VersionBar from '@/components/common/VersionBar.vue'

export default {
  name: 'App',
  components: {
    VersionBar
  }
}
</script>

<template>
  <main>
    <router-view />
  </main>
  <VersionBar />
</template>

<style>
#app {
  min-height: 100vh;
}

main {
  flex: 1;
  width: 100%;
}
</style>
