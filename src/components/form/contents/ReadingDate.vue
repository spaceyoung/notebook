<template>
  <div class="d-flex flex-wrap align-center mb-12">
    <!-- 독서 시작일 -->
    <div>
      <span class="d-flex align-center mb-3">
        <v-icon icon="mdi-book-edit-outline" class="mr-2" />
        독서 시작일
      </span>
      <v-text-field class="qwer"
        :model-value="book.formattedReadingStartDate"
        :rules="startDateRule"
        placeholder="독서 시작일"
        variant="solo"
        prepend-inner-icon="mdi-calendar-month"
        hide-details="auto"
        flat
        readonly
      >
        <ReadingStartDateModal activator="parent" :book="book" />
      </v-text-field>
    </div>
    <!-- 독서 완료일 -->
    <div v-if="book.readingState === '독서 완료'">
      <span class="d-flex align-center mb-3">
        <v-icon icon="mdi-book-edit-outline" class="mr-2" />
        독서 완료일
      </span>
      <v-text-field
        :model-value="book.formattedReadingEndDate"
        :rules="endDateRule"
        placeholder="독서 완료일"
        variant="solo"
        prepend-inner-icon="mdi-calendar-month"
        hide-details="auto"
        flat
        readonly
      >
        <ReadingEndDateModal activator="parent" :book="book" />
      </v-text-field>
    </div>
  </div>
</template>

<script setup>
import ReadingStartDateModal from '@/components/modal/ReadingStartDateModal.vue';
import ReadingEndDateModal from '@/components/modal/ReadingEndDateModal.vue';

const props = defineProps({
  book: { type: Object, required: true },
});

// 독서 시작/완료일 입력 필드 rule
const startDateRule = [value => !!value || '독서를 시작한 날짜를 알려주세요.'];
const endDateRule = [value => !!value || '독서를 완료한 날짜를 알려주세요.'];
</script>

<style scoped>
.v-sheet > div > div {
  width: 50%;
}
.v-text-field {
  width: 75%;
}

/******************************
      max-width: 599px;
******************************/
@media all and (max-width: 599px) {
  .v-sheet > div {
    gap: 48px;
  }
  .v-sheet > div > div {
    width: 100%;
  }
}
</style>