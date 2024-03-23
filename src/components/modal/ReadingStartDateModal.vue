<template>
  <v-dialog v-model="readingStartDateModal">
    <v-card>
      <v-locale-provider locale="ko">
        <v-date-picker
          v-model="book.readingStartDate"
          :max="maxStartDate"
          title="독서 시작일"
          hide-header
        />
      </v-locale-provider>
      <v-card-actions>
        <v-spacer />
        <v-btn
          variant="outlined"
          @click="readingStartDateModal = false"
        >
          취소
        </v-btn>
        <v-btn
          class="emphasis"
          flat
          @click="closeReadingStartDateModal(book.readingStartDate, book)"
        >
          확인
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  book: { type: Object, required: true },
});

const readingStartDateModal = ref(false);

// 독서 시작일 최대일
const maxStartDate = props.book.readingEndDate ? props.book.readingEndDate : new Date();

// 독서 시작일 modal 닫기
const closeReadingStartDateModal = (date, book) => {
  // 날짜 형식 설정(yyyy-mm-dd)
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const formattedDate = `${year}-${month}-${day}`;
  book.formattedReadingStartDate = formattedDate;
  readingStartDateModal.value = false;
};
</script>

<style scoped>
.v-dialog::v-deep .v-overlay__content {
  width: auto;
}
</style>