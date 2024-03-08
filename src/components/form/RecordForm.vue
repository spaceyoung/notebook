<template>
  <v-form ref="form" class="view d-flex flex-column px-0 py-10 px-sm-8 px-lg-15 py-lg-5" flat>
    <v-sheet class="mb-13">
      <BookInfo :book="recordBook" />
      <BookDesc :book="recordBook" />
      <BookPlatform :book="recordBook" />
      <ReadingState :book="recordBook" />
      <ReadingDate :book="recordBook" />
      <ReadingPage v-if="recordBook.readingState === '독서 중'" :book="recordBook" />
      <Rating v-if="recordBook.readingState === '독서 완료'" :book="recordBook" />
      <Sentence v-if="recordBook.readingState === '독서 완료'" :book="recordBook" />
      <Review v-if="recordBook.readingState === '독서 완료'" :book="recordBook" />
    </v-sheet>
    <FormButtons :cancelRecord="cancelRecord" :addRecord="addRecord" :currentUser="currentUser"/>
    <CloseButton :cancelRecord="cancelRecord" />
  </v-form>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSearchStore } from '@/stores/search';
import { useRecordStore } from '@/stores/record';
import { useMemberStore } from '@/stores/member';

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

const currentRoute = useRoute();
const router = useRouter();
const id = currentRoute.params.id;
const searchBookList = computed(() => useSearchStore().searchBookList);
const { state, addMyReading, addMyReadingEnd } = useRecordStore();
const currentUser = computed(() => useMemberStore().currentUser);
const selectBook = searchBookList.value.find((searchBookItem) => searchBookItem.isbn === id);
const recordBook = ref({ ...selectBook, ...state.recordBookDefault });

const cancelRecord = () => { router.back(); };

const form = ref(null);
const addRecord = async () => {
  const { valid } = await form.value.validate();
  if (valid && recordBook.value.platform && recordBook.value.readingState) {
    if (recordBook.value.readingState === '독서 중') addMyReading(recordBook.value);
    else if (recordBook.value.readingState === '독서 완료') addMyReadingEnd(recordBook.value);
    router.push({ name: 'home' });
  }
  else alert ('기록에 필요한 정보를 입력해주세요😢');
};
</script>

<style scoped>
.v-form::v-deep v-item-groups {
  justify-content: center;
}

/******************************
      max-width: 599px;
******************************/
@media all and (max-width: 599px) {
  .v-form::v-deep v-item-groups .v-btn {
    width: calc((100% - 20px) / 2);
  }
}
</style>
