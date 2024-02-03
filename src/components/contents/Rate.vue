<template>
  <div class="book-rate mb-12">
    <span class="book-caption mb-3">
      <v-icon icon="mdi-book-edit-outline" class="mr-2" />나의 평점<em class="ml-1">(선택)</em>
    </span>
    <v-rating v-model="book.rating" density="compact" active-color="#ca4f34" half-increments
      clearable></v-rating>
  </div>
</template>

<script setup>
defineProps({
  book: { type: Object, required: true },
});
</script>

<style></style>