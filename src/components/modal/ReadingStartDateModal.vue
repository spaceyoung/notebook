<template>
  <v-dialog v-model="readingStartDateModal" width="auto">
    <v-card class="book-date-calendar">
      <v-locale-provider locale="ko">
        <v-date-picker v-model="book.readingStartDate" :max="maxStartDate()" title="독서 시작일" hide-header />
      </v-locale-provider>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="readingStartDateModal = false">취소</v-btn>
        <v-btn @click="closeReadingStartDateModal(book.readingStartDate, book)">확인</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  book: { type: Object, required: true }
});

const readingStartDateModal = ref(false);
const maxStartDate = () => { return props.book.readingEndDate ? props.book.readingEndDate : new Date(); };

// 독서 시작일 Modal 닫기
const closeReadingStartDateModal = (date, book) => {
  const formattedDate = new Intl.DateTimeFormat('kr', { dateStyle: 'medium' }).format(date);
  book.formattedReadingStartDate = formattedDate;
  readingStartDateModal.value = false;
};
</script>

<style></style>