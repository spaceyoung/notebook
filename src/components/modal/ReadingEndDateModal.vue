<template>
  <v-dialog v-model="readingEndDateModal">
    <v-card>
      <v-locale-provider locale="ko">
        <v-date-picker
          v-model="book.readingEndDate"
          :min="book.readingStartDate"
          :max="new Date()"
          title="독서 완료일"
          hide-header
        />
      </v-locale-provider>
      <v-card-actions>
        <v-spacer />
        <v-btn
          variant="outlined"
          @click="readingEndDateModal = false"
        >
          취소
        </v-btn>
        <v-btn
          class="emphasis"
          flat
          @click="closeReadingEndDateModal(book.readingEndDate, book)"
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

const readingEndDateModal = ref(false);

// 독서 완료일 modal 닫기
const closeReadingEndDateModal = (date, book) => {
  // 날짜 형식 설정(yyyy-mm-dd)
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const formattedDate = `${year}-${month}-${day}`;
  book.formattedReadingEndDate = formattedDate;
  readingEndDateModal.value = false;
};
</script>

<style scoped>
.v-dialog::v-deep .v-overlay__content {
  width: auto;
}
</style>