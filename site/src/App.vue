<template>
  <div id="app">
    <div class="columns is-fullheight">
      <div class="column is-2 is-sidebar-menu" id="menu">
        <aside class="menu">
          <p class="menu-label">
            Menu
          </p>
          <ul class="menu-list">
            <li><router-link to="/" exact>Home</router-link></li>
            <li><router-link to="/projects">Projects</router-link></li>
            <li><router-link to="/about">About me</router-link></li>
          </ul>

          <a href="https://www.github.com/MichalKarol/"
            target="_blank" ref="noreferer"
            aria-label="Github link">
            <span class="icon is-large">
              <i class="fab fa-github-square fa-2x"></i>
            </span>
          </a>
          <a href="https://www.linkedin.com/in/michalpiotrkarol"
            target="_blank" ref="noreferer"
            aria-label="Linkedin link">
            <span class="icon is-large">
              <i class="fab fa-linkedin fa-2x"></i>
            </span>
          </a>

      </aside>
     </div>

      <div class="column is-main-content is-10">
        <h1 class="title is-1">{{title}}</h1>
        <router-view/>
      </div>
    </div>
    <div id="cookie-notification" class="notification" v-if="!haveConsent">
      <button class="delete" @click="set_cookie_consent()" aria-label="Close popup"></button>
      This site uses cookies and other tracking technologies to work correctly (Facebook comment section) and to analyze website traffic (Google Analytics).
      By browsing this site, you consent to our use of cookies and other tracking technologies.
    </div>
  </div>
</template>

<style lang="scss">
$primary_color: lightslategrey;
$link: black;
$menu-item-active-background-color: $primary_color;

@import '../node_modules/bulma/bulma';

$fa-font-path : "../node_modules/@fortawesome/fontawesome-free/webfonts";
@import "../node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss";
@import "../node_modules/@fortawesome/fontawesome-free/scss/solid.scss";
@import "../node_modules/@fortawesome/fontawesome-free/scss/regular.scss";
@import "../node_modules/@fortawesome/fontawesome-free/scss/brands.scss";
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
html, body, #app {
  height: 100%;
}

#app {
  font-family: 'Montserrat', sans-serif;
  word-break: break-word;
  padding: 10px;
}

#menu {
  margin: 10px 0 0 10px;
}

a > span {
  color: $primary_color;
}

h1 {
  text-align: center;
}

#cookie-notification {
  bottom: 0px;
  position: fixed;
  margin-left: -10px;
}

</style>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import CookieService from '@/cookie-service';


@Component({
  metaInfo() {
    return {
      title: 'Blog',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
          { vmid: 'description', name: 'description', content: 'Personal blog of Michal Karol' },
      ],
      changed: (metaInfo) => {
        (this as App).title = metaInfo.title || '';
      },
    };
  },
})
export default class App extends Vue {
  public title = '';
  public haveConsent = CookieService.get_cookie_consent();

  private created() {
    this.$store.dispatch('initPosts');
    this.$store.dispatch('initProjects');
  }

  private set_cookie_consent() {
    CookieService.set_cookie_consent(true);
    this.haveConsent = true;
  }
}
</script>
