<template>
  <v-form
    ref="endModifyForm"
    class="view d-flex flex-column px-0 py-10 px-sm-8 px-lg-15 py-lg-5"
    flat
  >
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
    <FormButtons
      :deleteRecord="deleteRecord"
      :cancelRecord="cancelRecord"
      :modifyRecord="modifyRecord"
    />
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

const endModifyForm = ref(null);
const deleteModal = ref(false);

const currentRoute = useRoute();
const router = useRouter();
const id = currentRoute.params.id;

const recordStore = useRecordStore();
const { state, addMyReading, updateMyReadingEnd, deleteMyReadingEnd } = recordStore;
const myReadingEndList = computed(() => recordStore.myReadingEndList);
const myReadingEndItem = myReadingEndList.value.find(myReadingEndItem => myReadingEndItem.isbn === id);

// 파이어베이스 DB에 저장된 timeStamp 형식 변환
myReadingEndItem.readingStartDate = new Date(myReadingEndItem.readingStartDate.seconds * 1000);
myReadingEndItem.readingEndDate = new Date(myReadingEndItem.readingEndDate.seconds * 1000);

// 삭제하기
const deleteRecord = () => {
  deleteModal.value = false;
  deleteMyReadingEnd(myReadingEndItem.id);
  router.push({ name: 'home' });
};

// 취소하기
const cancelRecord = () => { router.back(); };

// 수정하기
const modifyRecord = async () => {
  const { valid } = await endModifyForm.value.validate();
  if (valid && myReadingEndItem.platform && myReadingEndItem.readingState) {
    // 독서 상태가 '독서 중'이면 myReading에 저장
    if (myReadingEndItem.readingState === '독서 중') {
      addMyReading(myReadingEndItem);
      deleteMyReadingEnd(myReadingEndItem.id);
    }
    // 독서 상태가 '독서 완료'면 myReadingEnd 업데이트
    else if (myReadingEndItem.readingState === '독서 완료') {
      updateMyReadingEnd(myReadingEndItem.id, myReadingEndItem);
    }
    router.push({ name: 'home' });
  }
  else alert ('기록에 필요한 정보를 정확하게 입력해주세요😢');
};
</script>

<style scoped>
</style>