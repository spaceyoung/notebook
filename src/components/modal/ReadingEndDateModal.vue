<template>
  <v-dialog v-model="readingEndDateModal" width="auto">
    <v-card class="book-date-calendar">
      <v-locale-provider locale="ko">
        <v-date-picker v-model="book.readingEndDate" :min="book.readingStartDate" :max="new Date()" title="독서 완료일"
          hide-header />
      </v-locale-provider>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="readingEndDateModal = false">취소</v-btn>
        <v-btn @click="closeReadingEndDateModal(book.readingEndDate, book)">확인</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  book: { type: Object, required: true }
});

const readingEndDateModal = ref(false);

// 독서 완료일 Modal 닫기
const closeReadingEndDateModal = (date, book) => {
  const formattedDate = new Intl.DateTimeFormat('kr', { dateStyle: 'medium' }).format(date);
  book.formattedReadingEndDate = formattedDate;
  readingEndDateModal.value = false;
};
</script>

<style></style>