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
                <img src="https://pbs.twimg.com/profile_images/1545056575718432769/bbUr82yx_400x400.jpg" height="128" width="128"/>
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
            <h2 class="text-5xl font-bold">Şehit Şamil Gökmen</h2>
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
      
                <TabPanels class="flex flex-row">
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
                    <div class="card bg-base-200">
                      <div class="card-body">
                        OOOO
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel>Content 2</TabPanel>
                  <TabPanel>Content 3</TabPanel>
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
  height: 100vh;
  width: 100%;

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
      // height: 65%;
    }
  }
}
</style>