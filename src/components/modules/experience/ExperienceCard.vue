<script>
import VIcon from '@/components/common/VIcon.vue';
import VTabPanelCard from '@/components/common/VTabPanelCard.vue';

export default {
  name: 'ExperienceCard',
  components: { VIcon, VTabPanelCard },
  data() {
    return {
      experiences: [
        {
          id: 0,
          company: 'Sensity AI',
          companyLink: 'https://sensity.ai/',
          companyLogo: 'https://pbs.twimg.com/profile_images/1288045838024007682/EKo6Gp7c_400x400.jpg',
          role: 'Frontend Developer',
          description: 'I am responsible for the Sensity\'s JS based products. I am maintaining the platform project and SDK\'s, improving the code quality and adding new features.',
          isCurrent: true,
          technologies: ['js', 'vuejs', 'bootstrap5', 'github', 'docker', 'jest', 'sass']
        },
        {
          id: 1,
          company: 'Pitcher AG',
          companyLink: 'https://www.pitcher.com/',
          companyLogo: 'https://play-lh.googleusercontent.com/9RgJbmjOoVNULZKi--OUvjxUr1isDGO7LBcpGna5pY59H-FDHouKrD0MnXi9OVMOViI',
          role: 'Software Engineer',
          description: 'I was part of the Pitcher\'s product team. I worked on maintaining and renewing old applications, desinging new interfaces for cross platform (iOS, Android, Windows)',
          isCurrent: false,
          technologies: ['js', 'vuejs', 'vuetify', 'github', 'sass']
        },
        {
          id: 2,
          company: 'reybex ERP',
          companyLink: 'https://www.reybex.com/en/',
          companyLogo: 'https://play-lh.googleusercontent.com/TDS_eHqkzroSDM-96YHgx-I6h_e4QDL2AhBh-k1KQocf_h5G18x6uI3BmSOvnfgoSQ=s96-rw',
          role: 'Frontend Developer',
          description: 'I was part of the team that developing reybex 2.0. I worked on maintaining existing modules and coding new interfaces for ERP modules.',
          isCurrent: false,
          technologies: ['js', 'vuejs', 'vuetify', 'gitlab', 'postman', 'sass']
        },
      ],
      otherTechnologies: ['nodejs', 'reactjs','html5', 'css3', 'vite', 'webpack', 'firebase', 'heroku', 'eslint', 'prettier', 'git', 'mongodb']
    };
  },
  methods: {
    openLink(link) {
      window.open(link);
    },
  },
};
</script>

<template>
  <VTabPanelCard>
    <div class="experience-list">
      <div
        v-for="experience in experiences"
        :key="experience.id"
        class="experience-list-item"
      >
        <div class="flex flex-row mt-3 p-1">
          <div class="hidden md:block basis-auto mr-2 mt-1 list-bullet">
            <img
              :src="experience.companyLogo"
              alt="company-logo"
              class="company-logo"
              @click="openLink(experience.companyLink)"
            >

            <div class="list-bullet-line">
              <div class="list-bullet-line-content"/>
            </div>
          </div>

          <div class="basis-auto text-left">
            <div class="flex flex-row">
              <div class="basis-auto md:hidden mr-2 mt-1">
                <img
                  :src="experience.companyLogo"
                  alt="company-logo"
                  class="company-logo"
                  @click="openLink(experience.companyLink)"
                >
              </div>

              <div class="basis-auto">
                <h2
                  class="text-xl font-bold title-color"
                  @click="openLink(experience.companyLink)"
                >
                  {{ experience.company }}
                </h2>
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
  </VTabPanelCard>
</template>

<style lang="scss">
  .experience-list {
    &-item {
      .company-logo {
        border-radius: 8px;
        height: 48px;
        width: 48px;
        cursor: pointer;
      }

      h2 {
        cursor: pointer;
        color: hsl(var(--ac));

        &:hover {
          text-decoration: underline;
        }
      }

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
</style>