<template>
  <div class="book-date mb-12">
    <div class="book-date-start">
      <span class="book-caption mb-3">
        <v-icon icon="mdi-book-edit-outline" class="mr-2" />독서 시작일
      </span>
      <v-dialog v-model="state.startModal" width="auto">
        <template v-slot:activator="{ props }">
          <v-text-field v-bind="props" :model-value="book.formattedStartDate" :rules="startDateRule" placeholder="독서 시작일"
            variant="solo" prepend-inner-icon="mdi-calendar-month" hide-details="auto" flat />
        </template>
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
    </div>
    <div v-if="book.readingState === '독서 완료'" class="book-date-end">
      <span class="book-caption mb-3">
        <v-icon icon="mdi-book-edit-outline" class="mr-2" />독서 완료일
      </span>
      <v-dialog v-model="state.endModal" width="auto">
        <template v-slot:activator="{ props }">
          <v-text-field v-bind="props" :model-value="book.formattedEndDate" :rules="endDateRule" placeholder="독서 완료일"
            variant="solo" prepend-inner-icon="mdi-calendar-month" hide-details="auto" flat />
        </template>
        <v-card class="book-date-calendar">
          <v-locale-provider locale="ko">
            <v-date-picker v-model="book.endDate" :min="book.startDate" :max="new Date()" title="독서 완료일" hide-header />
          </v-locale-provider>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="state.endModal = false">취소</v-btn>
            <v-btn @click="closeDateModal(book.endDate, book)">확인</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import { useNotebookStore } from '@/stores/index';
const props = defineProps({
  state: { type: Object, required: true },
  book: { type: Object, required: true }
});

const { closeDateModal } = useNotebookStore();
const startDateRule = [value => !!value || '독서를 시작한 날짜를 알려주세요.'];
const endDateRule = [value => !!value || '독서를 완료한 날짜를 알려주세요.'];
const maxStartDate = () => { return props.book.endDate ? props.book.endDate : new Date(); };
</script>

<style>
.v-date-picker-month__day--selected .v-btn {
  background-color: #ca4f34;
}
</style>