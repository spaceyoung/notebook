<template>
  <div class="sec-header">
    <h2 class="sec-title">검색 결과</h2>
  </div>
  <Loading v-if="isLoading" />
  <div v-else class="view d-flex flex-column">
    <div v-if="searchBookList.length === 0" class="d-flex justify-center align-center">
      <p>검색 결과가 존재하지 않아요😢</p>
    </div>
    <v-list class="d-flex flex-wrap px-0 py-8 pa-sm-8">
      <SearchResultBook :searchBookList="searchBookList" />
    </v-list>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useSearchStore } from '@/stores/search';
import Loading from '@/components/loading/Loading.vue';
import SearchResultBook from '@/components/card/SearchResultBook.vue';

const isLoading = computed(() => useSearchStore().isLoading);
const searchBookList = computed(() => useSearchStore().searchBookList);
</script>

<style scoped>
.view::-webkit-scrollbar {
  display: none;
}
.v-list::-webkit-scrollbar {
  width: 8px;
}
.v-list::-webkit-scrollbar-thumb {
  background: #ca4f34;
  border-radius: 4px;
}
.v-list::-webkit-scrollbar-track {
  background: #e4d4cf;
  border-radius: 4px;
}

/******************************
      max-width: 1279px;
******************************/
@media all and (max-width: 1279px) {
  .v-list::-webkit-scrollbar {
    display: none;
  }
}
</style>