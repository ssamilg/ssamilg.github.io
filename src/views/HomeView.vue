<script>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';

export default {
  name: 'Home',
  components: { TabGroup, TabList, Tab, TabPanels, TabPanel },
  data() {
    return {
      tabs: [
        { id: 0, title: 'Me', selected: false },
        { id: 1, title: 'Experience', selected: true },
        { id: 2, title: 'Contact', selected: false },
        { id: 2, title: 'Blog', selected: false },
        { id: 2, title: 'Music', selected: false },
      ],
      experiences: [
        {
          id: 0,
          company: 'Sensity AI',
          role: 'Frontend Developer',
          description: 'I am responsible for the Sensity\'s JS based products. I am maintaining the platform project and SDK\'s, improving the code quality and adding new features.',
          isCurrent: true,
          technologies: ['js', 'vuejs', 'bootstrap5', 'github', 'docker', 'jest', 'sass']
        },
        {
          id: 1,
          company: 'Pitcher AG',
          role: 'Frontend Developer',
          description: 'I was part of the Pitcher\'s product team. I worked on maintaining and renewing old applications, desinging new interfaces for cross platform (iOS, Android, Windows)',
          isCurrent: false,
          technologies: ['js', 'vuejs', 'vuetify', 'github', 'sass']
        },
        {
          id: 2,
          company: 'reybex ERP',
          role: 'Frontend Developer',
          description: 'I was part of the team that developing reybex 2.0. I worked on maintaining existing modules and coding new interfaces for ERP modules.',
          isCurrent: false,
          technologies: ['js', 'vuejs', 'vuetify', 'gitlab', 'postman', 'sass']
        },
      ]
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
            <div class="avatar">
              <div class="w-24 mask mask-hexagon">
                <img src="https://pbs.twimg.com/profile_images/1545056575718432769/bbUr82yx_400x400.jpg" alt="profile_photo"/>
              </div>
            </div>
          </div>

          <div class="flex flex-row justify-center">
            <h2 class="text-4xl font-bold">Hi!</h2>
          </div>

          <div class="flex flex-row justify-center">
            <h2 class="text-2xl font-bold">My name is</h2>
          </div>

          <div class="flex flex-row justify-center">
            <h3>*chika-chika*</h3>
          </div>

          <div class="flex flex-row justify-center">
            <h2 class="text-5xl font-bold title-color">Şehit Şamil Gökmen</h2>
          </div>
        </div>

        <div class="divider"/>

        <div class="content">
          <div class="flex flex-row justify-center">
            <div class="basis-auto">
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
                      <div class="card-body">
                        Hi kids!
                        Do you like violence?
                        Wanna see me stick Nine inch Nails, through each one of my eyelids?
                        Wanna copy me and do exactly like I did?
                        Try acid and get fucked up worse that my life is?
                        My brain's dead weight, I'm tryin' to get my head straight
                        But I can't figure out which Spice Girl I want to impregnate
                        And Dr. Dre said
                        "Slim Shady you a base-head!"
                      </div>
                    </div>
                  </TabPanel>

                  <TabPanel>
                    <div class="flex flex-row">
                      <div class="basis-full">
                        <div class="card bg-base-200">
                          <div class="card-body">
                            <ul class="steps steps-vertical">
                              <li
                                v-for="experience in experiences"
                                :key="experience.id"
                                data-content=""
                                class="step step-primary"
                                :class="experience.isCurrent ? 'step-primary' : ''"
                              >
                                <div class="flex flex-row mt-2 p-1">
                                  <div class="basis-full text-left">
                                    <h2 class="text-xl font-bold title-color">{{ experience.company }}</h2>

                                    <div>{{ experience.role }}</div>

                                    <div>{{ experience.description }}</div>
                                    
                                    <div class="flex flex-row align-center">
                                      <div
                                        v-for="techonlogy in experience.technologies"
                                        :key="techonlogy"
                                        class="basis-auto p-1"
                                      >
                                        <img :src="`/src/assets/icons/${techonlogy}.svg`" style="height:24px">
                                      </div>
                                    </div>                                    
                                    <!-- <img :src="`/src/assets/icons/js.svg`" style="height:128px"> -->
                                    <!-- <div class="flex flex-row">
                                      <div class="basis-auto">
                                        <img src="@/assets/icons/vuejs.svg">
                                      </div>

                                      <div class="basis-auto">
                                        <img src="@/assets/icons/js.svg">
                                      </div>

                                      <div class="basis-auto">
                                        <img src="@/assets/icons/bootstrap5.svg">
                                      </div>

                                      <div class="basis-auto">
                                        <img src="@/assets/icons/css.svg">
                                      </div>

                                      <div class="basis-auto">
                                        <img src="@/assets/icons/docker.svg">
                                      </div>
                                    </div>

                                    <div class="flex flex-row">
                                      <div class="basis-auto">
                                        <img src="@/assets/icons/eslint.svg">
                                      </div>

                                      <div class="basis-auto">
                                        <img src="@/assets/icons/firebase.svg">
                                      </div>

                                      <div class="basis-auto">
                                        <img src="@/assets/icons/flutter.svg">
                                      </div>

                                      <div class="basis-auto">
                                        <img src="@/assets/icons/git.svg">
                                      </div>

                                      <div class="basis-auto">
                                        <img src="@/assets/icons/github.svg">
                                      </div>
                                    </div>

                                    <div class="flex flex-row">
                                      <div class="basis-auto">
                                        <img src="@/assets/icons/gitlab.svg">
                                      </div>

                                      <div class="basis-auto">
                                        <img src="@/assets/icons/heroku.svg">
                                      </div>

                                      <div class="basis-auto">
                                        <img src="@/assets/icons/html5.svg">
                                      </div>

                                      <div class="basis-auto">
                                        <img src="@/assets/icons/mongodb.svg">
                                      </div>

                                      <div class="basis-auto">
                                        <img src="@/assets/icons/nextjs.svg">
                                      </div>
                                    </div>

                                    <div class="flex flex-row">
                                      <div class="basis-auto">
                                        <img src="@/assets/icons/nodejs.svg">
                                      </div>

                                      <div class="basis-auto">
                                        <img src="@/assets/icons/npm.svg">
                                      </div>

                                      <div class="basis-auto">
                                        <img src="@/assets/icons/postman.svg">
                                      </div>

                                      <div class="basis-auto">
                                        <img src="@/assets/icons/prettier.svg">
                                      </div>

                                      <div class="basis-auto">
                                        <img src="@/assets/icons/reactjs.svg">
                                      </div>
                                    </div>

                                    <div class="flex flex-row">
                                      <div class="basis-auto">
                                        <img src="@/assets/icons/sass.svg">
                                      </div>

                                      <div class="basis-auto">
                                        <img src="@/assets/icons/vitejs.svg">
                                      </div>

                                      <div class="basis-auto">
                                        <img src="@/assets/icons/webpack.svg">
                                      </div>
                                    </div> -->
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel>Content 2</TabPanel>
                  <TabPanel>Content 3</TabPanel>
                  <TabPanel>
                    <div class="flex flex-row">
                      <div class="basis-full">
                        <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/0ZpXPN3NwzsaKubfrjWjhx?utm_source=generator" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                        <iframe class="mt-2" width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1395979963&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/ssgbeatz" title="SSGBeatz" target="_blank" style="color: #cccccc; text-decoration: none;">SSGBeatz</a> · <a href="https://soundcloud.com/ssgbeatz/amplified" title="Amplified" target="_blank" style="color: #cccccc; text-decoration: none;">Amplified</a></div>
                        <iframe class="mt-2" width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1395979963&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/ssgbeatz" title="SSGBeatz" target="_blank" style="color: #cccccc; text-decoration: none;">SSGBeatz</a> · <a href="https://soundcloud.com/ssgbeatz/amplified" title="Amplified" target="_blank" style="color: #cccccc; text-decoration: none;">Amplified</a></div>
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

    <!-- <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1> -->
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
      // height: 35%;
      text-align: center;
    }

    .content {
      &-tab-panel {
        border: 1px solid white;
        padding: 8px;
      }

      .steps .step:after {
        height: 1rem;
        width: 1rem;
      }

      .steps-vertical .step:before {
        width: .25rem;
      }

      // height: 65%;
    }
  }
}
</style>