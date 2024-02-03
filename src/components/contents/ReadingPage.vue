<template>
  <div class="book-reading-page">
    <span class="book-caption mb-3">
      <v-icon icon="mdi-book-edit-outline" class="mr-2" />독서량
    </span>
    <div>
      <v-text-field v-model.number="book.readingPage" @blur="autoReadingDone"
        oninput="this.value = this.value.replace(/[^0-9]/g, '')" :rules="numberRule" class="mr-5" placeholder="읽은 페이지 수"
        hint="숫자만 입력 가능합니다." variant="solo" flat persistent-hint />
      <span class="book-page"> / {{ book.page }}쪽</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  book: { type: Object, required: true },
});
const numberRule = [
  value => !!value || '읽은 페이지수를 입력해주세요.',
  value => value <= props.book.page || `${props.book.page} 이하의 숫자만 입력 가능해요.`
];
const autoReadingDone = () => {
  if (props.book.readingPage === props.book.page) props.book.readingState = '독서 완료';
};
</script>

<style></style>