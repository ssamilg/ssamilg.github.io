<script>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import VIcon from '@/components/VIcon.vue';

export default {
  name: 'Home',
  components: { TabGroup, TabList, Tab, TabPanels, TabPanel, VIcon },
  data() {
    return {
      tabs: [
        { id: 0, title: 'Me' },
        { id: 1, title: 'Experience' },
        { id: 3, title: 'Blog' },
        { id: 4, title: 'Music' },
      ],
      experiences: [
        {
          id: 0,
          company: 'Sensity AI',
          companyLogo: 'https://pbs.twimg.com/profile_images/1288045838024007682/EKo6Gp7c_400x400.jpg',
          role: 'Frontend Developer',
          description: 'I am responsible for the Sensity\'s JS based products. I am maintaining the platform project and SDK\'s, improving the code quality and adding new features.',
          isCurrent: true,
          technologies: ['js', 'vuejs', 'bootstrap5', 'github', 'docker', 'jest', 'sass']
        },
        {
          id: 1,
          company: 'Pitcher AG',
          companyLogo: 'https://play-lh.googleusercontent.com/9RgJbmjOoVNULZKi--OUvjxUr1isDGO7LBcpGna5pY59H-FDHouKrD0MnXi9OVMOViI',
          role: 'Software Engineer',
          description: 'I was part of the Pitcher\'s product team. I worked on maintaining and renewing old applications, desinging new interfaces for cross platform (iOS, Android, Windows)',
          isCurrent: false,
          technologies: ['js', 'vuejs', 'vuetify', 'github', 'sass']
        },
        {
          id: 2,
          company: 'reybex ERP',
          companyLogo: 'https://play-lh.googleusercontent.com/TDS_eHqkzroSDM-96YHgx-I6h_e4QDL2AhBh-k1KQocf_h5G18x6uI3BmSOvnfgoSQ=s96-rw',
          role: 'Frontend Developer',
          description: 'I was part of the team that developing reybex 2.0. I worked on maintaining existing modules and coding new interfaces for ERP modules.',
          isCurrent: false,
          technologies: ['js', 'vuejs', 'vuetify', 'gitlab', 'postman', 'sass']
        },
      ],
      otherTechnologies: ['nodejs', 'reactjs','html5', 'css3', 'vite', 'webpack', 'firebase', 'heroku', 'eslint', 'prettier', 'git', 'mongodb']
    };
  }
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
                    <div class="card bg-base-200">
                      <div class="card-body text-center">
                        <div class="flex flex-row">
                          Born in year 1998 in Ankara. 
                          Lived there until university. 
                          Finished Computer Engineering in Sakarya University.
                        </div>

                        <div class="divider m-0">o</div>

                        <div class="flex flex-row">
                          Started proffesional work life in the last year of school.
                          Working as a frontend developer since then.
                          Worked in multiple companies with various sized of international teams.
                          Currently working in an AI supported fraud detection startup Sensity to make internet a safer place.
                        </div>

                        <div class="divider m-0">o</div>

                        <div class="flex flex-row">
                          <div class="basis-full">
                            Interested in hiphop music, sci-fi cinema, singleplayer gaming and history.
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div class="flex flex-row">
                      <div class="basis-full">
                        <div class="card bg-base-200">
                          <div class="card-body">
                            <div class="experience-list">
                              <div
                                v-for="experience in experiences"
                                :key="experience.id"
                                class="experience-list-item"
                              >
                                <div class="flex flex-row mt-3 p-1">
                                  <div class="basis-auto mr-2 mt-1 list-bullet">
                                    <img :src="experience.companyLogo" alt="company-logo" class="company-logo">

                                    <div class="list-bullet-line">
                                      <div class="list-bullet-line-content"/>
                                    </div>
                                  </div>

                                  <div class="basis-auto text-left">
                                    <div class="flex flex-row">
                                      <div class="basis-full">
                                        <h2 class="text-xl font-bold title-color">{{ experience.company }}</h2>
                                        <div class="font-bold">{{ experience.role }}</div>
                                      </div>
                                    </div>

                                    <div class="flex py-2">
                                      <div class="basis-auto">
                                        {{ experience.description }}
                                      </div>
                                    </div>
                                    
                                    <div class="flex flex-row align-center pt-2">
                                      <div
                                        v-for="techonlogy in experience.technologies"
                                        :key="techonlogy"
                                        class="basis-auto pr-2"
                                      >
                                        <VIcon :icon="techonlogy" height="24px"/>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="divider">o</div>

                            <div class="flex flex-row justify-center">
                              <div class="basis-auto text-center">
                                <h2 class="text-xl font-bold title-color">Other Technologies I Use</h2>

                                <div class="flex flex-row flex-wrap md:flex-nowrap align-center mt-2">
                                  <div
                                    v-for="techonlogy in otherTechnologies"
                                    :key="techonlogy"
                                    class="basis-1/6 md:basis-auto p-2"
                                  >
                                    <VIcon :icon="techonlogy" height="36px"/>
                                  </div>
                                </div>   
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>

                  <TabPanel>
                     <div class="card bg-base-200">
                      <div class="card-body text-center">
                        <div class="flex flex-row justify-center content-center">
                          <div class="basis-auto">
                            There is nothing here... yet.
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div class="flex flex-row">
                      <div class="basis-full">
                        <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/0ZpXPN3NwzsaKubfrjWjhx?utm_source=generator" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                        <iframe class="mt-2" width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1395979963&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/ssgbeatz" title="SSGBeatz" target="_blank" style="color: #cccccc; text-decoration: none;">SSGBeatz</a> · <a href="https://soundcloud.com/ssgbeatz/amplified" title="Amplified" target="_blank" style="color: #cccccc; text-decoration: none;">Amplified</a></div>
                        <!-- <iframe class="mt-2" width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1395979963&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/ssgbeatz" title="SSGBeatz" target="_blank" style="color: #cccccc; text-decoration: none;">SSGBeatz</a> · <a href="https://soundcloud.com/ssgbeatz/amplified" title="Amplified" target="_blank" style="color: #cccccc; text-decoration: none;">Amplified</a></div> -->
                      </div>
                    </div>
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
      .experience-list {
        &-item {
          .list-bullet {
            img {
              max-width: inherit;
            }
  
            &-line {
              height: 100%;
              width: 100%;
              display: flex;
              justify-content: center;
  
              &-content {
                $content-color: hsl(var(--bc));
  
                width: 4px;
                background-color: $content-color;
                border: 1px solid $content-color;
                height: 100%;
              }
            }
          }
  
          &:last-child {
            .list-bullet .list-bullet-line .list-bullet-line-content {
              width: 0;
              border: none;
              height: 100%;
            }
          }
        }
      }

      .tab:focus {
        outline: none;
        outline-offset: none;
      }

      &-tab-panel {
        border: 1px solid white;
        padding: 8px;
      }

      .company-logo {
        border-radius: 8px;
        height: 48px;
        width: 48px;
      }
    }
  }
}
</style>