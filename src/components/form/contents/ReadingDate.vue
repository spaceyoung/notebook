<template>
  <div class="book-date mb-12">
    <div class="book-date-start">
      <span class="book-caption mb-3">
        <v-icon icon="mdi-book-edit-outline" class="mr-2" />독서 시작일
      </span>
      <v-text-field :model-value="book.formattedReadingStartDate" :rules="startDateRule" placeholder="독서 시작일"
        variant="solo" prepend-inner-icon="mdi-calendar-month" hide-details="auto" flat>
        <ReadingStartDateModal activator="parent" :book="book" />
      </v-text-field>
    </div>
    <div v-if="book.readingState === '독서 완료'" class="book-date-end">
      <span class="book-caption mb-3">
        <v-icon icon="mdi-book-edit-outline" class="mr-2" />독서 완료일
      </span>
      <v-text-field :model-value="book.formattedReadingEndDate" :rules="endDateRule" placeholder="독서 완료일" variant="solo"
        prepend-inner-icon="mdi-calendar-month" hide-details="auto" flat>
        <ReadingEndDateModal activator="parent" :book="book" />
      </v-text-field>
    </div>
  </div>
</template>

<script setup>
import ReadingStartDateModal from '@/components/modal/ReadingStartDateModal.vue';
import ReadingEndDateModal from '@/components/modal/ReadingEndDateModal.vue';

const props = defineProps({
  book: { type: Object, required: true }
});

const startDateRule = [value => !!value || '독서를 시작한 날짜를 알려주세요.'];
const endDateRule = [value => !!value || '독서를 완료한 날짜를 알려주세요.'];
</script>

<style>
.v-date-picker-month__day--selected .v-btn {
  background-color: #ca4f34;
}
</style>