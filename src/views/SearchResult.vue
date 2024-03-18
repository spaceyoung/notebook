<template>
  <div class="sec-header">
    <h2 class="sec-title">검색 결과</h2>
  </div>
  <Loading v-if="isLoading" />
  <div v-else class="view d-flex flex-column">
    <div v-if="searchBookList.length === 0" class="d-flex justify-center align-center">
      <p>검색 결과가 존재하지 않아요😢</p>
    </div>
    <v-sheet>
      <v-infinite-scroll mode="manual" @load="loadMore">
        <v-list class="d-flex flex-wrap px-0 py-8 pa-sm-8">
          <SearchResultBook :searchBookList="searchBookList" />
        </v-list>
      </v-infinite-scroll>
    </v-sheet>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useSearchStore } from '@/stores/search';
import Loading from '@/components/loading/Loading.vue';
import SearchResultBook from '@/components/card/SearchResultBook.vue';

const { state, searchBookMore } = useSearchStore();
const isLoading = computed(() => useSearchStore().isLoading);
const searchBookList = computed(() => useSearchStore().searchBookList);

const loadMore = async ({ done }) => {
  await searchBookMore();
  if (searchBookList.value.length !== state.searchResults.length) done('ok');
  else done('empty');
};
</script>

<style scoped>
.v-infinite-scroll::-webkit-scrollbar {
  display: none;
}
.v-infinite-scroll::v-deep .v-infinite-scroll__side {
  padding: 0;
}
</style>