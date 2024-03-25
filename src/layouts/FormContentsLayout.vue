<template>
  <v-sheet class="mb-13">
    <BookInfo :book="book" />
    <BookDesc :book="book" />
    <BookPlatform :book="book" />
    <ReadingState :book="book" />
    <ReadingDate :book="book" />
    <ReadingPage v-if="book.readingState === '독서 중'" :book="book" />
    <Rating v-if="book.readingState === '독서 완료'" :book="book" />
    <Sentence v-if="book.readingState === '독서 완료'" :book="book" />
    <Review v-if="book.readingState === '독서 완료'" :book="book" />
  </v-sheet>
</template>

<script setup>
import BookInfo from '@/components/form/contents/BookInfo.vue';
import BookDesc from '@/components/form/contents/BookDesc.vue';
import BookPlatform from '@/components/form/contents/BookPlatform.vue';
import ReadingState from '@/components/form/contents/ReadingState.vue';
import ReadingDate from '@/components/form/contents/ReadingDate.vue';
import ReadingPage from '@/components/form/contents/ReadingPage.vue';
import Rating from '@/components/form/contents/Rating.vue';
import Sentence from '@/components/form/contents/Sentence.vue';
import Review from '@/components/form/contents/Review.vue';

defineProps({
  book: { type: Object, required: true },
});
</script>

<style scoped>
</style>