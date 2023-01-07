<script>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import VIcon from '@/components/common/VIcon.vue';
import VTabPanelCard from '@/components/common/VTabPanelCard.vue';
import BlogCard from '@/components/modules/blog/BlogCard.vue';
import BiographyCard from '@/components/modules/biography/BiographyCard.vue';
import ExperienceCard from '@/components/modules/experience/ExperienceCard.vue';
import MusicCard from '../components/modules/music/MusicCard.vue';

export default {
  name: 'Home',
  components: {
    Tab,
    TabList,
    TabPanel,
    TabGroup,
    TabPanels,
    VIcon,
    VTabPanelCard,
    BlogCard,
    MusicCard,
    BiographyCard,
    ExperienceCard,
  },
  data() {
    return {
      tabs: [
        { id: 0, title: 'Me' },
        { id: 1, title: 'Experience' },
        { id: 3, title: 'Blog' },
        { id: 4, title: 'Music' },
      ],
    };
  },
  methods: {
    openLink(link) {
      window.open(link);
    },
  },
}
</script>

<template>
  <div id="home">
    <div class="flex justify-center wrapper">
      <div class="basis-full md:basis-2/4">
        <div class="header">
          <div class="flex justify-center">
            <div class="basis-auto">
              <div class="avatar">
                <div class="w-36 rounded full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="https://pbs.twimg.com/profile_images/1545056575718432769/bbUr82yx_400x400.jpg" alt="profile_photo"/>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-row justify-center pt-4">
            <h2 class="text-5xl font-bold title-color">Şehit Şamil Gökmen</h2>
          </div>

          <div class="flex flex-row justify-center content-center mt-4">
            <VIcon icon="twitter" height="48px" class="px-2"/>
            <VIcon icon="instagram" height="48px" class="px-2"/>
            <VIcon icon="linkedin" height="48px" class="px-2"/>
            <VIcon icon="github_light" height="44px" class="px-2"/>
          </div>
        </div>

        <div class="divider"/>

        <div class="content">
          <div class="flex flex-row justify-center">
            <div class="basis-full">
              <TabGroup>
                <div class="flex flex-row justify-center">
                  <div class="basis-auto">
                    <TabList class="tabs tabs-boxed flex flex-row">
                      <Tab
                        v-for="tab in tabs"
                        :key="tab.id"
                        v-slot="{ selected }"
                        as="template"
                      >
                        <div class="tab" :class="{ 'tab tab-active': selected }">
                          {{ tab.title }}
                        </div>
                      </Tab>
                    </TabList>
                  </div>
                </div>

                <TabPanels class="mt-2">
                  <TabPanel>
                    <BiographyCard/>
                  </TabPanel>

                  <TabPanel>
                    <ExperienceCard />
                  </TabPanel>

                  <TabPanel>
                    <BlogCard />
                  </TabPanel>

                  <TabPanel>
                    <MusicCard />
                  </TabPanel>
                </TabPanels>   
              </TabGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#home {
  width: 100%;

  .title-color {
    color: hsl(var(--ac));
  }

  .wrapper {
    height: 100%;
    padding: 24px;

    .header {
      text-align: center;
    }

    .content {
      .tab:focus {
        outline: none;
        outline-offset: none;
      }
    }
  }
}
</style>