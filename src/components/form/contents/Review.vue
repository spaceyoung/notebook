<template>
  <div>
    <span class="d-flex align-center mb-3">
      <v-icon class="mr-2" icon="mdi-book-edit" />
      나의 감상
      <em class="ml-1">(선택)</em>
    </span>
    <v-textarea
      v-model="book.review"
      placeholder="독서 후 떠오르는 감상을 기록해요."
      variant="solo"
      rows="5"
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