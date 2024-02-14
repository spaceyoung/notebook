<template>
  <v-dialog v-model="state.startModal" width="auto">
    <v-card class="book-date-calendar">
      <v-locale-provider locale="ko">
        <v-date-picker v-model="book.startDate" :max="maxStartDate()" title="독서 시작일" hide-header />
      </v-locale-provider>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="state.startModal = false">취소</v-btn>
        <v-btn @click="closeDateModal(book.startDate, book)">확인</v-btn>
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
const maxStartDate = () => { return props.book.endDate ? props.book.endDate : new Date(); };
</script>

<style></style>