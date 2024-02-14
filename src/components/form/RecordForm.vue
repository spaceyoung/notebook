<template>
  <v-form class="record view px-0 py-10 px-sm-8 px-lg-15 py-lg-5" variant="flat">
    <div class="mb-13">
      <BookInfo :book="recordBook" />
      <BookDesc :book="recordBook" />
      <BookPlatform :state="state" :book="recordBook" />
      <ReadingState :state="state" :book="recordBook" />
      <ReadingDate :book="recordBook" />
      <ReadingPage v-if="recordBook.readingState === '독서 중'" :book="recordBook" />
      <Rate v-if="recordBook.readingState === '독서 완료'" :book="recordBook" />
      <Sentence v-if="recordBook.readingState === '독서 완료'" :book="recordBook" />
      <Review v-if="recordBook.readingState === '독서 완료'" :book="recordBook" />
    </div>
    <FormButtons :cancelRecord="cancelRecord" :addRecord="addRecord" />
    <v-btn class="close-button pa-0" size="large" @click="cancelRecord">
      <v-icon icon="mdi-window-close" size="x-large" />
    </v-btn>
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNotebookStore } from '@/stores/index';

import BookInfo from '@/components/form/contents/BookInfo.vue';
import BookDesc from '@/components/form/contents/BookDesc.vue';
import BookPlatform from '@/components/form/contents/BookPlatform.vue';
import ReadingState from '@/components/form/contents/ReadingState.vue';
import ReadingDate from '@/components/form/contents/ReadingDate.vue';
import ReadingPage from '@/components/form/contents/ReadingPage.vue';
import Rate from '@/components/form/contents/Rate.vue';
import Sentence from '@/components/form/contents/Sentence.vue';
import Review from '@/components/form/contents/Review.vue';
import FormButtons from '@/components/form/buttons/FormButtons.vue';

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

<style scoped>
.record .book-buttons {
  justify-content: center;
}
</style>
