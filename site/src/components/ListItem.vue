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
                    <a @click="action(item)"><strong >{{item.title}}</strong></a> <small v-if="item.date"> {{item.date}}</small>
                    <br>
                    {{item.summary}}
                    <div class="tags">
                        <span class="tag" v-for="tag in item.tags" :key="tag">#{{tag}}</span>
                    </div>
                </p>
            </div>
        </div>
        <div class="media-right">
            <button v-if="action" @click="action(item)" aria-label="Button"
                class="button is-white" >
                <span class="icon">
                    <i class="fas fa-angle-right" aria-hidden="true"></i>
                </span>
            </button>
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
    private action!: (item: Listable) => void;
}

export default ListItem;
</script>