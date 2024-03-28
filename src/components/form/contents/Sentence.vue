<template>
  <div class="mb-12">
    <span class="d-flex align-center mb-3">
      <v-icon class="mr-2" icon="mdi-book-edit" />
      나의 문장
      <em class="ml-1">(선택)</em>
    </span>
    <v-textarea
      v-model="book.sentence"
      placeholder="간직하고 싶은 문장을 기록해요."
      variant="solo"
      rows="2"
      hide-details="auto"
      flat
      no-resize
      clearable
    />
  </div>
</template>

<script setup>
defineProps({
  book: { type: Object, required: true },
});
</script>

<style scoped>
</style>