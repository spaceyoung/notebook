<template>
  <v-dialog v-model="readingStartDateModal">
    <v-card>
      <v-locale-provider locale="ko">
        <v-date-picker v-model="book.readingStartDate" :max="maxStartDate()" title="독서 시작일" hide-header />
      </v-locale-provider>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="outlined" @click="readingStartDateModal = false">취소</v-btn>
        <v-btn class="emphasis" flat @click="closeReadingStartDateModal(book.readingStartDate, book)">확인</v-btn>
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