<template>
  <v-card class="record view d-flex flex-column px-0 py-10 px-sm-8 px-lg-15 py-lg-5" variant="flat">
    <BookInfo :book="recordBook" />
    <BookDesc :book="recordBook" />
    <v-form class="mb-13">
      <BookPlatform :state="state" :book="recordBook" />
      <ReadingState :state="state" :book="recordBook" />
      <ReadingDate :state="state" :book="recordBook" />
      <ReadingPage v-if="recordBook.readingState === '독서 중'" :book="recordBook" />
      <Rate v-if="recordBook.readingState === '독서 완료'" :book="recordBook" />
      <Sentence v-if="recordBook.readingState === '독서 완료'" :book="recordBook" />
      <Review v-if="recordBook.readingState === '독서 완료'" :book="recordBook" />
    </v-form>
    <v-card-actions class="book-buttons justify-center">
      <v-btn class="cancel-button ma-0 px-8" variant="outlined" size="large" @click="cancelRecord">취소하기</v-btn>
      <v-btn class="record-button ma-0 ml-5 px-8" variant="outlined" size="large" @click="addRecord">기록하기</v-btn>
    </v-card-actions>
    <v-card-actions class="close-button flex-0-0 align-self-end order-first pa-0">
      <v-btn class="pa-0" size="large" @click="cancelRecord">
        <v-icon icon="mdi-window-close" size="x-large" />
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNotebookStore } from '@/stores/index';

import BookInfo from '@/components/contents/BookInfo.vue';
import BookDesc from '@/components/contents/BookDesc.vue';
import BookPlatform from '@/components/contents/BookPlatform.vue';
import ReadingState from '@/components/contents/ReadingState.vue';
import ReadingDate from '@/components/contents/ReadingDate.vue';
import ReadingPage from '@/components/contents/ReadingPage.vue';
import Rate from '@/components/contents/Rate.vue';
import Sentence from '@/components/contents/Sentence.vue';
import Review from '@/components/contents/Review.vue';

const currentRoute = useRoute();
const router = useRouter();
const id = currentRoute.params.id;
const { state, addMyReading, addMyReadingEnd } = useNotebookStore();
const searchBookList = computed(() => useNotebookStore().searchBookList);
const selectBook = searchBookList.value.find((searchBookItem) => searchBookItem.isbn === id);
const recordBook = ref({ ...selectBook, ...state.recordBookDefault });

const cancelRecord = () => { router.back(); };

const addRecord = () => {
  if (recordBook.value.platform && recordBook.value.readingState && recordBook.value.startDate && recordBook.value.readingPage >= 0) {
    if (recordBook.value.readingState === '독서 중') {
      addMyReading(recordBook.value);
      router.push({ name: 'home' });
    } else if (recordBook.value.readingState === '독서 완료' && recordBook.value.endDate) {
      addMyReadingEnd(recordBook.value);
      router.push({ name: 'home' });
    } else {
      alert('기록에 필요한 정보를 입력해주세요😢');
    }
  } else {
    alert('기록에 필요한 정보를 입력해주세요😢');
  }
};
</script>

<style></style>
