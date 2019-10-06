<template>
  <div class="contact">
    <div class="columns">
      <div class="column content">
        <h3>Michal Karol <a href="mailto:michal.p.karol@gmail.com">&lt;michal.p.karol@gmail.com&gt;</a></h3>
        <p>Currently working for Bright IT since 2019. Worked at Nokia Solutions and Networks since 2018 till 2019, also intern at Intel Technology Poland for 3 months of 2017.</p>
        <p>Additionaly I am a student of Wroclaw's University of Science on Computer Science and Management faculty.
          For my enginerring degree I prepared and described an application that shown example usage of Hapi.js framework: 
          <a href="eventit.pl" target="_blank" rel="noreferrer">Event IT</a>.</p>
        <p>I decided to created this page in order to practice my web development skills, but also 
          to share interesting ideas, encountered development problems and their solutions.
        </p>
      </div>
      <div class="column">
        <leaflet :coordinates="WROCLAW_COORDINATES" zoom="14"></leaflet>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>

</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Leaflet from '@/components/Leaflet.vue';

@Component({
  components: { Leaflet },
  metaInfo: { title: 'About me' },
})
export default class AboutMe extends Vue {
  public WROCLAW_COORDINATES = [51.1079, 17.0385];
}
</script>

