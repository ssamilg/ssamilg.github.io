<script>
import VTabPanelCard from '@/components/common/VTabPanelCard.vue';

export default {
  name: 'MusicCard',
  components: { VTabPanelCard },
};
</script>

<template>
  <VTabPanelCard>
    <div class="flex flex-row">
      <div class="basis-full">
        <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/0ZpXPN3NwzsaKubfrjWjhx?utm_source=generator" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        <iframe class="mt-2" width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1395979963&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/ssgbeatz" title="SSGBeatz" target="_blank" style="color: #cccccc; text-decoration: none;">SSGBeatz</a> · <a href="https://soundcloud.com/ssgbeatz/amplified" title="Amplified" target="_blank" style="color: #cccccc; text-decoration: none;">Amplified</a></div>
        <!-- <iframe class="mt-2" width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1395979963&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/ssgbeatz" title="SSGBeatz" target="_blank" style="color: #cccccc; text-decoration: none;">SSGBeatz</a> · <a href="https://soundcloud.com/ssgbeatz/amplified" title="Amplified" target="_blank" style="color: #cccccc; text-decoration: none;">Amplified</a></div> -->
      </div>
    </div>
  </VTabPanelCard>
</template>
