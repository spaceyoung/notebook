<template>
  <v-form class="view d-flex flex-column px-0 py-10 px-sm-8 px-lg-15 py-lg-5" flat>
    <v-sheet class="mb-13">
      <BookInfo :book="myReadingItem" />
      <BookDesc :book="myReadingItem" />
      <BookPlatform :book="myReadingItem" />
      <ReadingState :book="myReadingItem" />
      <ReadingDate :state="state" :book="myReadingItem" />
      <ReadingPage v-if="myReadingItem.readingState === '독서 중'" :book="myReadingItem" />
      <Rating v-if="myReadingItem.readingState === '독서 완료'" :book="myReadingItem" />
      <Sentence v-if="myReadingItem.readingState === '독서 완료'" :book="myReadingItem" />
      <Review v-if="myReadingItem.readingState === '독서 완료'" :book="myReadingItem" />
    </v-sheet>
    <FormButtons :deleteRecord="deleteRecord" :cancelRecord="cancelRecord" :modifyRecord="modifyRecord" />
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
const { state, updateMyReading, deleteMyReading, addMyReadingEnd } = useRecordStore();
const myReadingList = computed(() => useRecordStore().myReadingList);
const myReadingItem = myReadingList.value.find((myReadingItem) => myReadingItem.isbn === id);

// 파이어베이스 TimeStamp 변환
myReadingItem.readingStartDate = new Date(myReadingItem.readingStartDate.seconds * 1000);

const deleteRecord = () => {
  deleteModal.value = false;
  deleteMyReading(myReadingItem.id);
  router.back();
};

const cancelRecord = () => { router.back(); };

const modifyRecord = () => {
  if (myReadingItem.platform && myReadingItem.readingState && myReadingItem.readingStartDate && myReadingItem.readingPage >= 0) {
    if (myReadingItem.readingState === '독서 중') {
      updateMyReading(myReadingItem.id, myReadingItem);
      router.push({ name: 'myPage' });
    } else if (myReadingItem.readingState === '독서 완료' && myReadingItem.readingEndDate) {
      addMyReadingEnd(myReadingItem);
      deleteMyReading(myReadingItem.id);
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