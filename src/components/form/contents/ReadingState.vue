<template>
  <div class="mb-12">
    <span class="d-flex align-center mb-3">
      <v-icon icon="mdi-book-edit-outline" class="mr-2" />독서 상태
    </span>
    <v-chip-group v-model="book.readingState" class="pa-0" mandatory @click="autoReadingDone(), resetReadingEndDate()">
      <v-chip v-for="readingState in readingStates" :value="readingState" class="ma-0 px-6" variant="outlined" size="large">{{ readingState }}</v-chip>
    </v-chip-group>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  book: { type: Object, required: true }
});

const readingStates = ref(['독서 중', '독서 완료']);
const autoReadingDone = () => {
  if (props.book.readingState === '독서 완료') props.book.readingPage = props.book.page;
  else props.book.readingPage = null;
};
const resetReadingEndDate = () => {
  if (props.book.readingState === '독서 중') {
    props.book.readingEndDate = null;
    props.book.formattedReadingEndDate = null;
  }
};
</script>

<style scoped>
</style>