<template>
  <v-card class="modify view px-0 py-10 px-sm-8 px-lg-15 py-lg-5" variant="flat">
    <BookInfo :book="myReadingItem" />
    <BookDesc :book="myReadingItem" />
    <v-form class="mb-13">
      <BookPlatform :state="state" :book="myReadingItem" />
      <ReadingState :state="state" :book="myReadingItem" />
      <ReadingDate :state="state" :book="myReadingItem" />
      <ReadingPage v-if="myReadingItem.readingState === '독서 중'" :book="myReadingItem" />
      <Rate v-if="myReadingItem.readingState === '독서 완료'" :book="myReadingItem" />
      <Sentence v-if="myReadingItem.readingState === '독서 완료'" :book="myReadingItem" />
      <Review v-if="myReadingItem.readingState === '독서 완료'" :book="myReadingItem" />
    </v-form>
    <v-card-actions class="book-buttons">
      <v-btn class="delete-button ma-0 mr-sm-auto px-8" variant="outlined" size="large" @click="deleteRecord">삭제하기</v-btn>
      <v-btn class="cancel-button ma-0 px-8" variant="outlined" size="large" @click="cancelRecord">취소하기</v-btn>
      <v-btn class="modify-button ma-0 ml-sm-5 px-8" variant="outlined" size="large" @click="modifyRecord">수정하기</v-btn>
    </v-card-actions>
    <v-card-actions class="close-button pa-0">
      <v-btn class="pa-0" size="large" @click="cancelRecord">
        <v-icon icon="mdi-window-close" size="x-large" />
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { computed } from 'vue';
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
const { state, updateMyReading, deleteMyReading, addMyReadingEnd } = useNotebookStore();
const myReadingList = computed(() => useNotebookStore().myReadingList);
const myReadingItem = myReadingList.value.find((myReadingItem) => myReadingItem.isbn === id);

// 파이어베이스 TimeStamp 변환
myReadingItem.startDate = new Date(myReadingItem.startDate.seconds * 1000);

const deleteRecord = () => {
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

<style scoped>
.modify .book-buttons {
  flex-wrap: wrap;
}
</style>