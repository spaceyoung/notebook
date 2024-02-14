<template>
  <div class="book-sentence mb-12">
    <span class="book-caption mb-3">
      <v-icon icon="mdi-book-edit-outline" class="mr-2" />나의 문장<em class="ml-1">(선택)</em>
    </span>
    <v-textarea v-model="book.sentence" placeholder="간직하고 싶은 문장을 기록해요." variant="solo" rows="2" hide-details="auto" flat
      no-resize clearable></v-textarea>
  </div>
</template>

<script setup>
defineProps({
  book: { type: Object, required: true },
});
</script>

<style></style>