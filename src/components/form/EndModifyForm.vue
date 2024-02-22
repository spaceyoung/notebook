<template>
  <v-form class="view d-flex flex-column px-0 py-10 px-sm-8 px-lg-15 py-lg-5" flat>
    <v-sheet class="mb-13">
      <BookInfo :book="myReadingEndItem" />
      <BookDesc :book="myReadingEndItem" />
      <BookPlatform :book="myReadingEndItem" />
      <ReadingState :book="myReadingEndItem" />
      <ReadingDate :state="state" :book="myReadingEndItem" />
      <ReadingPage v-if="myReadingEndItem.readingState === '독서 중'" :book="myReadingEndItem" />
      <Rating v-if="myReadingEndItem.readingState === '독서 완료'" :book="myReadingEndItem" />
      <Sentence v-if="myReadingEndItem.readingState === '독서 완료'" :book="myReadingEndItem" />
      <Review v-if="myReadingEndItem.readingState === '독서 완료'" :book="myReadingEndItem" />
    </v-sheet>
    <FormButtons :deleteRecord="deleteRecord" :cancelRecord="cancelRecord" :modifyRecord="endModifyRecord" />
    <CloseButton :cancelRecord="cancelRecord" />
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRecordStore } from '@/stores/record';

import BookInfo from '@/components/form/contents/BookInfo.vue';
import BookDesc from '@/components/form/contents/BookDesc.vue';
import BookPlatform from '@/components/form/contents/BookPlatform.vue';
import ReadingState from '@/components/form/contents/ReadingState.vue';
import ReadingDate from '@/components/form/contents/ReadingDate.vue';
import ReadingPage from '@/components/form/contents/ReadingPage.vue';
import Rating from '@/components/form/contents/Rating.vue';
import Sentence from '@/components/form/contents/Sentence.vue';
import Review from '@/components/form/contents/Review.vue';
import FormButtons from '@/components/form/button/FormButtons.vue';
import CloseButton from '@/components/form/button/CloseButton.vue';

const deleteModal = ref(false);
const currentRoute = useRoute();
const router = useRouter();
const id = currentRoute.params.id;
const { state, addMyReading, updateMyReadingEnd, deleteMyReadingEnd } = useRecordStore();
const myReadingEndList = computed(() => useRecordStore().myReadingEndList);
const myReadingEndItem = myReadingEndList.value.find((myReadingEndItem) => myReadingEndItem.isbn === id);

// 파이어베이스 TimeStamp 변환
myReadingEndItem.readingStartDate = new Date(myReadingEndItem.readingStartDate.seconds * 1000);
myReadingEndItem.readingEndDate = new Date(myReadingEndItem.readingEndDate.seconds * 1000);

const deleteRecord = () => {
  deleteModal.value = false;
  deleteMyReadingEnd(myReadingEndItem.id);
  router.back();
};

const cancelRecord = () => { router.back(); };

const endModifyRecord = () => {
  if (myReadingEndItem.platform && myReadingEndItem.readingState && myReadingEndItem.readingStartDate && myReadingEndItem.readingPage >= 0) {
    if (myReadingEndItem.readingState === '독서 중') {
      myReadingEndItem.readingEndDate = null;
      myReadingEndItem.formattedReadingEndDate = null;
      myReadingEndItem.rating = 0;
      addMyReading(myReadingEndItem);
      deleteMyReadingEnd(myReadingEndItem.id);
      router.push({ name: 'myPage' });
    } else if (myReadingEndItem.readingState === '독서 완료' && myReadingEndItem.readingEndDate) {
      updateMyReadingEnd(myReadingEndItem.id, myReadingEndItem);
      router.push({ name: 'myPage' });
    } else {
      alert('기록에 필요한 정보를 입력해주세요😢');
    }
  } else {
    alert('기록에 필요한 정보를 입력해주세요😢');
  }
};
</script>

<style scoped>
</style>