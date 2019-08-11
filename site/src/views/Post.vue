<template>
  <div class="post">
    <div class="columns post-head">

      <router-link :to="{name: 'blog'}" class="button is-primary is-inverted column-1"
        title="Back" aria-label="Back">
        <span class="icon">
            <i class="fas fa-angle-left" aria-hidden="true"></i>
        </span>
      </router-link>

      <div class="column-2">
        Michał Karol on {{currentPost.date}}
      </div>
    </div>

    <div class="content" v-html="renderedPost"></div>

    <div class="tags">
      <span class="tag" v-for="tag in currentPost.tags" :key="tag">#{{tag}}</span>
    </div>

    <div id="fb-wrapper">
       <div 
        class="fb-comments" 
        :data-href="currentHref"
        data-width="100%"
        data-numposts="5"
        data-order-by="time">
      </div>
    </div>

  </div>
</template>

<style lang="scss">
.post-head {
  align-items: center;
}
iframe {
  width: 100% !important;
}
</style>


<script lang="ts">
import Vue from 'vue';
import {Prop, Component, Watch} from 'vue-property-decorator';
import { MetaInfo } from 'vue-meta';


// @ts-ignore
import MarkdownIt from 'markdown-it';
// @ts-ignore
import MarkdownItHljs from 'markdown-it-highlightjs';

import 'highlight.js/styles/vs2015.css';
// @ts-ignore
import hljs from 'highlight.js/lib/highlight';
// @ts-ignore
import shell from 'highlight.js/lib/languages/shell';
// @ts-ignore
import python from 'highlight.js/lib/languages/python';

import { HttpResponse } from 'vue-resource/types/vue_resource';
import Post from '@/models/post';

hljs.registerLanguage('shell', shell);
hljs.registerLanguage('python', python);

@Component({
  metaInfo() {
    return {
      title: (this as PostView).currentPost.title,
      meta: [
        { vmid: 'description', name: 'description', content: (this as PostView).currentPost.summary },
      ],
    };
  },
})
export default class PostView extends Vue {

  @Prop(String) private readonly id!: string;
  private md = new MarkdownIt().use(MarkdownItHljs, {auto: false, code: false});

  public get currentHref(): string {
    return window.location.href;
  }

  public get currentPost(): Post {
    return this.$store.state.posts[this.id];
  }

  public get renderedPost(): string {
    return this.currentPost.text ? this.md.render(this.currentPost.text) : '';
  }

  public mounted() {
    (window as any).FB.XFBML.parse(document.getElementById('fb-wrapper'));
  }
}
</script>
