<template>
  <div class="book-state mb-12">
    <span class="book-caption mb-3">
      <v-icon icon="mdi-book-edit-outline" class="mr-2" />독서 상태
    </span>
    <v-chip-group v-model="book.readingState" class="pa-0" mandatory @click="autoReadingDone">
      <v-chip v-for="readingState in state.readingStates" :value="readingState" class="ma-0 px-6" variant="outlined"
        size="large">{{
          readingState
        }}</v-chip>
    </v-chip-group>
  </div>
</template>

<script setup>
const props = defineProps({
  state: { type: Object, required: true },
  book: { type: Object, required: true }
});

const autoReadingDone = () => {
  if (props.book.readingState === '독서 완료') props.book.readingPage = props.book.page;
  else props.book.readingPage = null;
};
</script>

<style></style>