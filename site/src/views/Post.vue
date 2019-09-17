<template>
  <div class="post">
    <div class="columns post-head is-mobile">

      <div class="column is-narrow">
        <router-link :to="{name: 'blog'}" class="button is-primary is-inverted"
        title="Back" aria-label="Back">
        <span class="icon">
            <i class="fas fa-angle-left" aria-hidden="true"></i>
        </span>
      </router-link>
      </div>
      

      <div class="column">
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
// @ts-ignore
import iterator from 'markdown-it-for-inline';


import 'highlight.js/styles/vs2015.css';
// @ts-ignore
import hljs from 'highlight.js/lib/highlight';
// @ts-ignore
import shell from 'highlight.js/lib/languages/shell';
// @ts-ignore
import python from 'highlight.js/lib/languages/python';
// @ts-ignore
import dockerfile from 'highlight.js/lib/languages/dockerfile';


import { HttpResponse } from 'vue-resource/types/vue_resource';
import Post from '@/models/post';

hljs.registerLanguage('shell', shell);
hljs.registerLanguage('python', python);
hljs.registerLanguage('dockerfile', dockerfile);

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
  private md = new MarkdownIt()
                .use(MarkdownItHljs, {auto: false, code: false})
                .use(iterator, 'url_new_win', 'link_open', (tokens: any, idx: number) => {
                      const targetIndex = tokens[idx].attrIndex('target');
                      const relIndex = tokens[idx].attrIndex('rel');

                      if (targetIndex < 0) {
                        tokens[idx].attrPush(['target', '_blank']);
                      } else {
                        tokens[idx].attrs[targetIndex][1] = '_blank';
                      }

                      if (relIndex < 0) {
                        tokens[idx].attrPush(['rel', 'noreferer']);
                      } else {
                        tokens[idx].attrs[relIndex][1] = 'noreferer';
                      }
                });

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
