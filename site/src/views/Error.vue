<template>
  <div class="404">
    <h1>404</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  metaInfo: { title: 'Error' },
})
export default class Error extends Vue {}
</script>