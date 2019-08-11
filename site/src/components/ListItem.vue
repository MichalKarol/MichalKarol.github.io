<template>
    <article class="media list-item">
        <figure v-if="item.image" class="media-left">
            <p class="image is-64x64">
                <img :src="item.image">
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <p>
                    <router-link v-if="is_internal()" :to="action(item)"
                        :aria-label="item.title">
                        <strong >{{item.title}}</strong>
                    </router-link>
                    <a v-if="!is_internal()" :href="action(item)" :aria-label="item.title"
                       target="_blank" ref="noreferer">
                        <strong >{{item.title}}</strong>
                    </a>
                    
                    <small v-if="item.date"> {{item.date}}</small>
                    
                    <br>
                    {{item.summary}}
                    <div class="tags">
                        <span class="tag" v-for="tag in item.tags" :key="tag">#{{tag}}</span>
                    </div>
                </p>
            </div>
        </div>
        <div v-if="action" class="media-right">
            <router-link v-if="is_internal()" :to="action(item)" class="button is-primary is-inverted column-1"
                :aria-label="item.title">
                <span class="icon">
                    <i class="fas fa-angle-right" aria-hidden="true"></i>
                </span>
            </router-link>
            <a v-if="!is_internal()" :href="action(item)" class="button is-primary is-inverted column-1"
                :aria-label="item.title" target="_blank" ref="noreferer">
                <span class="icon">
                    <i class="fas fa-angle-right" aria-hidden="true"></i>
                </span>
            </a>
        </div>
    </article>
</template>

<style scoped >
.is-horizontal-center {
  justify-content: center;
}
</style>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import Listable from '@/models/listable';

@Component({
    name: 'ListItem',
    components: { ListItem },
})
class ListItem extends Vue {
    @Prop()
    private item!: Listable;

    @Prop()
    private action!: (item: Listable) => string | object;

    @Prop()
    private type!: string;

    private is_internal() {
        return this.type === 'internal';
    }
}

export default ListItem;
</script>