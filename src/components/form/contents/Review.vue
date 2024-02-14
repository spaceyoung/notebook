<template>
  <div class="book-review">
    <span class="book-caption mb-3">
      <v-icon icon="mdi-book-edit-outline" class="mr-2" />나의 감상<em class="ml-1">(선택)</em>
    </span>
    <v-textarea v-model="book.review" placeholder="독서 후 떠오르는 감상을 기록해요." variant="solo" rows="5" hide-details="auto" flat
      no-resize clearable></v-textarea>
  </div>
</template>

<script setup>
defineProps({
  book: { type: Object, required: true }
});
</script>

<style></style>