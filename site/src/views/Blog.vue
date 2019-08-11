<template>
  <div class="blog">
    <paginated-list :items="posts" :action="open_post" type="internal">
    </paginated-list>
  </div>
</template>

<style lang="scss" scoped>
.post {
  margin-bottom:10px;
}
</style>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Dictionary } from 'vuex';

import PaginatedList from '@/components/PaginatedList.vue';
import Post from '@/models/post';


@Component({
  components: {
    PaginatedList,
  },
})
export default class Blog extends Vue {
  public POSTS_PER_PAGE = 25;
  public get posts(): Dictionary<Post> {
    return this.$store.state.posts;
  }

  private open_post(item: Post) {
    return { name: 'post', params: {id: item.file}};
  }
}
</script>
