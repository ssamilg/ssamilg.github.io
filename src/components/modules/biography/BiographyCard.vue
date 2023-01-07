<script>
import VTabPanelCard from '@/components/common/VTabPanelCard.vue';

export default {
  name: 'BiographyCard',
  components: { VTabPanelCard },
  data() {
    return {
      biographySections : [
        'Born in year 1998 in Ankara. Lived there until university. Finished Computer Engineering in Sakarya University.',
        'Started proffesional work life in the last year of school. Working as a frontend developer since then. Worked in multiple companies with various sized of international teams. Currently working in an AI supported fraud detection startup Sensity to make internet a safer place.',
        'Interested in hiphop music, sci-fi cinema, singleplayer gaming and history.',
      ],
    };
  },
};
</script>

<template>
  <VTabPanelCard>
    <template v-for="(section, index) in biographySections" :key="index">
      <div class="flex flex-row">
        <div class="basis-full">
          {{ section }}
        </div>
      </div>

      <div v-if="index !== biographySections.length - 1" class="divider m-0">o</div>
    </template>
  </VTabPanelCard>  
</template>
