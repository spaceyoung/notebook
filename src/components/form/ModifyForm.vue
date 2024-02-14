<template>
  <v-form class="modify view px-0 py-10 px-sm-8 px-lg-15 py-lg-5" variant="flat">
    <div class="mb-13">
      <BookInfo :book="myReadingItem" />
      <BookDesc :book="myReadingItem" />
      <BookPlatform :state="state" :book="myReadingItem" />
      <ReadingState :state="state" :book="myReadingItem" />
      <ReadingDate :state="state" :book="myReadingItem" />
      <ReadingPage v-if="myReadingItem.readingState === '독서 중'" :book="myReadingItem" />
      <Rate v-if="myReadingItem.readingState === '독서 완료'" :book="myReadingItem" />
      <Sentence v-if="myReadingItem.readingState === '독서 완료'" :book="myReadingItem" />
      <Review v-if="myReadingItem.readingState === '독서 완료'" :book="myReadingItem" />
    </div>
    <FormButtons :deleteRecord="deleteRecord" :cancelRecord="cancelRecord" :modifyRecord="modifyRecord" />
    <v-btn class="close-button pa-0" size="large" @click="cancelRecord">
      <v-icon icon="mdi-window-close" size="x-large" />
    </v-btn>
  </v-form>
</template>

<script setup>
import { computed } from 'vue';
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
import FormButtons from '@/components/form/button/FormButtons.vue';

const currentRoute = useRoute();
const router = useRouter();
const id = currentRoute.params.id;
const { state, updateMyReading, deleteMyReading, addMyReadingEnd } = useNotebookStore();
const myReadingList = computed(() => useNotebookStore().myReadingList);
const myReadingItem = myReadingList.value.find((myReadingItem) => myReadingItem.isbn === id);

// 파이어베이스 TimeStamp 변환
myReadingItem.startDate = new Date(myReadingItem.startDate.seconds * 1000);

const deleteRecord = () => {
  state.deleteModal = false;
  deleteMyReading(myReadingItem.id);
  router.back();
};

const cancelRecord = () => { router.back(); };

const modifyRecord = () => {
  if (myReadingItem.platform && myReadingItem.readingState && myReadingItem.startDate && myReadingItem.readingPage >= 0) {
    if (myReadingItem.readingState === '독서 중') {
      updateMyReading(myReadingItem.id, myReadingItem);
      router.push({ name: 'home' });
    } else if (myReadingItem.readingState === '독서 완료' && myReadingItem.endDate) {
      addMyReadingEnd(myReadingItem);
      deleteMyReading(myReadingItem.id);
      router.push({ name: 'home' });
    } else {
      alert('기록에 필요한 정보를 입력해주세요😢');
    }
  } else {
    alert('기록에 필요한 정보를 입력해주세요😢');
  }
};
</script>

<style scoped></style>