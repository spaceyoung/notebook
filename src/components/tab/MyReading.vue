<template>
  <Loading v-if="isLoading" />
  <div v-else class="my-reading contents-wrap">
    <div v-if="myReadingList.length === 0" class="book-none">
      <p><span>읽은 책을 추가해서</span>나만의 독서 기록을 만들어봐요😉</p>
    </div>
    <v-list v-else class="book-list px-0 py-8 pa-sm-8">
      <MyReadingBook />
    </v-list>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRecordStore } from '@/stores/record';
import Loading from '@/components/loading/Loading.vue';
import MyReadingBook from '@/components/card/MyReadingBook.vue';

const { inquiryMyReading } = useRecordStore();
const isLoading = computed(() => useRecordStore().isLoading);
const myReadingList = computed(() => useRecordStore().myReadingList);
inquiryMyReading();
</script>

<style scoped>
/******************************
      max-width: 599px;
******************************/
@media all and (max-width: 599px) {
  /******************************
            COMPONENTS
  ******************************/
  /* -------------------- BookInfo -------------------- */
  .contents .book-info .book-progress .book-reading-start {
    font-size: .95em;
  }
}
</style>