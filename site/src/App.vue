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
            target="_blank" ref="noreferer noopener">
            <span class="icon is-large">
              <i class="fab fa-github-square fa-2x"></i>
            </span>
          </a>
          <a href="https://www.linkedin.com/in/michalpiotrkarol"
            target="_blank" ref="noreferer noopener">
            <span class="icon is-large">
              <i class="fab fa-linkedin fa-2x"></i>
            </span>
          </a>

      </aside>
     </div>

      <div class="column is-main-content">
        <h1 class="title is-1">{{header}}</h1>
        <router-view/>
      </div>
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
#app {
  font-family: 'Montserrat', sans-serif;
  word-break: break-word;
  margin: 10px;
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
</style>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EventBus from '@/event-bus';

@Component({})
export default class App extends Vue {
  public header = document.title;

  private created() {
    EventBus.$on('header-change', (message: string) => {
      this.header = message;
    });
    this.$store.dispatch('initPosts');
    this.$store.dispatch('initProjects');
  }
}
</script>
