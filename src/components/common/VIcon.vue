<script>
export default {
  name: 'VIcon',
  props: {
    icon: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      links: {
        bootstrap5: 'https://getbootstrap.com/',
        css3: 'https://www.w3schools.com/css/',
        docker: 'https://www.docker.com/',
        eslint: 'https://eslint.org/',
        firebase: 'https://firebase.google.com/',
        flutter: 'https://flutter.dev/',
        git: 'https://git-scm.com/',
        github: 'https://github.com/ssamilg',
        github_light: 'https://github.com/ssamilg',
        gitlab: 'https://about.gitlab.com/',
        heroku: 'https://www.heroku.com/',
        html5: 'https://www.w3.org/html/',
        jest: 'https://jestjs.io/',
        js: 'https://www.javascript.com/',
        mongodb: 'https://www.mongodb.com/',
        nextjs: 'https://nextjs.org/',
        nodejs: 'https://nodejs.org/en/',
        npm: 'https://www.npmjs.com/',
        postman: 'https://www.postman.com/',
        prettier: 'https://prettier.io/',
        reactjs: 'https://reactjs.org/',
        sass: 'https://sass-lang.com/',
        vite: 'https://vitejs.dev/',
        vuejs: 'https://vuejs.org/',
        vuetify: 'https://vuetifyjs.com/',
        webpack: 'https://webpack.js.org/',
        twitter: 'https://twitter.com/ssamilg/',
        X: 'https://twitter.com/ssamilg/',
        instagram: 'https://instagram.com/ssamilg/',
        linkedin: 'https://www.linkedin.com/in/ssamilg/',
      },
    };
  },
  computed: {
    iconPath() {
      const iconUrl = new URL(`/src/assets/icons/${this.icon}.svg`, import.meta.url)

      return iconUrl;
    },
    link() {
      return this.links[this.icon];
    },
  },
};
</script>

<template>
  <div class="v-icon inline-flex items-center justify-center">
    <a :href="link">
      <img :src="iconPath" :style="`height:${height}`" :alt="icon">
    </a>
  </div>
</template>
