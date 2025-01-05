<script>
export default {
  name: 'BiographyCard',
  data() {
    return {
      biographySections: [
        "From the heart of Ankara to the world of tech, my journey began in '98. Armed with a Computer Engineering degree from Sakarya University, I dove into frontend development before graduating.",
        "My code has traveled through startups and established companies, always part of international teams pushing boundaries. Currently at Sensity, turning AI into our ally against digital fraud.",
        "When I'm not coding, you'll find me vibing to old school hip-hop, immersive single-player gaming adventures, cinema in all its forms, and a growing collection of books ranging from history to sci-fi.",
      ]
    };
  }
};
</script>

<template>
  <div class="pb-4 px-2 md:px-8">
    <h1 class="text-4xl font-bold text-base-content mb-4">About Me</h1>

    <div class="bg-base-200/50 p-5 border border-gray-800 rounded">
      <div v-for="(section, index) in biographySections" :key="index">
        <p class="text-base text-base-content/80">
          {{ section }}
        </p>

        <div v-if="index !== biographySections.length - 1"
              class="divider">o</div>
      </div>
    </div>
  </div>
</template>
