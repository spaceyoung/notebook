<template>
  <Loading v-if="isLoading" />
  <div v-else class="search-result contents-wrap view">
    <div v-if="searchBookList.length === 0" class="book-none">
      <p>검색 결과가 존재하지 않아요😢</p>
    </div>

    <!-- <template>
      <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items-length="totalItems"
        :items="serverItems" :loading="loading" :search="search" item-value="name"
        @update:options="loadItems"></v-data-table-server>
    </template> -->

    <!-- <v-infinite-scroll mode="manual" @load="load">
      <v-list class="book-list px-0 py-8 pa-sm-8">
        <v-card v-for="(searchBookItem, index) in searchBookList" :key="searchBookItem.isbn"
          class="book-item pa-1 pa-sm-3" variant="flat">
          <v-img :src="searchBookItem.cover" :alt="searchBookItem.title" class="book-cover mr-6 mr-sm-8" cover />
          <div class="book-info py-1 py-sm-2">
            <v-card-item class="mb-1 pa-0">
              <v-card-title class="book-title">{{ searchBookItem.title }}</v-card-title>
            </v-card-item>
            <v-card-text class="mb-auto pa-0">
              <span class="book-author">{{ searchBookItem.author }}</span>
              <span class="book-publisher">{{ searchBookItem.publisher }}</span>
              <span class="book-pubdate">{{ searchBookItem.pubDate }}</span>
            </v-card-text>
            <v-card-actions class="book-record-button pa-0">
              <router-link :to="{ name: 'record/id', params: { id: searchBookItem.isbn } }">
                <v-btn class="px-4" variant="outlined">기록하기</v-btn>
              </router-link>
            </v-card-actions>
          </div>
        </v-card>
      </v-list>
    </v-infinite-scroll> -->

    <v-list class="book-list px-0 py-8 pa-sm-8">
      <v-card v-for="searchBookItem in searchBookList" :key="searchBookItem.isbn" class="book-item pa-1 pa-sm-3"
        variant="flat">
        <v-img :src="searchBookItem.cover" :alt="searchBookItem.title" class="book-cover mr-6 mr-sm-8" cover />
        <div class="book-info py-1 py-sm-2">
          <v-card-item class="mb-1 pa-0">
            <v-card-title class="book-title">{{ searchBookItem.title }}</v-card-title>
          </v-card-item>
          <v-card-text class="mb-auto pa-0">
            <span class="book-author">{{ searchBookItem.author }}</span>
            <span class="book-publisher">{{ searchBookItem.publisher }}</span>
            <span class="book-pubdate">{{ searchBookItem.pubDate }}</span>
          </v-card-text>
          <v-card-actions class="book-record-button pa-0">
            <router-link :to="{ name: 'record/id', params: { id: searchBookItem.isbn } }">
              <v-btn class="px-4" variant="outlined" size="large">기록하기</v-btn>
            </router-link>
          </v-card-actions>
        </div>
      </v-card>
    </v-list>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useNotebookStore } from '@/stores/index';
import Loading from '@/components/contents/Loading.vue';
const isLoading = computed(() => useNotebookStore().isLoading);
const searchBookList = computed(() => useNotebookStore().searchBookList);

// const data = reactive({ items: Array.from({ length: 30 }, (v, k) => searchBookList) });
// const load = ({ done }) => {
//   setTimeout(() => {
//     data.items.push(Array.from({ length: 30 }, searchBookList));
//     done('ok');
//   }, 1000);
// };
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