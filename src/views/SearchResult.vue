<template>
  <div class="sec-header">
    <h2 class="sec-title">검색 결과</h2>
  </div>
  <Loading v-if="isLoading" />
  <div v-else class="search-result contents-wrap view">
    <div v-if="searchBookList.length === 0" class="book-none">
      <p>검색 결과가 존재하지 않아요😢</p>
    </div>
    <v-list class="book-list px-0 py-8 pa-sm-8">
      <SearchResultBook :searchBookList="searchBookList" />
    </v-list>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useNotebookStore } from '@/stores/index';
import Loading from '@/components/loading/Loading.vue';
import SearchResultBook from '@/components/card/SearchResultBook.vue';

const isLoading = computed(() => useNotebookStore().isLoading);
const searchBookList = computed(() => useNotebookStore().searchBookList);
</script>

<style scoped>
.contents .view::-webkit-scrollbar {
  display: none;
}
.contents .book-list::-webkit-scrollbar {
  width: 8px;
}
.contents .book-list::-webkit-scrollbar-thumb {
  background: #ca4f34;
  border-radius: 4px;
}
.contents .book-list::-webkit-scrollbar-track {
  background: #e4d4cf;
  border-radius: 4px;
}
.contents .book-info .book-author {
  display: -webkit-box;
  white-space: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/******************************
      max-width: 599px;
******************************/
/* -------------------- BookInfo -------------------- */
.contents .book-info .book-author {
  display: block;
  white-space: nowrap;
}
</style>