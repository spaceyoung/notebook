<template>
  <div class="mb-12">
    <span class="d-flex align-center mb-3">
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

<style scoped>
p {
  border-radius: 8px;
  line-height: 1.5;
  letter-spacing: -1px;
  color: #555;
  background-color: #f9f6ed;
}
</style>