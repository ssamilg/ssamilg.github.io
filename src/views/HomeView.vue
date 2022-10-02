<script >
 import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

export default {
  name: 'Home',
  components: {
    Tab,
    TabList,
    TabPanel,
    TabGroup,
    TabPanels,
  },
  data() {
    return {
      tabs: [
        { id: 0, title: 'Me'},
        { id: 1, title: 'Experience'},
        { id: 2, title: 'Projects'},
        { id: 3, title: 'Blog'},
        { id: 4, title: 'Music'},
        { id: 5, title: 'Contact'},
      ],
      activeTabId: 0,
    };
  },
}
</script>

<template>
  <div id="home">
    <div class="flex justify-center wrapper">
      <div class="flex flex-col">       
        <div class="header">
          <div class="flex justify-center">
            <div class="avatar">
              <div class="w-24 mask mask-hexagon">
                <img src="https://pbs.twimg.com/profile_images/1545056575718432769/bbUr82yx_400x400.jpg" height="128" width="128"/>
              </div>
            </div>
          </div>

          <div class="flex justify-center">
            <h2 class="text-4xl font-bold">Hi!</h2>
          </div>

          <div class="flex justify-center">
            <h2 class="text-2xl font-bold">My name is</h2>
          </div>

          <div class="flex justify-center">
            <h2 class="text-5xl font-bold">Şehit Şamil Gökmen</h2>
          </div>

        </div>

        <div class="divider"/>
 
        <div class="content">
          <TabGroup>
            <div class="flex flex-row justify-center w-full">
              <div>
                <TabList class="tabs tabs-boxed justify-center">
                  <Tab
                    v-for="tab in tabs"
                    :key="tab.id"
                    class="tab"
                    :class="activeTabId === tab.id ? ' tab-active': ''"
                    @click="activeTabId = tab.id"
                  >
                    {{ tab.title }}
                  </Tab>
                </TabList>
              </div>
            </div>

            <div class="flex flex-row justify-center w-full">
              <div class="basis-full">
                  <TabPanels>
                    <TabPanel>
                      Content 1
                    </TabPanel>
                    <TabPanel>Content 2</TabPanel>
                    <TabPanel>Content 3</TabPanel>
                    <TabPanel>Content 4</TabPanel>
                    <TabPanel>Content 5</TabPanel>
                    <TabPanel>Content 6</TabPanel>
                  </TabPanels>
              </div>
            </div>
          </TabGroup>

          <div class="flex">
            I'm Şehit Şamil Gökmen
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
      height: 35%;
      text-align: center;
    }

    .content {
      height: 65%;
      width: 100%;
    }
  }
}
</style>