<template>
  <v-form class="end-modify view px-0 py-10 px-sm-8 px-lg-15 py-lg-5" variant="flat">
    <div class="mb-13">
      <BookInfo :book="myReadingEndItem" />
      <BookDesc :book="myReadingEndItem" />
      <BookPlatform :state="state" :book="myReadingEndItem" />
      <ReadingState :state="state" :book="myReadingEndItem" />
      <ReadingDate :state="state" :book="myReadingEndItem" />
      <ReadingPage v-if="myReadingEndItem.readingState === '독서 중'" :book="myReadingEndItem" />
      <Rate v-if="myReadingEndItem.readingState === '독서 완료'" :book="myReadingEndItem" />
      <Sentence v-if="myReadingEndItem.readingState === '독서 완료'" :book="myReadingEndItem" />
      <Review v-if="myReadingEndItem.readingState === '독서 완료'" :book="myReadingEndItem" />
    </div>
    <FormButtons :deleteRecord="deleteRecord" :cancelRecord="cancelRecord" :modifyRecord="endModifyRecord" />
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
const { state, addMyReading, updateMyReadingEnd, deleteMyReadingEnd } = useNotebookStore();
const myReadingEndList = computed(() => useNotebookStore().myReadingEndList);
const myReadingEndItem = myReadingEndList.value.find((myReadingEndItem) => myReadingEndItem.isbn === id);

// 파이어베이스 TimeStamp 변환
myReadingEndItem.startDate = new Date(myReadingEndItem.startDate.seconds * 1000);
myReadingEndItem.endDate = new Date(myReadingEndItem.endDate.seconds * 1000);

const deleteRecord = () => {
  state.deleteModal = false;
  deleteMyReadingEnd(myReadingEndItem.id);
  router.push({ name: 'home' });
};

const cancelRecord = () => { router.back(); };

const endModifyRecord = () => {
  if (myReadingEndItem.platform && myReadingEndItem.readingState && myReadingEndItem.startDate && myReadingEndItem.readingPage >= 0) {
    if (myReadingEndItem.readingState === '독서 중') {
      myReadingEndItem.endDate = null;
      myReadingEndItem.formattedEndDate = null;
      myReadingEndItem.rating = 0;
      addMyReading(myReadingEndItem);
      deleteMyReadingEnd(myReadingEndItem.id);
      router.push({ name: 'home' });
    } else if (myReadingEndItem.readingState === '독서 완료' && myReadingEndItem.endDate) {
      updateMyReadingEnd(myReadingEndItem.id, myReadingEndItem);
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
.end-modify .book-buttons {
  flex-wrap: wrap;
}
</style>