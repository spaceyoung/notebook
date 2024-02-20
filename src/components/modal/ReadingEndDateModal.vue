<template>
  <v-dialog v-model="readingEndDateModal">
    <v-card>
      <v-locale-provider locale="ko">
        <v-date-picker v-model="book.readingEndDate" :min="book.readingStartDate" :max="new Date()" title="독서 완료일" hide-header />
      </v-locale-provider>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="outlined" @click="readingEndDateModal = false">취소</v-btn>
        <v-btn class="emphasis" flat @click="closeReadingEndDateModal(book.readingEndDate, book)">확인</v-btn>
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

<style scoped>
.v-dialog::v-deep .v-overlay__content {
  width: auto;
}
.v-date-picker::v-deep .v-date-picker-month__day--selected .v-btn {
  background-color: #ca4f34;
}
.v-date-picker::v-deep .v-date-picker-month__day--selected .v-btn:hover {
  color: #fff;
}

/******************************
      max-width: 599px;
******************************/
@media all and (max-width: 599px) {
  .v-date-picker {
    display: block;
    width: auto;
  }
  .v-date-picker::v-deep .v-date-picker-month {
    min-width: 0;
  }
  .v-date-picker::v-deep .v-date-picker-month__day {
    width: 40px;
    height: 40px;
  }
}
</style>