<template>
    <div class="paginable-list">
        <div v-for="[key, item] in current_page_items" :key="key" class="item">
            <list-item :item="item" :action="action"></list-item>
        </div>
        <!-- Pagination -->
        <div v-if="Object.keys(items).length > ITEMS_PER_PAGE">
            <nav class="pagination is-centered is-fixed-bottom" role="navigation" aria-label="pagination">
                <button @click="set_page(page - 1)" :disabled="page === 1" class="button is-outlined pagination-previous">Previous</button>
                <button @click="set_page(page + 1)" :disabled="page === maxPage" class="button is-outlined pagination-next">Next page</button>
                
                <ul class="pagination-list">
                    <li><a v-if="page > 1" @click="set_page(1)" class="pagination-link" aria-label="Goto page 1">1</a></li>
                    
                    <li><span v-if="page > 3" class="pagination-ellipsis">&hellip;</span></li>

                    <li><a v-if="page > 2" @click="set_page(page - 1)" class="pagination-link" :aria-label="`Goto page ${page-1}`">{{page-1}}</a></li>
                    <li><a class="pagination-link is-current" :aria-label="`Page ${page}`" aria-current="page">{{page}}</a></li>
                    <li><a v-if="page < maxPage - 1" @click="set_page(page + 1)" class="pagination-link" :aria-label="`Goto page ${page+1}`">{{page+1}}</a></li>
                    
                    <li><span v-if="page < maxPage - 2" class="pagination-ellipsis">&hellip;</span></li>
                    
                    <li><a v-if="page < maxPage" @click="set_page(maxPage)" class="pagination-link" :aria-label="`Goto page ${maxPage}`">{{maxPage}}</a></li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.item {
  margin-bottom:10px;
}
</style>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import ListItem from '@/components/ListItem.vue';
import Listable from '@/models/listable';

@Component({
    name: 'PaginatedList',
    components: {
        PaginatedList,
        ListItem,
    },
})
class PaginatedList extends Vue {
    @Prop()
    private items!: {[id: string]: Listable};

    @Prop()
    private action!: (item: Listable) => void;

    private ITEMS_PER_PAGE = 10;
    private page = 1;
    private maxPage = Math.ceil(Object.keys(this.items).length / this.ITEMS_PER_PAGE);

    get current_page_items(): Array<[string, Listable]> {
        return Object.entries(this.items).slice((this.page - 1) * this.ITEMS_PER_PAGE, this.page * this.ITEMS_PER_PAGE);
    }

    public set_page(page: number) {
        this.page = page;
    }
}

export default PaginatedList;
</script>