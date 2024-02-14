<template>
  <div class="book-desc mb-12">
    <span class="book-caption mb-3">
      <v-icon icon="mdi-book-edit-outline" class="mr-2" />책 소개
    </span>
    <p class="px-8 py-5">{{ book.description }}</p>
  </div>
</template>

<script setup>
defineProps({
  book: { type: Object, required: true },
});
</script>

<style></style>