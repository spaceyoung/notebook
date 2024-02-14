<template>
  <v-dialog v-model="state.readingEndDateModal" width="auto">
    <v-card class="book-date-calendar">
      <v-locale-provider locale="ko">
        <v-date-picker v-model="book.readingEndDate" :min="book.readingStartDate" :max="new Date()" title="독서 완료일"
          hide-header />
      </v-locale-provider>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="state.readingEndDateModal = false">취소</v-btn>
        <v-btn @click="closeDateModal(book.readingEndDate, book)">확인</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useNotebookStore } from '@/stores/index';

const props = defineProps({
  book: { type: Object, required: true }
});

const { state, closeDateModal } = useNotebookStore();
</script>

<style></style>