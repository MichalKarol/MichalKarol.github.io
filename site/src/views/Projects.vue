<template>
  <div class="projects">
    <paginated-list :items="projects" :action="open_project" type="external">
    </paginated-list>
  </div>
</template>

<style lang="scss" scoped>
.project {
  margin-bottom:10px;
}
</style>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Dictionary } from 'vuex';

import PaginatedList from '@/components/PaginatedList.vue';
import Project from '@/models/project';


@Component({
  components: { PaginatedList },
  metaInfo: {
    title: 'Projects',
    meta: [
      { vmid: 'description', name: 'description', content: 'List of projects' },
    ],
  },
})
export default class Projects extends Vue {
  public PROJECTS_PER_PAGE = 25;
  public get projects(): Dictionary<Project> {
    return this.$store.state.projects;
  }

  public open_project(item: Project) {
    return this.get_url(item.key);
  }

  public get_url(key: string) {
    const project = this.projects[key];
    return project!.url ? project!.url : `https://github.com/MichalKarol/${project!.key}`;
  }
}
</script>
