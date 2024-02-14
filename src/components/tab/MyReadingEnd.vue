<template>
  <Loading v-if="isLoading" />
  <div v-else class="my-reading-end contents-wrap">
    <div v-if="myReadingEndList.length === 0" class="book-none">
      <p><span>읽은 책을 추가해서</span>나만의 독서 기록을 만들어봐요😉</p>
    </div>
    <v-list v-else class="book-list px-0 py-8 pa-sm-8">
      <MyReadingEndBook />
    </v-list>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useNotebookStore } from '@/stores/index';
import Loading from '@/components/loading/Loading.vue';
import MyReadingEndBook from '@/components/card/MyReadingEndBook.vue';

const { vuefireMyReadingEnd } = useNotebookStore();
const isLoading = computed(() => useNotebookStore().isLoading);
const myReadingEndList = computed(() => useNotebookStore().myReadingEndList);

vuefireMyReadingEnd();
</script>

<style></style>